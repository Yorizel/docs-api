import http from 'http'
import app from './app'
const server = http.createServer(app)
server.listen(process.env.PORT|| 8080, () => {
    console.log('server ligado')
})
export default server