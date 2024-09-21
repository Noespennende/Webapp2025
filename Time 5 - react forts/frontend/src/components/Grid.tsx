import { useEffect, useState } from "react"
import Student from "./Student"
import { addStudentProps, student as studentProp } from "./types"
import AddStudentForm from "./AddStudentForm"

type GridProps = {
    students: studentProp[]
}

export default function Grid(props: GridProps) {
    const {students} = props
    const [studentList, setStudentList] = useState(students ?? [])

    const onAddStudent: addStudentProps = (studentNavn: string) => {
        setStudentList((prev) => [...prev ,  {name: studentNavn, id: crypto.randomUUID()}])
    }
    
    useEffect ( () => {
    }, [studentList])

    return(
        <section>
            <article className="grid">
                {studentList
                .map((student, index) => 
                    <Student key={student.id+index} name={student.name} id={student.id}/>
                )}
            </article>
            <AddStudentForm onAddStudent={onAddStudent}/>
        </section>
        
    )

}