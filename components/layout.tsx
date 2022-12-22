import Head from "next/head";
import styles from './layout.module.sass'
import { ReactNode } from "react"
import Image from "next/image"
export const siteTitle = "ChatPlace"

interface Props {
    children?: ReactNode
}

const Layout = ({ children }: Props) =>
    <div>
        <Head>
            <link rel="icon" href="/favicon.png"/>
        </Head>
        <header className={styles.header}>
            <Image
                src='/favicon.png'
                width={50}
                height={50}
                alt=""
            />
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>
            Este es el footer de la página
        </footer>
    </div>

export default Layout