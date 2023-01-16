import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import authLocale from '../lib/locale/auth-es.json'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function Authentication() {
    const session = useSession()
    const supabase = useSupabaseClient()
    const router = useRouter()

    const webpageTitle = `${siteTitle} | Autenticación`

    useEffect(() => {
        if(session)
            router.push('/settings')
    }, [ session ])

    return(
        <Layout>
            <Head>
                <title>{webpageTitle}</title>
            </Head>
            <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
                theme="dark"
                providers={['github', "google", "discord"]}
                localization={{
                    variables: {
                        ...authLocale
                    }
                }
            }
            />
        </Layout>
    )
}