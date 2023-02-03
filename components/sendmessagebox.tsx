import { useState } from "react"
import css from './sendmessagebox.module.sass'
import Swal from "sweetalert2/dist/sweetalert2";
import {colors, messages, pickRandom} from "../lib/utils"
import '@sweetalert2/theme-dark/dark.css'
import {useUser, useSupabaseClient} from "@supabase/auth-helpers-react"
import {Database} from "../lib/database.types"
import { KeyboardEvent } from "react"

type Props = {
    groupId: string
}
export default function SendMessageBox({ groupId }: Props){
    const [ content, setContent ] = useState('')
    const user = useUser()
    const supabase = useSupabaseClient<Database>()


    async function handleSendMessage(){
        const messageToSend = content.trim()
        if(!user) return Swal.fire({
            title: pickRandom(messages.error),
            text: 'Necesitas iniciar sesión para publicar mensajes.',
            icon: 'error',
            confirmButtonColor: colors.confirm,
            confirmButtonText: pickRandom(messages.accept),
        })
        if(messageToSend.length === 0) return Swal.fire({
            title: pickRandom(messages.error),
            text: 'Escribe algo más largo, ¿no?',
            icon: 'error',
            confirmButtonColor: colors.confirm,
            confirmButtonText: pickRandom(messages.accept),
        })
        const { error } = await supabase
            .from('messages')
            .insert({
                user_id: user.id,
                group_id: groupId,
                content,
            })
        if(error) {
            console.log('An error ocurred while trying to send a message:')
            throw error
        }
    }

    async function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>){
        const { key } = event
        if(key !== 'Enter') return
        if(event.shiftKey) {
            //TODO: set rows to 1 more and add next line in message content
            return
        }
        setTimeout(() => handleSendMessage(), 10)

    }

    return(
        <div className={css.container}>
            <textarea
                className={css.messageBox}
                rows={1}
                maxLength={200}
                placeholder='Escriba un mensaje'
                value={content}
                onChange={event => { setContent(event.target.value) }}
                onKeyDown={event => handleKeyDown(event)}
            />
        </div>
    )
}