import group from './group.module.sass'
import Image from 'next/image'
type Props = {
    name: string,
    description: string
}
export default function Group({ name, description }: Props){
    return(
        <div className={group.container}>
            <Image
                src='/test-group.png'
                alt='/profile.png'
                width={200}
                height={200}>
            </Image>
            <div className={group.infoContainer}>
                <p className={group.text}>{`➤ Nombre: ${name}`}</p>
                <p className={group.text}>{`➤ Descripción: ${description}`}</p>
                <button className={group.joinChatButton}>Ir al chat</button>
            </div>
        </div>
    )
}