import styles from "./footer.module.sass";
import Image from "next/image";

type Props = {
    className: string,
}
export default function Footer({ className }: Props) {
    return (
        <footer className={`${styles.footer} ${className}`}>
            <a
                className={styles.footerIconsContainer}
                href='https://github.com/Fabrisdev/chat-place'
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    src='/github.png'
                    alt=''
                    width={40}
                    height={40}
                />
            </a>
        </footer>
    )
}