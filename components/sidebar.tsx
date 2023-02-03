import sidebar from './sidebar.module.sass'
import Link from 'next/link'
type Item = {
    name: string,
    link: string,
}

type Props = {
    items: Item[]
}
export default function Sidebar({ items }: Props){
    return(
        <ul className={sidebar.listContainer}>
            {
                items.map((item, key) =>
                    <li
                        className={sidebar.listItem}
                        key={key}>
                        <Link href={item.link}>
                            {item.name}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}