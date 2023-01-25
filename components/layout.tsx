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

export const siteTitle = "NextChat"

interface Props {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    const session = useSession()
    const supabase = useSupabaseClient<Database>()
    const user = useUser()
    const [ pageContent, setPageContent ] = useState(children)

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
            setPageContent(<FinishRegister content={children}/>)
    }

    return(
        <div className={styles.layout}>
            <div>
                <Header/>
                <main className={styles.main}>
                    {pageContent}
                </main>
            </div>
            <Footer/>
        </div>
    )
}