import { useState } from "react"
import useAxiosPublic from "../Hooks/axiosPublic"
import useDonor from "../Hooks/useDonor";

const Chat =()=>{
    const [chats,setChat] = useState()
    console.log(donor,'CONSOLEING')


    const axiosPublic = useAxiosPublic()
    axiosPublic.get('/chat')
    .then(res=>{
        setChat(res.data)
    })


    return(
        <div>
       
        </div>
    )
}

export default Chat