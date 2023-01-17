import finishRegister from './finishRegister.module.sass'
import {ReactElement, ReactNode, useState} from 'react'
type Props = {
    content?: JSX.Element
}
export default function FinishRegister({ content }: Props){
    const [ showContent, setShowContent ] = useState(false)
    const [ username, setUsername ] = useState("a")
    const [ discriminator, setDiscriminator ] = useState('#0000')
    const webpageContent =
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
                        value='afganistan'
                        onChange={event => {
                                setUsername("hola")

                                checkUsername()
                            console.log("usuario: "+username)
                            }
                        }
                    />
                    <input
                        className={finishRegister.usernameInput}
                        type='text'
                        placeholder='#0000'
                        value={discriminator}
                        onChange={event => {
                            console.log(event.target.value)
                                setDiscriminator(event.target.value)
                                checkDiscriminator()
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

    function updateProfile(){
        setUsername("test")
        console.log("el user: "+username)
        setShowContent(true)
    }

    function checkUsername(){
        //const usernameTrimmed = username.trim()
        //setUsername(usernameTrimmed)

        //if(username.length > 32) setUsername(username.slice(0, -1))
        setUsername("holaaaaaa")
    }

    function checkDiscriminator(){

    }

    return (
        showContent ? content : webpageContent
    )
}