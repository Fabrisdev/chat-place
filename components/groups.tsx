import {useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import {Database} from '../lib/database.types'
import {useEffect, useState} from "react"
import {getGroupInfo, getGroups} from "../lib/utils"
import Group from './group'

type GroupInfo = {banner_url: string | null, created_at: string | null, description: string | null, id: string, logo_url: string | null, name: string, owner: string, updated_at: string | null}
export default function Groups(){
    const supabase = useSupabaseClient<Database>()
    const user = useUser()
    const [ fetchingGroupsInfo, setFetchingGroupsInfo ] = useState(true)
    const groupsInfoArray: GroupInfo[] = []
    const [ groupsInfo, setGroupsInfo] = useState<GroupInfo[]>([])
    useEffect(() => {
        showGroups()
    }, [ user ])
    async function showGroups(){
        if(!user) return
        const groups = await getGroups(supabase, user.id)
        await Promise.all(groups.map(async group => {
            const groupInfo = await getGroupInfo(supabase, group.group_id)
            groupsInfoArray.push(groupInfo)
            setGroupsInfo(groupsInfoArray)
            return groupInfo
        }))
        setFetchingGroupsInfo(false)
    }

    return(
        <div>
            <div>
                {
                    fetchingGroupsInfo ? <p>Cargando...</p> :
                        groupsInfo.length === 0 ? <li>¡No estás en ningún grupo aún!</li> :
                            groupsInfo.map(
                                (group, key) =>
                                    <Group key={key} name={group.name} description={group.description ?? 'Sin descripción.'}/>
                            )
                }
            </div>
        </div>
    )
}