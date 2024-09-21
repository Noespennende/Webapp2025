import { useState } from "react"
import { addStudentProps } from "./types"

export default function AddStudentForm(props : addStudentProps) {
    
    const { onAddStudent} = props

    const [name, setName] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name) {return;}
        onAddStudent(name)
        setName("")
    }


    return(
        <form className="add-student-form" name="addStudent" onSubmit={(handleSubmit)}>
            <label htmlFor="name">Navn</label>
            <input onChange={handleChange} id="name" type="text" name="studentNavn" placeholder="Studentens navn..." value={name} required/>
            <button type="submit">Add student</button>
        </form>
    )
}