import styles from "./header.module.sass";
import Link from "next/link";
import Avatar from './avatar'
import {useUser} from "@supabase/auth-helpers-react"
import { FaBars } from 'react-icons/fa'
import {useState} from "react";
import MainSidebar from "./mainSidebar";
import Logo from './logo'
import sidebarStyles from './mainSidebar.module.sass'
import { MdOutlineFullscreenExit, MdOutlineFullscreen } from 'react-icons/md'

type Props = {
    handleFullScreenClick: () => void,
    className: string,
}
export default function Header({ handleFullScreenClick, className }: Props) {
    const user = useUser()
    const [showSidebar, setShowSidebar ] = useState(false)
    const [ showCloseAnimation, setShowCloseAnimation ] = useState(true)
    const [ canTouch, setCanTouch ] = useState(true)
    async function handleSidebarClick(){
        if(showSidebar)
            await new Promise(r => setTimeout(r, 300))
        setShowSidebar(!showSidebar)
    }

    return(
        <header className={`${styles.header} ${className}`}>
            { showSidebar && <MainSidebar cssClass={showCloseAnimation ? sidebarStyles.closeAnimation : ''}/> }
            <FaBars className={`${styles.barsIcon} ${showSidebar ? styles.barsIconOpened : ''}`} onClick={async () => {
                if(!canTouch) return
                setShowCloseAnimation(!showCloseAnimation)
                setCanTouch(false)
                await handleSidebarClick()
                setCanTouch(true)
            }
            }/>
            <Logo/>
            <div className={styles.setToRight}>
                <MdOutlineFullscreen onClick={handleFullScreenClick} className={styles.fullScreenIcon}/>
                <Link href='/auth' className={styles.authLink}>
                    <Avatar
                        user={user}
                        size={40}
                        className={styles.profile}
                    />
                </Link>
            </div>
        </header>
    )
}