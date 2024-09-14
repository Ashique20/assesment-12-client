import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/axiosPublic";

const BlogForm =()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const axiosPublic = useAxiosPublic()
const handleBlog=(data)=>{
    console.log(data)
    const postInfo= {
        title:data.title,
        image:data.thumbnail_image,
        content:data.content,
        status:'draft'
    }
    axiosPublic.post('/blogs',postInfo)
    .then(res=>console.log(res))
}

    return(
        <form action="" onSubmit={handleSubmit(handleBlog)} className=" gap-4 mx-10 mb-20 text-black">
                <div className="grid grid-cols-1 gap-2 my-10">

                    <input
                        {...register("title")}
                        type="text"
                        placeholder='Title'
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                    />
                   
                   
                   
                    <input
                        {...register("thumbnail_image")}
                        type="text"
                        placeholder="Thumbnail Image"
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                    />
                    <input
                        {...register("content")}
                        type="text"
                        placeholder="Content"
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full h-24"
                    />
             

                </div>
             
                <input type="submit" className="input input-bordered bg-red-500 cursor-pointer text-white font-bold border-2 border-white w-full  " />
            </form>
    )
}

export default BlogForm