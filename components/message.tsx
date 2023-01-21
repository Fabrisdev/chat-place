import {useSupabaseClient} from "@supabase/auth-helpers-react";
import { Database } from '../lib/database.types'
import {useEffect, useState} from "react";
import {getAvatarUrl, getUserAvatar, getUserUsernameAndDiscriminator} from "../lib/utils";
import Image from 'next/image'

type Props = {
    content: string,
    sentAt: string,
    userId: string,
}
export default function Message({ content, sentAt, userId }: Props){
    const supabase = useSupabaseClient<Database>()
    const [ avatarUrl, setAvatarUrl ] = useState('/profile.png')
    const [ username, setUsername ] = useState('...')
    updateAvatarUrl()
    updateUsername()
    async function updateAvatarUrl(){
        const url = await getUserAvatar(supabase, userId)
        setAvatarUrl(url)
    }

    async function updateUsername(){
        const { username, discriminator } = await getUserUsernameAndDiscriminator(supabase, userId)
        setUsername(`${username}${discriminator}`)
    }

    return(
        <div>
            <div>
                <p>{username}</p>
                <Image src={avatarUrl} alt='/profile.png' width={200} height={200}/>
            </div>
            <p>{content}</p>
            <p>{sentAt}</p>
        </div>
    )
}