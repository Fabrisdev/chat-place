import Head from 'next/head'
import {siteTitle} from '../../components/layout'
import css from '../../components/settingsGeneral.module.sass'
import { useSession } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SettingsLayout from "../../components/settingsLayout";
import AvatarUpload from "../../components/avatarUpload";

export default function General(){
    const webpageTitle = `${siteTitle} | Ajustes generales`
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if(!session)
            router.push('/auth')
    }, [ session ])

    return(
        <SettingsLayout>
            <>
                <Head>
                    <title>{webpageTitle}</title>
                </Head>
                { session ?
                    <div className={css.container}>
                        <div className={css.aboutMeContainer}>
                            <p className={css.aboutMeTitle}>About me</p>
                            <textarea className={css.aboutMe}></textarea>
                        </div>
                        <div className={css.avatarContainer}>
                            <p className={css.avatarTitle}>Tu foto de perfil</p>
                            <div className={css.avatar}>
                                <AvatarUpload size={350}/>
                            </div>
                        </div>
                        <div className={css.statusContainer}>
                            <p className={css.statusTitle}>Tu estado</p>
                            <input type='text'
                                   className={css.status}
                            />
                        </div>
                    </div>
                    :
                    <h3>Esta página es solo para usuarios que han iniciado sesión.</h3>
                }
            </>
        </SettingsLayout>
    )
}