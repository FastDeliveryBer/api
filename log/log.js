import morgan from 'morgan'
import { createWriteStream } from 'fs'

const accessLogStream = createWriteStream('./log/access.log', {
  flags: 'a',
})

const configlog = morgan(
  ':date[clf] :remote-addr - :user-agent[family] :user-agent[major].:user-agent[minor] - :method :url[full] :status :response-time ms - :res[content-length]',
  { stream: accessLogStream }
)

export default configlog
