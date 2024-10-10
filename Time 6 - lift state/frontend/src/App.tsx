import { useState } from "react";
import Grid from "./components/Grid";
import Total from "./components/Total";
import type { Student } from "./components/types";

const intitalStudent = [
    { id: "1", name: "Gandalf the gray" },
    { id: "2", name: "Bilbo baggins" },
];

function App() {
    // students ?? []
    const [students, setStudents] = useState<Student[]>(intitalStudent ?? []);

    const onAddStudent = (student: { name: string }) => {
        setStudents((prev) => [...prev, { id: crypto.randomUUID(), ...student }]);
    };


	const onRemoveStudent = (id: string) => {
			setStudents((prev) => prev.filter((student) => student.id !== id));
		};

    return (
        <main>
            {/* <Student name="Marius" id="123" /> */}
            <Grid students={students} onAddStudent={onAddStudent}  onRemoveStudent= {onRemoveStudent}/>
            <Total total={students.length} />
        </main>
    );
}

export default App;