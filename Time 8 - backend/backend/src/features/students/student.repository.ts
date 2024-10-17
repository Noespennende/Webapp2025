import type { Result } from "@/types"

type StudentRepository = {
    list: (query: Record<string, string>) => Promise<Result<string[]>>
    create: (data: Record<string, string>) => Promise<Result<string>>
}


export const createStudentRepositoru = (db: unknown): StudentRepository => {
    return {
        list: () => {},
        create: () => {}
    }
}

export const StudentRepository = createStudentRepositoru({})