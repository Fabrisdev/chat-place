import {useSupabaseClient} from "@supabase/auth-helpers-react"
import { Database } from '../lib/database.types'
import { useState } from "react"
import { getUserAvatar, getUserUsernameAndDiscriminator } from "../lib/utils"
import Image from 'next/image'
import css from './message.module.sass'

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
        if(url)
            setAvatarUrl(url)
    }

    async function updateUsername(){
        const { username, discriminator } = await getUserUsernameAndDiscriminator(supabase, userId)
        setUsername(`${username}#${discriminator}`)
    }

    return(
        <div className={css.container}>
            <div className={css.profileContainer}>
                <p>{username}</p>
                <Image src={avatarUrl} alt='/profile.png' width={200} height={200}/>
            </div>
            <div className={css.messageContainer}>
                <p>{content}</p>
                <p className={css.sentAt}>{sentAt}</p>
            </div>
        </div>
    )
}