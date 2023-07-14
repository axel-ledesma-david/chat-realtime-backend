const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})


app.use(cors())


io.on('connection', socket =>{
    console.log(socket.id)
    console.log('user conected')

    socket.on("join_room", data => {
        socket.join(data)
        console.log(`use id: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", data =>{
        console.log(data)
        socket.to(data.room).emit( "receive_message" ,data)
    })
})


server.listen(process.env.PORT || 3001, ()=>{
    console.log("Server on port 3001")
})
