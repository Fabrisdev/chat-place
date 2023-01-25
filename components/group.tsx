import group from './group.module.sass'
import Image from 'next/image'
import {useRouter} from 'next/router'
type Props = {
    name: string,
    description: string | null,
    id: string
}
export default function Group({ id, name, description }: Props){
    const router = useRouter()
    const query = router.query
    const pageToSend = `/groups/${id}`
    return(
        <div className={group.container}>
            <Image
                className={group.serverAvatar}
                src='/test-group.png'
                alt='/profile.png'
                width={200}
                height={200}>
            </Image>
            <div className={group.infoContainer}>
                <div>
                    <p className={`${group.text} ${group.title}`}>{name}</p>
                    <p className={`${group.text} ${group.small}`}>{description ?? 'Sin descripción.'}</p>
                </div>
                <button
                    className={group.joinChatButton}
                    onClick={() => router.push(pageToSend)}
                >
                    Ir al chat
                </button>
            </div>
        </div>
    )
}