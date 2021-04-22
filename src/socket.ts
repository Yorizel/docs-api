import { Server } from "socket.io";
import server from "./server";
import DocumentController from "./controller/DocumentController";
const io = new Server(server,{cors:{origin: '*'}})


io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await DocumentController.find(documentId)
        socket.join(documentId)
        socket.emit('load-document', document)
        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })
        socket.on('save-document', async data => {
            return await DocumentController.update(data,documentId)
        })
    })
})