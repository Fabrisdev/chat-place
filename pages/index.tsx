import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"
export default function Home() {
    return(
        <Layout>
            <Head>
                <title>{`${siteTitle} | INICIO`}</title>
            </Head>
            <p>Página de inicio</p>
        </Layout>
    )
}

