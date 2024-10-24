import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Total from "./components/Total";
import type { Student } from "./components/types";
import AddStudentForm from "./components/AddStudentForm";
import Filter from "./components/Filter";
import Student from "./components/Student";

const intitalStudent = [
  { id: "1", name: "Ola Normann" },
  { id: "2", name: "Kari Normann" },
];

function App() {
  const [filter, setFilter] = useState("-");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [students, setStudents] = useState<Student[]>(intitalStudent ?? []);

  const filteredStudents = students.filter(students => filter !== '-' ? students.name.toLowerCase().includes(filter) : true)

  const options = Array.from(
    students
      .reduce((acc, student: Student) => {
        const name = student.name.trim().split(" ")[0];
        if (acc.has(name)) return acc;

        return acc.set(name, {
          ...student,
          value: name.toLowerCase(),
          label: name,
        });
      }, new Map())
      .values()
  );

  const onFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const onAddStudent = (student: Omit<Student, "id">) => {
    setStudents((prev) => [...prev, { id: crypto.randomUUID(), ...student }]);
  };

  const onRemoveStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };
  // [[key, {}], [key, {}]]

  useEffect(() => {
	const fetchStudents = async () => {
		try {
			setLoading(true)
			// TODO: No hard coded URL. move to config in config/index.ts
			const response = await fetch("https://localhost:3999/api/students")
			const data = await response.json()
			setStudents(data)

		} catch (error){
			setError("Feilet ved henting av studenter")
		} finally {
			setLoading(false)
      console.error(error)
		}
    fetchStudents
	}
  }, [])


  return (
    <main>
      {/* <Student name="Marius" id="123" /> */}
      <Filter
        filter={filter}
        onFilterChange={onFilterChange}
        options={Object.values(options)}
      />
      <Grid
        students={filteredStudents}
        // onAddStudent={onAddStudent}
        onRemoveStudent={onRemoveStudent}
      >
        <AddStudentForm onAddStudent={onAddStudent} />
      </Grid>
      <Total total={students.length} />
    </main>
  );
}

export default App;