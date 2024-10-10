import Student from "./Student";
import type { Student as StudentProp } from "./types";
import { PropsWithChildren } from "react";

type GridProps = {
	students: StudentProp[];
	onRemoveStudent: (id: string) => void;
};

export default function Grid(props: PropsWithChildren<GridProps>) {
	const { students, onRemoveStudent, children } = props;

	return (
		<section>
			<article className="grid">
				{students.map((student) => (
					<Student
						key={student.id}
						name={student.name}
						id={student.id}
						onRemoveStudent={onRemoveStudent}
					/>
				))}
			</article>
			{children}
		</section>
	);
}
