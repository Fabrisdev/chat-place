import css from './mainSidebar.module.sass'
import { HiUserGroup } from 'react-icons/hi'
import Logo from './logo'
import { RiHome4Line } from 'react-icons/ri'
import Link from 'next/link'
import { GoSettings } from 'react-icons/go'
import Separator from './separator'
import { AiFillGithub } from 'react-icons/ai'
type Props = {
    cssClass?: string
}
export default function MainSidebar({ cssClass }: Props){
    return(
        <div className={`${css.container} ${cssClass}`}>
            <Logo myStyles={css.logo}/>
            <Link href='/'>
                <RiHome4Line/>
                <p>Inicio</p>
            </Link>
            <Link href='/mygroups'>
                <HiUserGroup/>
                <p>Mis grupos</p>
            </Link>
            <Link href='/settings/general'>
                <GoSettings/>
                <p>Ajustes</p>
            </Link>
            <Separator/>
            <a href='https://github.com/Fabrisdev/chat-place' target="_blank" rel="noreferrer">
                <AiFillGithub/>
                <p>Ver en github</p>
            </a>
        </div>
    )
}