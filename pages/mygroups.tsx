import Groups from '../components/groups'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

export default function MyGroups(){
    const webpageTitle = `${siteTitle} | Mis grupos`
    return(
        <Layout>
            <>
                <Head>
                    <title>{webpageTitle}</title>
                </Head>
                <Groups/>
            </>
        </Layout>
    )
}