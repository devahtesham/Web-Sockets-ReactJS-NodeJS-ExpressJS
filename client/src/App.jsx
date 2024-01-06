import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io.connect('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState('')
  const [allMessages, setAllMessages] = useState([])

  const sendMessage = () => {
    socket.emit('send_message', {
      message: message,
      roomId:roomId
    })
  }

  const joinRoomHandler = ()=>{
    console.log('calling')
    socket.emit('join_room',{
      roomId:roomId
    })
  }

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log(data)
      setAllMessages((prevMessage) => [...prevMessage, data.message])
    })
  }, [socket])

  return (
    <>
      <div>
        <input type="text" placeholder="Enter Room Id" onChange={(e) => setRoomId(e.target.value)} />
        <button onClick={joinRoomHandler}>Join</button>
      </div>
      <div>
        <input type="text" placeholder="Enter Your Message !" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>SEND</button>
      </div>

      <div>
        {
          allMessages.length > 0 && (
            allMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))
          )
        }
      </div>
    </>
  )
}

export default App
