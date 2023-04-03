import React, { useState, Fragment, useEffect } from 'react'
import { GetServerSideProps } from 'next';
import Button from '@/components/Button';
import { NextPage } from 'next';
import Link from 'next/link';
import SideBar from '@/components/Sidebar';
import Post from '@/components/Post';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import { GitHub, X } from 'react-feather';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {NodeManager, NodeClient} from '@/nodes';
import { Author, Post as PostType } from '@/index';
import { Transition, Dialog } from '@headlessui/react';
import ProfilePreview from '@/components/ProfilePreview';
import { dehydrate, QueryClient, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserAuthorContextProvider } from '@/contexts/userAuthor';
import useAuthor from '@/hooks/useAuthor';
import {useAlert} from 'react-alert'
interface Props {
	authorId:string
	userId:string
	userAuthor:Author
}


const Page: NextPage<Props> = ({authorId, userId, userAuthor}) => {
	
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [followStatusState, setFollowStatusState] = useState<string | undefined>(undefined)
	const queryClient = useQueryClient();
  	const user = useUser();
	const alert = useAlert();

	const {
		data:author
	} = useQuery(['authors', authorId],  async () => await NodeClient.getAuthor(authorId), {
		
	})
	const {
		data:posts
	} = useQuery({ queryKey: ['posts', authorId], queryFn: async () => await NodeClient.getPosts(authorId)})

	const {
		data:followers
	} = useQuery({ queryKey: ['followers', authorId], queryFn: async () => await NodeClient.getFollowers(authorId)})

	const {
		data:followStatus
	} = useQuery({ queryKey: ['followStatus', authorId], queryFn: async () => await NodeClient.checkFollowerStatus(authorId, userId), 
	enabled: userId !== authorId,
	onSuccess: (data) => {
		setFollowStatusState(data)
	},
	
})


	const router = useRouter()

	const followStatusMutation = useMutation(async ({authorTo, authorFrom, status}:{authorTo:Author, authorFrom:Author, status:string}) => {
		
		await NodeClient.sendFollowRequest(authorTo, authorFrom)
	}, {
		onSuccess: (data, {status}) => {
			
			setFollowStatusState(status)
			queryClient.invalidateQueries(['followStatus', authorId])
			queryClient.invalidateQueries(['followers', authorId])
			alert.success('Follow request sent')
		}, 
		onError: (error) => {
			alert.error('Error sending follow request')
		}
	})

	const removeFollowStatusMutation = useMutation(async ({authorId, authorFromId, status}:{authorId:string, authorFromId:string, status:string}) => {
		await NodeClient.removeFollower(authorId, authorFromId)
	},{
		onSuccess: (data, {status}) => {
			setFollowStatusState(status)	
			queryClient.invalidateQueries(['followStatus', authorId])
			queryClient.invalidateQueries(['followers', authorId])
			alert.success('Unfollowed user')
		}, onError: (error) => {
			alert.error('Error unfollowing user');
		}
	})


	const closeModal = () => {
		setIsModalOpen(false)
	}


		return (
			<UserAuthorContextProvider value={userAuthor }>
		<div className='flex flex-col h-screen'>
		<Head>
			<title>Author Profile</title>
		</Head>
		
		<div className='flex flex-1 overflow-hidden'>
		<SideBar/>
		<div className='flex flex-1 flex-col overflow-y-auto w-full py-12'>
			<div className='max-w-4xl w-full mx-auto px-8'>
			<div className='flex flex-col border-b border-slate-200 pb-4'>
			<img className='rounded-full w-24 h-24 object-cover mb-3 ' src={author?.profileImage} width={100} height={100} alt={author?.displayName}/>
			<div className='flex flex-row items-center justify-between'>
			<div className='text-xl font-medium'>{author?.displayName}</div>
			<div className='flex flex-row space-x-3' >
				<Button name="Followers" className='text-white bg-indigo-500 hover:bg-indigo-600' onClick={() => setIsModalOpen(true)} /> 
			{authorId?.includes(user?.id || 'user') ? <Button name='Edit Profile' onClick={() => {
				let author_id = router.query.author_id as string
				router.push('/authors/' + author_id + '/edit')
			}} className='bg-white text-gray-600 border-2 border-gray-100 hover:bg-gray-50 focus:ring-gray-100'/>:
			 
			<Button
			onClick={async () => {


				if (followStatusState === 'friends' || followStatusState === 'true_friends') {
					await removeFollowStatusMutation.mutateAsync({authorId:authorId, authorFromId: userId, status: 'not_friends'})
				}
				else if (author && userAuthor) {
					
					await followStatusMutation.mutateAsync({authorTo: author, authorFrom: userAuthor, status: 'pending'})

			}}}
			name={
				!followStatusState && (followStatus === 'not_friends' ? 'Follow' : followStatus === 'friends' ? 'Unfollow' : followStatus === 'true_friends' ? 'Unfollow' : 'Pending') ||
				(followStatusState === 'not_friends' ? 'Follow' : followStatusState === 'friends' ? 'Unfollow' : followStatusState === 'true_friends' ? 'Unfollow' : 'Pending')
			} className='text-white'/>}</div>
			</div>
			<div className='text-gray'>
			<Link href={author?.github || 'https://github.com/'} >
				<GitHub className='inline-block w-5 h-5 text-gray-500 hover:text-gray-700'/>
			</Link>
			</div>
			</div>
			<div className='my-4'>
			{posts && posts.items?.map((post) => {
				return <Post key={post.id} post={post}/>
			})}
			
			</div>
			<Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <>
				  <X className='w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer absolute top-4 right-4' onClick={closeModal}/>
				  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-700 pb-4"
                  >
					{author?.displayName || 'Your'} Followers
                  </Dialog.Title>
				 	<div className="space-y-2">{followers && followers?.items?.map((follower) => {
						return <ProfilePreview author={follower} key={follower.id} closeFunction={closeModal}/>
					})}
					</div>
					{followers && followers?.items?.length === 0 && <div className='text-gray-500'>No followers found.</div>}
                 </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
			</div>
			</div>
		</div></div>
	</UserAuthorContextProvider>
		);
}

export const getServerSideProps:GetServerSideProps = async (context) => {
	
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


	  const queryClient = new QueryClient();

	// cache the following data with react query: await NodeManager.checkAuthorExists(user.id)
	  let authorId: string = context.params?.author_id as string;

	  
	  let q1 =  queryClient.prefetchQuery(['posts', authorId], async () => {
		let data = await NodeManager.getPosts(context.params?.author_id as string);
		return data;
	  })

	  let q2 = queryClient.prefetchQuery(['authors', authorId], async () => {
		let data = await NodeManager.getAuthor(context.params?.author_id as string);
		return data;
	  }, {
		staleTime: 1000 * 60 * 60
	  })

	  let q4 = queryClient.prefetchQuery(['followStatus', authorId], async () => {
		return await NodeManager.checkFollowerStatus(context.params?.author_id as string, user.id);
	  })

	  let userAuthor = await NodeManager.getAuthor(user.id)
	
		await Promise.all([q1, q2, q4])
	
		return {
			props: {
				userId: user.id,
				userAuthor: userAuthor,
				dehydratedState: dehydrate(queryClient),
				authorId: context.params?.author_id as string,
			}
		}
	
	}

	

export default Page;
