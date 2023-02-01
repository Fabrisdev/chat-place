import finishRegister from './finishRegister.module.sass'
import {useState} from 'react'
import Swal from 'sweetalert2/dist/sweetalert2'
import '@sweetalert2/theme-dark/dark.css'
import { pickRandom, colors, messages } from '../lib/utils'
import { Database } from '../lib/database.types'
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import { siteTitle} from './layout'

type Props = {
    onFinished: () => void
}
export default function FinishRegister({ onFinished }: Props){
    const user = useUser()
    const supabase = useSupabaseClient<Database>()
    const [ username, setUsername ] = useState('')
    const [ discriminator, setDiscriminator ] = useState('#0000')
    return(
        <div className={finishRegister.container}>
            <h1>Finalicemos tu registro</h1>
            <p className={finishRegister.textContainer}>
                Muchas gracias por haberte registrado en el sitio, sin embargo aún quedan unos detalles del mismo por
                terminar.
                Por favor, a continuación escriba los siguientes datos:
            </p>
            <div className={finishRegister.formContainer}>
                <p className={finishRegister.formTitle}>DATOS A INGRESAR:</p>
                <div className={finishRegister.usernameInputContainer}>
                    <label htmlFor='username-input'>
                        Nombre de usuario:
                    </label>
                    <input
                        className={finishRegister.usernameInput}
                        type='text'
                        placeholder='XxTilinGaming69_HDxX'
                        id='username-input'
                        maxLength={32}
                        value={username}
                        onChange={event => {
                                setUsername(event.target.value)

                            }
                        }
                    />
                    <input
                        className={`${finishRegister.usernameInput} ${finishRegister.discriminatorInput}`}
                        type='text'
                        placeholder='#0000'
                        maxLength={5}
                        value={discriminator}
                        onChange={event => {
                                checkDiscriminator(event.target.value)
                            }
                        }
                    />
                </div>
                <button
                    className={finishRegister.saveButton}
                    onClick={() => updateProfile()}
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    )
    async function updateProfile(){
        const usernameTrimmed = username.trim()
        if(username !== usernameTrimmed) {
            setUsername(usernameTrimmed)
            const answer = await Swal.fire({
                title: pickRandom(messages.warning),
                text: "Tu nombre no puede contener espacios al inicio o al final, por lo tanto fueron removidos, ¿estás bien con eso o prefieres elegir otro nombre de usuario?",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Dejame editarlo',
                cancelButtonColor: colors.cancel,
                confirmButtonColor: colors.confirm,
                confirmButtonText: 'Estoy bien con eso',
            })
            if(answer.isDismissed)
                return
        }
        if(username.length === 0){
            Swal.fire({
                title: pickRandom(messages.error),
                text: 'Tu nombre de usuario no puede ser tan pequeño. ¡Necesito una lupa para leer eso!',
                icon: 'error',
                confirmButtonColor: colors.confirm,
                confirmButtonText: pickRandom(messages.accept),
            })
            return
        }
        if(discriminator.length !== 5){
            Swal.fire({
                title: pickRandom(messages.error),
                text: 'Tu tag debe seguir el formato de # + 4 números. Ejemplo: #6969',
                icon: 'error',
                confirmButtonColor: colors.confirm,
                confirmButtonText: pickRandom(messages.accept),
            })
            return
        }
        const discriminatorWithoutHashtag = discriminator.split('#')[1]
        const wasSent = await updateInfoOnDatabase(discriminatorWithoutHashtag)
        if(!wasSent){
            Swal.fire({
                title: pickRandom(messages.error),
                text: 'Uh oh. Parece que hubo un error al actualizar los datos en la base de datos. Por favor, abre la consola, toma una captura y envíamela.',
                icon: 'error',
                confirmButtonColor: colors.confirm,
                confirmButtonText: pickRandom(messages.accept),
            })
        }
        Swal.fire({
            title: '¡Listo!',
            text: `Muchas gracias por tu tiempo. ¡Bienvenido a ${siteTitle}!`,
            icon: 'success',
            confirmButtonColor: colors.confirm,
            confirmButtonText: pickRandom(messages.accept),
        })
        onFinished()
    }

    async function updateInfoOnDatabase(discriminatorWithoutHashtag: string){
        if(!user)
            return false
        const { error } = await supabase
            .from('profiles')
            .update({
                username,
                discriminator: discriminatorWithoutHashtag,
            })
            .eq('id', user.id)
        return !error
    }

    function checkDiscriminator(newDiscriminator: string){
        if(!newDiscriminator.startsWith('#')) return
        newDiscriminator = newDiscriminator.trim()
        if(newDiscriminator.length >= 2)
            for(let i = 1; i <= newDiscriminator.length - 1; i++)
                if(isNaN(Number(newDiscriminator[i]))) return
        setDiscriminator(newDiscriminator)
    }
}