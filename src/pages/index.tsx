import React from 'react'
import dynamic from 'next/dynamic';
const Post = dynamic(() => import('@/components/Post'), { ssr: false });
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {NodeClient, NodeManager} from '@/nodes';
import { Follow, InboxListItem, Post, Comment, Like } from '@/index';
import CommentInbox from '@/components/inbox/CommentInbox';
import FollowInbox from '@/components/inbox/FollowInbox';
import LikeInbox from '@/components/inbox/LikeInbox';
import { dehydrate, QueryClient, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAuthor from '@/hooks/useAuthor';
import { UserAuthorContextProvider } from '@/contexts/userAuthor';
import Button from '@/components/Button';
interface streamProps {
	authorId: string;
}

const Stream: React.FC<streamProps> = ({authorId}) => {
	const { data } = useQuery({ queryKey: ['inbox'], queryFn:async () =>  await NodeClient.getInbox(authorId)})
	const queryClient = useQueryClient()
	const clearInbox = useMutation(async () => await NodeClient.clearInbox(authorId), {
		onSuccess: () => {
			queryClient.invalidateQueries(['inbox'])
		}
	})
	const userAuthor = useAuthor(authorId)
		return (
			<UserAuthorContextProvider value={userAuthor}>
			<div className='flex flex-col h-screen'>
				<Head>
					<title>Stream</title>
				</Head>
		<div className='flex flex-1 overflow-hidden'>
				<Sidebar/>
		<div className='flex flex-1 flex-col overflow-y-auto w-full py-12'>
			
		<div className='w-full mx-auto bg-white px-6 max-w-4xl space-y-2'>
			<Button name='Clear Inbox' className='text-white' onClick={async () => {
				await clearInbox.mutateAsync()
			} }/>
			{data?.items && data.items.map((item) => {
				
				switch (item.type && item.type.toLowerCase()) {
					case 'post':
						item = item as Post;
						return <Post post={item} key={item.id} />;
					case 'follow':
						item = item as Follow;
						return <FollowInbox follow={item} key={item.summary} />;
					case 'like':
						item = item as Like;
						return <LikeInbox like={item} key={item.summary} />;
					case 'comment':
						item = item as Comment;
						return <CommentInbox comment={item} key={item.id || item.published} />;
				}
			})}
		</div>
		{data?.items &&
			data.items.length === 0 && (
				<div className='w-full mx-auto bg-white px-6 max-w-4xl'>
					<div className='flex flex-col items-center justify-center h-full'>
						<h1 className='text-3xl font-bold text-gray-700 mb-3'>No Activity Found</h1>
						<p className='text-gray-500'>
							Maybe follow some friends so you can have some activity?
						</p>
					</div>
				</div>
			)
		}
		</div>
		</div>
		</div>
		</UserAuthorContextProvider>
		);
}
export default Stream


export const revalidate = 60
export const getServerSideProps:GetServerSideProps = async (context) => {
	const queryClient = new QueryClient()
	const supabaseServerClient = createServerSupabaseClient(context)
	  const {
		data: { user },
	  } = await supabaseServerClient.auth.getUser();

	  if (!user) {
		return {
		  redirect: {
			destination: '/auth',
			permanent: false
		  }
		}
	  }
	  
	  await queryClient.prefetchQuery(['inbox'], async () => {
		let inbox = await NodeManager.getInbox(user.id)
		if (!inbox.items) {
			inbox.items = [];
		}
		return inbox;
	  })



	  
	return {
	  props: {
		dehydratedState: dehydrate(queryClient),
		authorId: user.id
	  }
	}
  }

