import Avatar from "./Avatar"
import { student as studentProps } from "./types"

export default function Student (props: studentProps) {
    const {id, name} = props

    return (
        <div>
            <Avatar name={name}/>
            <p className="student-name">{name}</p>
        </div>
    )
}