import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from "../lib/database.types"
import AvatarUpload from "./avatarUpload"
import account from './account.module.sass'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account() {
    const supabase = useSupabaseClient<Database>()
    const user = useUser()
    const [ userProfile, setUserProfile ] = useState<Profiles>({
        id: '',
        avatar_file_name: '',
        banner_file_name: '',
        created_at: '',
        updated_at: '',
        discriminator: '',
        reputation: 0,
        verified: false,
        username: '',
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(user)
            getProfile()
    }, [user])

    async function getProfile() {
        setLoading(true)
        if (!user)
            throw 'No user'
        const { data, error, status } = await supabase
            .from('profiles')
            .select(`*`)
            .eq('id', user.id)
            .single()

        if (error && status !== 406)
            throw error

        if (data)
            setUserProfile(data)
        else
            setUserProfile(userProfile)
        setLoading(false)
    }

    async function updateProfile() {
        setLoading(true)
        if(!userProfile) {
            console.log("user:"+userProfile)
            throw 'No profile data found'
        }

        if(!user)
            throw 'updateProfile was called even thought there wasnt an user'

        const updatedProfile = {
            ...userProfile,
            updated_at: new Date().toISOString(),
        }

        if(userProfile.id === ''){
            updatedProfile.id = user.id
            updatedProfile.created_at = new Date().toISOString()
        }

        console.log(JSON.stringify(userProfile))
        const { error } = await supabase.from('profiles').upsert(updatedProfile)
        if (error)
            throw error

        alert('Profile updated!')
        setLoading(false)
    }

    return (
        <div className={account.container}>
            <div className={account.userConfig}>
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="text" value={user?.email || ''} disabled />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={userProfile?.username || ''}
                            onChange={event => {
                                setUserProfile({
                                    ...userProfile,
                                    username: event.target.value,
                                    updated_at: new Date().toISOString(),
                                })
                            }}
                        />
                    </div>

                    <div>
                        <button
                            onClick={() => updateProfile()}
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Guardar cambios'}
                        </button>
                    </div>

                    <div>
                        <button onClick={() => supabase.auth.signOut()}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
                <AvatarUpload size={200}/>
            </div>
        </div>
    )
}