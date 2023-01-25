import styles from "./header.module.sass";
import Image from "next/image";
import {siteTitle} from "./layout";
import Link from "next/link";

type ComponentProps = {
    myStyles?: string
}

export default function Logo({ myStyles }: ComponentProps){
    return(
        <Link href='/' className={`${styles.logoLink} ${myStyles}`}>
            <div className={styles.logoContainer}>
                <Image
                    src='/favicon.png'
                    width={40}
                    height={40}
                    alt=''
                />
                <h2>{siteTitle}</h2>
            </div>
        </Link>
    )
}