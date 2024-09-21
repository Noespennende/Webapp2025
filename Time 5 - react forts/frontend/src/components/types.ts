export type student = {
    id: string,
    name: string
}

export type addStudentProps = {onAddStudent: ({ name }: { name: string }) }