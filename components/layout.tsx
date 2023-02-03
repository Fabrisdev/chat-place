import {useState} from "react"
import Footer from "./footer"
import Header from "./header"
import styles from './layout.module.sass'
import { useSession } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { Database } from '../lib/database.types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import FinishRegister from "./finishRegister";
import {checkIfHasAvatarOrUseDefault} from "../lib/utils";
import {MdOutlineFullscreenExit} from "react-icons/md";

export const siteTitle = "NextChat"

interface Props {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    const session = useSession()
    const supabase = useSupabaseClient<Database>()
    const user = useUser()
    const [ shouldShowContent, setShouldShowContent ] = useState(true)
    const [ fullScreenOn, setFullScreenOn ] = useState(false) //this will change soon as I2 add it to the settings as an option

    useEffect(() => {
        if(!session) return
        updatePageContent()
        if(user)
            checkIfHasAvatarOrUseDefault(supabase, user.id)
    }, [ session ])

    async function getUsernameAndDiscriminator(){
        if(!user) return
        const { data, error } = await supabase
            .from('profiles')
            .select('username, discriminator')
            .eq('id', user.id)
            .single()
        if(error)
            throw 'An error ocurred while trying to get the username and discriminator: '+error
        return data
    }

    async function updatePageContent(){
        const usernameAndDiscriminator = await getUsernameAndDiscriminator()
        if(!usernameAndDiscriminator?.username || !usernameAndDiscriminator?.discriminator)
            setShouldShowContent(false)
    }

    function handleFullScreenChange(){
        setFullScreenOn(fullscreenOn => !fullscreenOn)
    }

    return(
        <div className={styles.layout}>
            <MdOutlineFullscreenExit className={`${styles.exitFullScreenIcon} ${fullScreenOn ? '' : styles.hidden}`} onClick={handleFullScreenChange}/>
            <div>
                <Header handleFullScreenClick={handleFullScreenChange} className={fullScreenOn ? styles.hidden : ''}/>
                <main className={styles.main}>
                    { shouldShowContent ?
                        children : <FinishRegister onFinished={() => setShouldShowContent(true)}/>
                    }
                </main>
            </div>
            <Footer className={fullScreenOn ? styles.hidden : ''}/>
        </div>
    )
}