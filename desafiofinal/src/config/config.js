import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,
    mongo_uri: process.env.MONGO_URI,
    mongo_db_name: process.env.MONGO_DB_NAME
}