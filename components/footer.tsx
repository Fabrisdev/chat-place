import styles from "./layout.module.sass";
import Image from "next/image";

const Footer = () =>
    <footer className={styles.footer}>
        <a className={styles.footerIconsContainer} href='https://github.com/Fabrisdev/chat-place'>
            <Image
                src='/github.png'
                alt=''
                width={45}
                height={45}
            />
        </a>
    </footer>

export default Footer