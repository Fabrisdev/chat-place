import styles from "./layout.module.sass";
import Image from "next/image";
import Link from "next/link";
import { siteTitle } from "./layout"

const Header = () =>
    <header className={styles.header}>
        <div className={styles.logoContainer}>
            <Image
                src='/favicon.png'
                width={40}
                height={40}
                alt=""
                className={styles.logo}
            />
            <h2>{siteTitle}</h2>
        </div>
        <Link href='/register'>
            <Image
                src='/profile.png'
                alt=''
                height={40}
                width={40}
                className={styles.profile}
            />
        </Link>
    </header>

export default Header