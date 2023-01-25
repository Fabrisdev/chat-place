import Link from 'next/link'
import Head from 'next/head'
import css from '../components/404.module.sass'
import { siteTitle } from '../components/layout'

export default function Custom404(){
    const webpageTitle = `${siteTitle} | 404`
    return(
        <div className={css.container}>
            <Head>
                <title>{webpageTitle}</title>
            </Head>
            <p className={css.codeError}>404.</p>
            <div className={css.textContainer}>
                <p>Mmm. Parece que te has equivocado de lugar. Este reino aún no ha sido creado.</p>
                <Link href='/'><p className={css.goBack}>Volver al inicio</p></Link>
            </div>
        </div>
    )
}