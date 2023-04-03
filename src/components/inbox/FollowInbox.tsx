import React, {useEffect} from 'react'
import {  Follow } from '@/index';
import {NodeClient} from '@/nodes';
import Link from 'next/link';
import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query'
import {useAlert} from 'react-alert'
interface CommentInboxProps {
    follow: Follow
}

const FollowInbox: React.FC<CommentInboxProps> = ({follow}) => {
    const [isFollow, setIsFollow] = React.useState(false)
    const queryClient = useQueryClient()
    const alert = useAlert()
    const approveFollowMutation = useMutation(async () => await approveFollow(), {
        onSuccess: () => {
            queryClient.invalidateQueries(['followStatus', follow?.actor?.id?.split('/').pop(), follow?.object?.id?.split('/').pop()])
            alert.success('Follow request approved')
        }, onError: (error) => {
            alert.error('Error approving follow request')
        }
    })
    const rejectFollowMutation = useMutation(async () => await rejectFollow(), {
        onSuccess: () => {
            queryClient.invalidateQueries(['followStatus', follow?.actor?.id?.split('/').pop(), follow?.object?.id?.split('/').pop()])
            alert.success('Follow request rejected')
        }, onError: (error) => {
            alert.error('Error rejecting follow request')
        }
    })
    const {data:followStatus} = useQuery({ queryKey: ['followStatus', follow?.actor?.id?.split('/').pop(), follow?.object?.id?.split('/').pop()], queryFn: async () => await NodeClient.checkFollowerStatus(follow?.object?.id?.split('/').pop() || '', follow?.actor?.id?.split('/').pop() || '')})


    const approveFollow = async () => {
        let actorId = follow?.actor?.id?.split('/').pop() || ''
        let objectId = follow.object?.id?.split('/').pop() || ''
        await NodeClient.addFollower(objectId, actorId)
        setIsFollow(true)
    }

    const rejectFollow = async () => {
        let actorId = follow.actor?.id?.split('/').pop() || ''
        let objectId = follow.object?.id?.split('/').pop() || ''
        await NodeClient.removeFollower(objectId, actorId)
        setIsFollow(true)
    }

        return (<div className="border border-gray-200 rounded-md p-4">
            <div className="flex space-x-3 font-medium items-center justify-between text-gray-700">
               <span>{follow.summary}</span>
               <Link href={
                    `/authors/${follow.actor?.id?.split('/').pop()}`
               } className='text-sm text-gray-500 hover:underline'>
                     {follow?.actor?.displayName}
                </Link>
            </div>
            {follow.summary?.includes('want') && <div className='space-x-3 mt-2'>
            <button className='border text-gray-500 hover:bg-gray-50 border-gray-300 shadow-sm rounded-md px-3 py-1 text-sm' onClick={() => approveFollowMutation.mutate()}>Approve</button>
            <button className='text-red-500 border-red-500 border hover:bg-gray-50 bg-white rounded-md px-3 py-1 text-sm' onClick={() => rejectFollowMutation.mutate()}>Reject</button>
            </div>}
        </div>);
}
export default FollowInbox