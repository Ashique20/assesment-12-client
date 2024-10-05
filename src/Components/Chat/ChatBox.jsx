import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import useAxiosPublic from "../Hooks/axiosPublic";
import { AuthContext } from "../../Shared/AuthContext/AuthProvider";

const ChatBox = () => {
    const [chats, setChat] = useState()
    const {user} = useContext(AuthContext)


    const axiosPublic = useAxiosPublic()
    axiosPublic.get('/chat')
        .then(res => {
            setChat(res.data)
        })
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();
    const submitChat = (data) => {
        const chat = { chat: data.chat,image:user?.photoURL}
        axiosPublic.post('/chat', chat)
            .then(res => console.log(res.data))

    }
    return (
        <div>
            {

                chats?.map(chat => <div>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src={chat?.image} />
                            </div>
                        </div>
                        <div className="chat-bubble">{chat?.chat}</div>
                    </div>
                </div>)

            }
            <div className="ml-[36%] mt-96">

                <div className=" shadow-2xl flex">
                    <form onSubmit={handleSubmit(submitChat)} className="w-[50%] " >

                        <div className="form-control ">

                            <input
                                {...register("chat")}
                                type="chat"
                                placeholder="chat"
                                className="input input-bordered bg-white border- border-black"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn" type="submit" value='Send' />
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default ChatBox
