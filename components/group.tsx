import group from './group.module.sass'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    name: string,
    description: string | null,
    id: string
}
export default function Group({ id, name, description }: Props){
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
                <Link
                    href={`/groups/${id}`}
                    className={group.joinChatButton}
                >
                    Ir al chat
                </Link>
            </div>
        </div>
    )
}