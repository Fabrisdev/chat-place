import group from './group.module.sass'
import Image from 'next/image'
type Props = {
    name: string,
    description: string | null
}
export default function Group({ name, description }: Props){
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
                <button className={group.joinChatButton}>Ir al chat</button>
            </div>
        </div>
    )
}