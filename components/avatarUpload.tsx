import React, { useEffect, useState } from 'react'
import {useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import { Database } from '../lib/database.types'
import Image from "next/image";
import avatarUpload from './avatarUpload.module.sass'
import { AiOutlineUpload } from 'react-icons/ai'
import { Oval } from 'react-loading-icons'
import Swal from 'sweetalert2/dist/sweetalert2'
import '@sweetalert2/theme-dark/dark.css'
import {colors, messages, pickRandom, uploadFileNameToDatabase, uploadFileToStorage} from "../lib/utils";
type Profiles = Database['public']['Tables']['profiles']['Row']
type Props = {
    size: number
}

export default function AvatarUpload({ size }: Props) {
    const user = useUser()
    const supabase = useSupabaseClient<Database>()
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_file_name']>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (user) showAvatar()
    }, [user])

    async function getAvatarFileName() {
        if(!user)
            throw "getAvatarFileName was somehow called even thought there isn't an user available"

        const { data, error } = await supabase
            .from('profiles')
            .select('avatar_file_name')
            .eq('id', user.id)
            .single()
        if (error)
            throw 'An error ocurred while trying to get the avatar file name: ' + error
        return data.avatar_file_name
    }

    async function getAvatarUrl(avatarFileName: string){
        const { data, error } = await supabase.storage.from('avatars').download(avatarFileName)
        if (error)
            throw 'An error ocurred while trying to get the avatar url: ' + error
        const url = URL.createObjectURL(data)
        return url
    }

    async function showAvatar() {
        if(!user)
            throw "showAvatar was somehow called even thought there isn't an user available"

        const avatarFileName = await getAvatarFileName()

        if(!avatarFileName)
            return //User doesn't have an avatar set

        const url = await getAvatarUrl(avatarFileName)
        setAvatarUrl(url)
    }

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async event => {
        setUploading(true)

        if (!event.target.files || event.target.files.length === 0)
            throw 'No has seleccionado ning??n archivo.'

        if(!user)
            throw "getAvatar was somehow called even thought there isn't an user available"

        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}.${fileExt}`

        await uploadFileToStorage(supabase, file, fileName)
        await uploadFileNameToDatabase(supabase, user.id, fileName)

        setUploading(false)
        Swal.fire({
            title: '??Listo!',
            text: 'Tu avatar ha sido actualizado. Puede que tome hasta un minuto en actualizarse completamente.',
            icon: 'success',
            confirmButtonColor: colors.confirm,
            confirmButtonText: pickRandom(messages.accept),
        })
    }

    return (
        <div>
            {avatarUrl ?
                <Image
                    src={avatarUrl}
                    alt="AvatarUpload"
                    width={size}
                    height={size}
                    className={avatarUpload.avatar}
                />
             :
                <Image
                    src='/profile.png'
                    alt='/profile.png'
                    width={size}
                    height={size}
                />
            }
            <div style={{
                width: size,
                height: size,
            }} className={avatarUpload.selectFileButton}>
                <label className={avatarUpload.avatarButton} htmlFor="single">
                    {uploading ? <Oval/> : <AiOutlineUpload/>}
                </label>
                <input
                    style={{
                        visibility: 'hidden',
                        position: 'absolute',
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}
