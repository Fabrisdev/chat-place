import { useState } from "react"
import css from './sendmessagebox.module.sass'
import Swal from "sweetalert2/dist/sweetalert2";
import {colors, messages, pickRandom} from "../lib/utils"
import '@sweetalert2/theme-dark/dark.css'
import {useUser, useSupabaseClient} from "@supabase/auth-helpers-react"
import {Database} from "../lib/database.types"
type Props = {
    groupId: string
}
export default function SendMessageBox({ groupId }: Props){
    const [ content, setContent ] = useState('')
    const user = useUser()
    const supabase = useSupabaseClient<Database>()

    async function handleSendMessage(){
        if(!user) return Swal.fire({
            title: pickRandom(messages.error),
            text: 'Necesitas iniciar sesión para publicar mensajes.',
            icon: 'error',
            confirmButtonColor: colors.confirm,
            confirmButtonText: pickRandom(messages.accept),
        })
        if(content.length === 0) return Swal.fire({
            title: pickRandom(messages.error),
            text: 'Escribe algo más largo, ¿no?',
            icon: 'error',
            confirmButtonColor: colors.confirm,
            confirmButtonText: pickRandom(messages.accept),
        })
        if(content.length > 200) return Swal.fire({
            title: pickRandom(messages.error),
            text: 'Limito el tamaño de los mensajes a 200 caracteres. ¡A nadie le interesa tu copy pasta!',
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

    return(
        <div className={css.container}>
            <textarea
                className={css.messageBox}
                rows={5}
                placeholder='Escriba un mensaje'
                value={content}
                onChange={event => { setContent(event.target.value) }}
            />
            <button
                onClick={handleSendMessage}
                className={css.button}
            >
                Publicar mensaje
            </button>
        </div>
    )
}