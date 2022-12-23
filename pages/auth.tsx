import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/account'
import authLocale from '../lib/locale/auth-es.json'

export default function Authentication() {
    const session = useSession()
    const supabase = useSupabaseClient()

    return(
        <Layout>
            <Head>
                <title>{siteTitle} | Autenticación</title>
            </Head>
            {!session ? (
                <Auth
                    supabaseClient={supabase}
                    appearance={{theme: ThemeSupa}}
                    theme="dark"
                    providers={['github', "google", "discord"]}
                    localization={{
                        variables: {
                            ...authLocale
                        }
                    }}
                />
            ) : (
                <div>
                    <Account session={session} />
                </div>
            )}
        </Layout>
    )
}