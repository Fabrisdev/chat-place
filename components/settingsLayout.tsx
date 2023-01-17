import Layout from './layout'
import Sidebar from './sidebar'
import settingsLayout from './settingsLayout.module.sass'
type Props = {
    children: JSX.Element
}
export default function SettingsLayout({ children }: Props){
    const sidebarItems = [
        ["Ajustes generales", "/settings/general"]
    ]

    return(
        <Layout>
            <div className={settingsLayout.container}>
                <Sidebar items={sidebarItems}/>
                { children }
            </div>
        </Layout>
    )
}