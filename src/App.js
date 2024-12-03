
import React, { useEffect, useState } from "react";
import io from "socket.io-client"

const socket=io("http://localhost:5000")

function App() {

  const [username,setUserName]=useState("")
  const [chatActive,setChatActive]=useState(false)
  const [messages,setMessages]=useState([])
  const [newMessage,setNewMessage]=useState("")

  const submitHandler=(e)=>{
    alert("hii")
    e.preventDefault()

    const messageData={
      message:newMessage,
      user:username,
      time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
    };

    if( !newMessage==""){
      socket.emit("send-message",messageData)
      setNewMessage("")

    }else{
      alert("message cannot be empty")

    }

 

  }

  useEffect(()=>{
    socket.on("received-message",(msg)=>{
      setMessages([...messages,msg])
     
    })
    console.log(messages,"meshhhhh")

  },[messages,socket])
  return (
    <>
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      {
        chatActive?(
          
          <div className="w-full rounded-md md:w-[80vw] lg:w-[60vw]">
            <h1 className="text-center font-bold text-xl uppercase">Squad Chat...</h1>
            <div>
              <div className="overflow-y-scroll h-[80vh] lg:h-[60vh]">
                {
                  messages.map((msg,index)=>{
                    return(
                    <div key={index} className={`flex my-5 w-fit ${username == msg.user && "ml-auto"}`}>
                      <div className="flex justify-center items-center bg-green-500 font-bold px-3 rounded-l-md">
                        <h3>{msg.user.charAt(0).toUpperCase()}</h3>
                        </div>
                        <div className="bg-gray-400 px-3 rounded-r-md">
                          <span className="text-sm">{msg.user}</span>
                          <h3 className="font-bold">{msg.message}</h3>
                          <h3 className="text-sm text-right">{msg.time}</h3>
                          </div>
                      
                      

                    </div>

                  )})
                }

              </div>
              <form className="flex justify-between gap-2 md:gap-4" onSubmit={submitHandler}>
                <input type="text" placeholder="enter message.." name="name"
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                 className="w-full  border-2 rounded-md outline-none px-3 py-2 text-center"/>
                <button type="submit" className="bg-green-600 rounded-md px-3 py-1">send </button>
              </form>
          </div>
          </div>
          
        ):(
          <div className="w-screen h-screen flex justify-center items-center gap-4">
            <input type="text"
             name="name"
              id="name"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}

              className="broder-2 px-3 py-2 rounded-md outline-none text-center"></input>
            <button type="submit" className="bg-green-600 rounded-md font-bold px-3 py-2 text-white" onClick={()=>!username== "" && setChatActive(true)}>Start Chat</button>
            </div>
        )
      }

    </div>
    </>
   
  
  
  );
}

export default App;
