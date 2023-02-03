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
            <Image src={avatarUrl} alt='/profile.png' width={60} height={60} className={css.avatar}/>
            <div className={css.messageContainer}>
                <div className={css.messageHeaderContainer}>
                    <p className={css.textHeader}>{username}</p>
                    <p className={css.textHeader}>{sentAt}</p>
                </div>
                <p className={css.text}>{content}</p>
            </div>
        </div>
    )
}