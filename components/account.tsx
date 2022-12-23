import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from "../lib/database.types"
import AvatarUpload from "./avatarUpload"

type Profiles = Database['public']['Tables']['profiles']['Row']
type ProfileReducedInfo = {
    username: Profiles['username'],
    website: Profiles['website'],
    avatar_file_name: Profiles['avatar_file_name'],
}

export default function Account({ session }: { session: Session }) {
    const supabase = useSupabaseClient<Database>()
    const user = useUser()
    const [ userInfo, setUserInfo ] = useState<ProfileReducedInfo>({
        username: '',
        website: '',
        avatar_file_name: '',
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        void getProfile()
    }, [session])

    async function getProfile() {
        setLoading(true)
        if (!user)
            throw new Error('No user')

        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_file_name`)
            .eq('id', user.id)
            .single()

        if (error && status !== 406)
            throw error

        if (data)
            setUserInfo(data)

        setLoading(false)
    }

    async function updateProfile() {
        setLoading(true)
        if (!user)
            throw new Error('No user')

        const updates = {
            id: user.id,
            ...userInfo,
            updated_at: new Date().toISOString(),
        }

        let { error } = await supabase.from('profiles').upsert(updates)
        if (error)
            throw error
        alert('Profile updated!')
        setLoading(false)
    }

    return (
        <div className="form-widget">
            <AvatarUpload
                uid={user ? user.id : ''}
                url={userInfo?.avatar_file_name}
                size={150}
                onUpload={(url) => {
                    setUserInfo({
                        ...userInfo,
                        avatar_file_name: url
                    })
                    void updateProfile()
                }}
            />
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={session.user.email} disabled />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={userInfo?.username || ''}
                    onChange={event => setUserInfo({
                        ...userInfo,
                        username: event.target.value,
                    })}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="website"
                    value={userInfo?.website || ''}
                    onChange={event => setUserInfo({
                        ...userInfo,
                        website: event.target.value,
                    })}
                />
            </div>

            <div>
                <button
                    className="button primary block"
                    onClick={() => updateProfile()}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <button className="button block" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}