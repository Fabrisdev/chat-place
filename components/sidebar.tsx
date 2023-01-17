import sidebar from './sidebar.module.sass'
import Link from 'next/link'
type Props = {
    items: string[][]
}
export default function Sidebar({ items }: Props){
    return(
        <ul className={sidebar.listContainer}>
            {
                items.map((item, key) =>
                    <li
                        className={sidebar.listItem}
                        key={key}>
                        <Link href={item[1]}>
                        {item[0]}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}