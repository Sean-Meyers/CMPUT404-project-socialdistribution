import React from 'react'
import Input from "@/components/Input";
import Button from "@/components/Button";
import Head from 'next/head';
import File from "@/components/File";
import GitHubUrl from '@/components/GitHubUrl';
import { Auth } from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useForm } from "react-hook-form";
import {NodeManager, NodeClient} from '@/nodes';
import {getBase64} from '@/utils'
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';

interface createProps {

}

const Create: React.FC<createProps> = ({}) => {

	const supabaseClient = useSupabaseClient()
  	const user = useUser()
	const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const router = useRouter()

	const onSubmit = async (data:any) => {
        data.profileImage = await getBase64(data.profile[0])
        data.id = user?.id
        data.github = 'https://github.com/' + data.github
        delete data.profile
        data.host = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        data.url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/service' + '/authors/' + user?.id	// Changed urls here to reference the backend since that's really what they should do, hopefully this doesn't break the frontend.
		data.type = 'author'
		try {
            await NodeClient.createAuthor(data);
            router.push('/')
        } catch (error) {
            console.log(error)
        }
	}


		return (<div className='flex flex-col h-screen'>
		<Head>
			<title>Create Profile</title>
		</Head>
		<div className='flex flex-1 overflow-hidden'>
		<div className=' overflow-y-auto w-full py-12'>
		<form className='max-w-5xl mx-auto px-8' onSubmit={handleSubmit(onSubmit)}>
			<h2 className='text-xl font-semibold mb-5'>Create Profile</h2>
			<Input register={register} extraClass='mb-6' id="displayName" name="Display Name" placeholder="John Doe" required={true}/>
			<span className='block mb-2 text-sm font-medium'>GitHub</span>
			<GitHubUrl register={register} extraClass='mb-6' id="github" placeholder="github" required={false}/>
			<span className='block mb-2 text-sm font-medium'>Profile Picture</span>
			<File register={register} id="profile" filePreviewClass="w-44 h-44 object-cover rounded-full" required/>
			<Button name="Create Profile" className='text-white'/>
			
		</form></div></div></div>);
}
export default Create;

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

	  if (await NodeManager.checkAuthorExists(user.id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
	}
	  
        return {
            props: {}
        }
      


  }
