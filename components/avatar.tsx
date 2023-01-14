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
            updateAvatar()
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

    async function getAvatarUrl(fileName: string){
        const { data, error } = await supabase.storage.from('avatars').download(fileName)
        if (error)
            throw 'An error ocurred while trying to get the avatar url.'
        const url = URL.createObjectURL(data)
        return url
    }

    async function updateAvatar(){
        const fileName = await getAvatarFileName()
        if(!fileName)
            return //User doesn't have an avatar set
        const url = await getAvatarUrl(fileName)
        setAvatarUrl(url)
    }

    return (
        <Image
            src={avatarUrl || '/profile.png'}
            alt='/profile.png'
            width={size}
            height={size}
            className={className}
        />
    )
}
