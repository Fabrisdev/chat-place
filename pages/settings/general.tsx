import Head from 'next/head'
import Layout, {siteTitle} from '../../components/layout'
import Account from '../../components/account'
import { useSession } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SettingsLayout from "../../components/settingsLayout";

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
                    <Account session={session} />
                    :
                    <h3>Esta página es solo para usuarios que han iniciado sesión.</h3>
                }
            </>
        </SettingsLayout>
    )
}