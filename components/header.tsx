import styles from "./header.module.sass";
import Link from "next/link";
import Avatar from './avatar'
import {useUser} from "@supabase/auth-helpers-react";
import { FaBars } from 'react-icons/fa'
import {useState} from "react";
import MainSidebar from "./mainSidebar";
import Logo from './logo'
function Header() {
    const user = useUser()
    const [sidebarOpened, setSidebarOpened ] = useState(false)
    function handleSidebarClick(){
        setSidebarOpened(!sidebarOpened)
    }

    return(
        <header className={styles.header}>
            {
                sidebarOpened ? <MainSidebar/> : ''
            }
            <FaBars className={`${styles.barsIcon} ${sidebarOpened ? styles.barsIconOpened : ''}`} onClick={handleSidebarClick}/>
            <Logo/>
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