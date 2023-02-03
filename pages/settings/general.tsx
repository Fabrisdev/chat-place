import Head from 'next/head'
import {siteTitle} from '../../components/layout'
import { useSession } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SettingsLayout from "../../components/settingsLayout"
import SettingsGeneral from "../../components/settingsGeneral"

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
                    <SettingsGeneral/>
                    :
                    <h3>Esta página es solo para usuarios que han iniciado sesión.</h3>
                }
            </>
        </SettingsLayout>
    )
}