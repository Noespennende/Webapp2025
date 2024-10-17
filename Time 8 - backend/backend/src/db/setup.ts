import { DB } from "./db"
import { createTable } from "./tables"

export const setup = async (db: DB) => {
    await createTable(db);
    // seed her
}