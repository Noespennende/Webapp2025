import type { Result } from "@/types"
import { Student, StudentDB } from "./student.types"
import { DB } from "@/db/db"

type StudentRepository = {
    list: (query: Record<string, string>) => Promise<Result<Student[]>>
    create: (data: Record<string, string>) => Promise<Result<Student>>
}

export const createStudentRepository = (db: DB): StudentRepository => {

    const create = (data: Student) => {
        try{
            const studentToDb: StudentDB = {
                id: data.id,
                name: data.name,
                created_at: data.createdAt,
                updated_at: data.updatedAt
            }
            const query = db.prepare(`
                INSERT INTO students (id, name, created_at, update_at)
                VALUES (?, ?, ?, ?)
                `)

                query.run(studentToDb.id, studentToDb.name, studentToDb.created_at, studentToDb.updated_at)

                return {
                    success: true,
                    data: studentToDb,
                }
        }
        catch(error){
            return{
                success: false,
                error: {
                    code: `DB_CREATE_ERROR`,
                    message: "failed to create student"
                }
            }
        }
    }

    const list = async (query?: Record<string, string>) => {
        try {
            const statement = db.prepare(`SLECT * from students`)
            const data = statement.all() as StudentDB[]
            return{
                success: true,
                data,
            }
        } catch (error) {
            return {
                success: false,
                error: {
                    code: "SOME_CODE_HERE",
                    message: "Failed getting students"
                }
            }
        }
    }


    return {
        list: () => {},
        create
    }
}

export const StudentRepository = createStudentRepositoru({})