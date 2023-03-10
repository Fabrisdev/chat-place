import Layout from '../../components/layout'
import { Database } from '../../lib/database.types'
import Message from '../../components/message'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { siteTitle } from '../../components/layout'
import {useSupabaseClient} from "@supabase/auth-helpers-react"
import { useState } from "react"
import SendMessageBox from "../../components/sendmessagebox"
import Sidebar from "../../components/sidebar"
import css from '../../components/groupsId.module.sass'
type Props = {
    groupName: string,
    oldMessages: Message[],
    groupId: string
}
type Message = {
    content: string,
    group_id: string,
    sent_at: string,
    user_id: string,
}
export default function GroupPage({ groupName, oldMessages, groupId }: Props){
    const webpageTitle = `${siteTitle} | ${groupName}`
    const supabase = useSupabaseClient<Database>()
    const [ messages, setMessages ] = useState<Message[]>(oldMessages)

    supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            const { content, sent_at, group_id, user_id } = payload.new
            if(groupId !== group_id) return
            const date = new Date(sent_at)
            const dateFormated = new Intl.DateTimeFormat('es', {
                dateStyle: 'long',
                timeStyle: 'medium',
            }).format(date)
            const message = {
                content,
                sent_at: dateFormated,
                group_id,
                user_id,
            }
            setMessages(messages => [...messages, message])
        }).subscribe()

    return(
        <Layout>
            <>
                <Head>
                    <title>{webpageTitle}</title>
                </Head>
                <div className={css.container}>
                    <Sidebar items={[
                        {
                            name: '#general', link: 'channels/general'
                        }
                    ]}/>
                    <div className={css.messagesContainer}>
                        {
                            messages.map(
                                message =>
                                    <Message
                                        key={(Math.random() + 1).toString().substring(7)}
                                        content={message.content}
                                        sentAt={message.sent_at}
                                        userId={message.user_id}
                                    />
                            )
                        }
                        <div className={css.sendMessageBoxContainer}>
                        <SendMessageBox groupId={groupId}/>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const supabase = createServerSupabaseClient<Database>(ctx)
    const { id } = ctx.query
    const messagesData = await getMessages()
    if (!messagesData) return sendTo('/mygroups')
    const groupName = await getGroupName()
    if (!groupName) return sendTo('/mygroups')
    const modifiedMessagesData = modifyDates(messagesData)

    return {
        props: {
            oldMessages: modifiedMessagesData,
            groupName: groupName.name,
            groupId: id,
        }
    }

    async function getMessages() {
        const {data, error} = await supabase
            .from('messages')
            .select('*')
            .eq('group_id', id)
            .order('sent_at', {
                ascending: false
            })
            .limit(5)
        if (error) return null
        return data.reverse()
    }

    async function getGroupName() {
        const {data, error} = await supabase
            .from('groups')
            .select('name')
            .eq('id', id)
            .single()
        if (error) return null
        return data
    }

    function modifyDates(messages: Message[]){
        return messages.map(message => {
            const date = new Date(message.sent_at)
            const dateFormated = new Intl.DateTimeFormat('es', {
                dateStyle: 'long',
                timeStyle: 'medium',
            }).format(date)
            return {
                ...message,
                sent_at: dateFormated,
            }
        })
    }

    async function sendTo(page: string){
        return {
            redirect: {
                permanent: false,
                destination: page,
            },
            props: {},
        }
    }
}
