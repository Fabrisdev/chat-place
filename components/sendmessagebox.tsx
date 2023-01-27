import {useState} from "react"
import css from './sendmessagebox.module.sass'
import Swal from "sweetalert2/dist/sweetalert2";
import {colors, messages, pickRandom} from "../lib/utils"
import '@sweetalert2/theme-dark/dark.css'

type Props = {
    id?: string
}
export default function SendMessageBox({ id }: Props){
    const [ content, setContent ] = useState('')
    function handleSendMessage(){
        if(!id) return Swal.fire({
            title: pickRandom(messages.error),
            text: 'Necesitas iniciar sesión para publicar mensajes.',
            icon: 'error',
            confirmButtonColor: colors.confirm,
            confirmButtonText: pickRandom(messages.accept),
        })
        
    }

    if(!id) return <></>
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