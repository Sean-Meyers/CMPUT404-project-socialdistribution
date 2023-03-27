import React from 'react'
import Search from '@/components/Search';
import { Auth } from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import { GetServerSideProps } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {NodeManager, NodeClient} from '@/nodes';
import {useForm} from 'react-hook-form'
import { Author } from '..';
import ProfilePreview from '@/components/ProfilePreview';
import axios from 'axios';
interface searchProps {

}

const SearchPage: React.FC<searchProps> = ({}) => {
	const supabaseClient = useSupabaseClient()
	const [isSearch, setSearch] = React.useState(false)
	const user = useUser()
	const [searches, setSearches] = React.useState<Author[]>([])
	const {register, handleSubmit} = useForm()

	const searchSubmit = async (data:any) => {
		const searchData = await NodeClient.getAuthors(undefined, undefined, data.search);
		let searchItems = searchData.items

		if (searchItems) {
			setSearches(searchItems)
			setSearch(true)
		}
		
	}


		return (<div className=''>
	
			<div className='flex flex-col h-screen'>
			<Head>
				<title>Stream</title>
			</Head>
	<div className='flex flex-1 overflow-y-hidden'>
			<Sidebar/>
	<div className='flex flex-1 flex-col overflow-y-auto w-full py-12'>
		<div className='w-full mx-auto bg-white px-6 max-w-5xl'> 
	<h2 className='text-xl font-semibold mb-5'>Search</h2>
	<form onSubmit={handleSubmit(searchSubmit)}>
		<Search id='search' register={register} placeholder='Search for a user...' />
		</form>
		</div>
		<div className='w-full mx-auto bg-white px-6 max-w-5xl space-y-1 mt-3'>
		{searches.map((search) => {
			return <ProfilePreview key={search.id} author={search}/>
		})}
		{
			searches.length === 0 && isSearch && <p className='text-center text-gray-500 mt-5 sm:text-xl text-lg'>No results found</p>
		}
	</div>
	</div>
	</div>
	</div>
		</div>);
}
export default SearchPage;

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

	  if (!user) {
		return {
		  redirect: {
			destination: '/login',
			permanent: false
		  }
		}
	  }

	 
	  if (!await NodeManager.checkAuthorExists(user.id))
		return {
			redirect: {
				destination: '/onboarding',
				permanent: false
			}
		}
	  

	return {
	  props: {}
	}
  }