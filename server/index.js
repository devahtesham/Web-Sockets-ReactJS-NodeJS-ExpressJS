const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const PORT = 5000
const server = http.createServer(app);

app.use(cors())

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    // console.log(socket.id)
    socket.on('send_message',(data)=>{
        // console.log(data);
        // socket.broadcast.emit('recieve_message',{
        //     message:data.message
        // })

        socket.to(data.roomId).emit('recieve_message',{
            message:data.message
        })
    })

    socket.on('join_room',(data)=>{
        socket.join(data.roomId)
    })
})

server.listen(PORT,()=> console.log(`Server is running on localhost:${PORT}`))
