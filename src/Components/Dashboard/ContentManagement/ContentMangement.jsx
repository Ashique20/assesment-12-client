import { useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/axiosPublic"
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ContentManagement = () => {
    const axiosPublic = useAxiosPublic()

    const [status, setStatus] = useState('')
    const [filteredBlogs, setFilteredBlogs] = useState([]);


    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs`);
            console.log(res.data, 'getting data');
            return res.data;
        },
    });


    const handleUpdate = (id, status) => {
        const newStatus = status === 'draft' ? 'published' : 'draft';
        const updateInfo = { status: newStatus };

        axiosPublic.patch(`/blogs/${id}`, updateInfo)
            .then(res => {
                console.log(res);
                refetch()
            });
    };

    const handleDelete = (id) => {
        axiosPublic.delete(`/blogs/${id}`)
            .then(res => {
                console.log(res)
                refetch()
            })

    }
    useEffect(() => {
        if (status) {
            const filtered = blogs?.filter((blog) => blog.status === status);
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs([]);
        }
    }, [status, blogs]);

    const handleFilter = (status) => {
        setStatus(status);
    };

    return (
        <div>
            <div className="dropdown lg:ml-[45%] ">
                <div
                    tabIndex={0}
                    role="button"
                    className="p-3 rounded-lg border-2 border-black text-white font-bold mt-4 bg-red-400 m-1"
                >
                    All
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                    <li
                        onClick={() => handleFilter("draft")}
                        className="cursor-pointer"
                    >
                        Draft
                    </li>
                    <li
                        onClick={() => handleFilter("published")}
                        className="cursor-pointer"
                    >
                        Published
                    </li>
                  
                </ul>
            </div>

            <Link to='/dashboard/blog-form'>
                <button className="text-center btn">Add Blog</button>
            </Link>
       <div className="grid grid-cols-2 m-20">
       {filteredBlogs.length > 0
                ? filteredBlogs.map((blog) => (
                    <div key={blog._id} className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img src={blog.image} alt="Blog Image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <h2 className="card-title">{blog.status}</h2>
                            <p>{blog.shortDescription}</p>
                            <div className="card-actions justify-end">
                              
                            
                              <button onClick={(() => handleDelete(blog._id))} className="btn btn-primary">Delete</button>
                              <button onClick={() => handleUpdate(blog?._id, blog?.status)} className="btn btn-primary">{blog.status === 'draft' ? 'Publish' : 'Unpublish'}</button>
                          </div>
                        </div>
                    </div>
                ))
                : blogs.map((blog) => (
                    <div key={blog._id} className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img src={blog.image} alt="Blog Image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <h2 className="card-title">{blog.status}</h2>
                            <p>{blog.shortDescription}</p>
                            <div className="card-actions justify-end">
                              
                            
                                <button onClick={(() => handleDelete(blog._id))} className="btn btn-primary">Delete</button>
                                <button onClick={() => handleUpdate(blog?._id, blog?.status)} className="btn btn-primary">{blog.status === 'draft' ? 'Publish' : 'Unpublish'}</button>
                            </div>
                        </div>
                    </div>
                ))}
       </div>

        </div>
    )
}

export default ContentManagement

