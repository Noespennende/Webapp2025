/* kjør:
npm add -D @types/better-sqlite3 --save-dev
npm install better-sqlite3 --save-dev
*/

import Database from "better-sqlite3"
import { env } from "process"

export const db = new Database(env.DATABASE_URL)
export type DB = typeof db

export default db