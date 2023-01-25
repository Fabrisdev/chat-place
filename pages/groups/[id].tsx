import {useRouter} from 'next/router'
import Layout from '../../components/layout'
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import { Database } from '../../lib/database.types'
import {useEffect, useState} from "react";
import Message from "../../components/message";

type Props = {
    texto: string
}
type MessagesList = {content: string, group_id: string, sent_at: string, user_id: string}[]
export default function GroupPage({ texto }: Props){
    const { query, isReady, push } = useRouter()
    const { id } = query
    const supabase = useSupabaseClient<Database>()
    const [ messages, setMessages ] = useState<MessagesList>([])
    const [ fetchingData, setFetchingData ] = useState(true)

    useEffect(() => {
        showMessages()
    }, [ id ])

    async function showMessages(){
        if(!id) return
        const messagesData = await getMessages()
        if(!messagesData){
            push('/mygroups')
            return
        }
        setMessages(messagesData)
        setFetchingData(false)
    }

    async function getMessages(){
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('group_id', id)
        if(error) return null
        return data
    }

    if(!isReady || fetchingData) return <p>Cargando...</p>
    return(
        <Layout>
            <>
                {
                    messages.map(
                        (message, key) => <Message key={key} content={message.content} sentAt={message.sent_at} userId={message.user_id}/>
                    )
                }
            </>
        </Layout>
    )
}
