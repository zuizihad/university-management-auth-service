import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.URI,
  default_user_pass: process.env.DEFAULT_USER_PASS,
}
