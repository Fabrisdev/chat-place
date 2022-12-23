import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/account'
export default function Home() {
    const session = useSession()
    const supabase = useSupabaseClient()

    return(
        <Layout>
            <Head>
                <title>{`${siteTitle} | INICIO`}</title>
            </Head>
            <p>Página de inicio</p>
            <div className="container" style={{padding: '50px 0 100px 0'}}>
                {!session ? (
                    <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}} theme="dark"/>
                ) : (
                    <Account session={session} />
                )}
            </div>
        </Layout>
    )
}

