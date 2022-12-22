import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"

const Home = () =>
    <Layout>
        <Head>
            <title>{`${siteTitle} | INICIO`}</title>
        </Head>
        <p>Hola</p>
    </Layout>

export default Home

