import finishRegister from './finishRegister.module.sass'
export default function FinishRegister(){
    function updateProfile(){
        console.log("Test")
    }

    return(
        <div className={finishRegister.container}>
            <h1>Finalicemos tu registro</h1>
            <p>
                Muchas gracias por haberte registrado en el sitio, sin embargo aún quedan unos detalles del mismo por terminar.
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
}