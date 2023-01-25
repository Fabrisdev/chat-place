import css from './mainSidebar.module.sass'
import { HiUserGroup } from 'react-icons/hi'
import Logo from './logo'
import { RiHome4Line } from 'react-icons/ri'
import Link from 'next/link'
import { GoSettings } from 'react-icons/go'
import Separator from './separator'
export default function MainSidebar(){
    return(
        <div className={css.container}>
            <Logo myStyles={css.logo}/>
            <div>
                <RiHome4Line/>
                <Link href='/'>
                    <p>Inicio</p>
                </Link>
            </div>
            <div>
                <HiUserGroup/>
                <Link href='/mygroups'>
                    <p>Mis grupos</p>
                </Link>
            </div>
            <div>
                <GoSettings/>
                <Link href='/settings/general'>
                    <p>Ajustes</p>
                </Link>
            </div>
            <Separator/>
            <div>
                <RiHome4Line/>
                <Link href='/'>
                    <p>Inicio</p>
                </Link>
            </div>
            <div>
                <HiUserGroup/>
                <Link href='/mygroups'>
                    <p>Mis grupos</p>
                </Link>
            </div>
            <div>
                <GoSettings/>
                <Link href='/settings/general'>
                    <p>Ajustes</p>
                </Link>
            </div>
        </div>
    )
}