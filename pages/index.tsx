import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"
import Groups from '../components/groups'
export default function Home() {
    const webpageTitle = `${siteTitle} | INICIO`

    return(
        <Layout>
            <>
                <Head>
                    <title>{webpageTitle}</title>
                </Head>
            </>
        </Layout>
    )
}

