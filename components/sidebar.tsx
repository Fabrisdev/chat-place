import sidebar from './sidebar.module.sass'

type Props = {
    items: string[],
}
export default function Sidebar({ items }: Props){
    return(
        <ul className={sidebar.listContainer}>
            {
                items.map((item, key) => <li className={sidebar.listItem} key={key}>{item}</li>)
            }
        </ul>
    )
}