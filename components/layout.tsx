import Head from "next/head"
import { ReactNode } from "react"
import Footer from "./footer"
import Header from "./header"
import styles from './layout.module.sass'
export const siteTitle = "NextChat"

interface Props {
    children?: ReactNode
}

const Layout = ({ children }: Props) =>
    <div>
        <Head>
            <link rel="icon" href="/favicon.png"/>
        </Head>
        <Header />
        <main className={styles.main}>
            {children}
        </main>
        <Footer />
    </div>

export default Layout