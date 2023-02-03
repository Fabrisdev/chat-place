import css from "./settingsGeneral.module.sass"
import AvatarUpload from "./avatarUpload"
import {BsCheckSquareFill} from "react-icons/bs"
import {ImCross} from "react-icons/im"

export default function SettingsGeneral(){
    function handleSaveStatus(){

    }

    function handleRollbackStatus(){

    }

    return(
        <div className={css.container}>
            <div className={css.aboutMeContainer}>
                <div className={css.statusTitleContainer}>
                    <p className={css.aboutMeTitle}>About me</p>
                    <div className={css.confirmContainer}>
                        <BsCheckSquareFill className={`${css.rotateOnHover} ${css.icon}`} onClick={handleSaveStatus}/>
                        <ImCross className={`${css.rotateOnHover} ${css.icon}`} onClick={handleRollbackStatus}/>
                    </div>
                </div>
                <textarea className={css.aboutMe}></textarea>
            </div>
            <div className={css.avatarContainer}>
                <p className={css.avatarTitle}>Tu foto de perfil</p>
                <div className={css.avatar}>
                    <AvatarUpload size={350}/>
                </div>
            </div>
            <div className={css.statusContainer}>
                <div className={css.statusTitleContainer}>
                    <p className={css.statusTitle}>Tu estado</p>
                    <div className={css.confirmContainer}>
                        <BsCheckSquareFill className={`${css.rotateOnHover} ${css.icon}`} onClick={handleSaveStatus}/>
                        <ImCross className={`${css.rotateOnHover} ${css.icon}`} onClick={handleRollbackStatus}/>
                    </div>
                </div>
                <input type='text' className={css.status}/>
            </div>
        </div>
    )
}