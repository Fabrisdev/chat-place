import styles from "./footer.module.sass";
import Image from "next/image";

const Footer = () =>
    <footer className={styles.footer}>
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

export default Footer