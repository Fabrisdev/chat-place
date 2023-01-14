import styles from "./layout.module.sass";
import Image from "next/image";
import Link from "next/link";
import { siteTitle } from "./layout"
import Avatar from './avatar'
import {useUser} from "@supabase/auth-helpers-react";

function Header() {
    const user = useUser()

    return(
        <header className={styles.header}>
            <Link href='/'>
                <div className={styles.logoContainer}>
                    <Image
                        src='/favicon.png'
                        width={40}
                        height={40}
                        alt=''
                        className={styles.logo}
                    />
                    <h2>{siteTitle}</h2>
                </div>
            </Link>
            <Link href='/auth' className={styles.authLink}>
                <Avatar
                    user={user}
                    size={40}
                    className={styles.profile}
                />
            </Link>
        </header>
    )
}
export default Header