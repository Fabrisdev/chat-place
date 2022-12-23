import React, { useEffect, useState } from 'react'
import {useSupabaseClient, User} from '@supabase/auth-helpers-react'
import { Database } from '../lib/database.types'
import Image from 'next/image'
type Profiles = Database['public']['Tables']['profiles']['Row']

interface Props{
    size: number,
    className?: string,
    user: User | null,
}

export default function Avatar({ size, className, user }: Props) {
    const supabase = useSupabaseClient<Database>()
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_file_name']>('')

    useEffect(() => {
        if(user)
            void updateAvatar()
    }, [ user ])

    async function getAvatarFileName(){
        if(!user)
            throw '[avatar.tsx:24] getAvatarFileName somehow was called even thought no user was found'

        const { data, error } = await supabase
            .from('profiles')
            .select(`avatar_file_name`)
            .eq('id', user.id)
            .single()

        if(error)
            throw error

        return data?.avatar_file_name
    }

    async function getAvatarUrl(path: string): Promise<string> {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
            throw error
        }
        return URL.createObjectURL(data)
    }

    async function updateAvatar(){
        const name = await getAvatarFileName()
        if(name) {
            const newAvatarUrl = await getAvatarUrl(name)
            setAvatarUrl(newAvatarUrl)
        }
    }

    return (
        <Image
            src={avatarUrl ? avatarUrl : '/profile.png'}
            alt='/profile.png'
            width={size}
            height={size}
            className={className}
        />
    )
}
