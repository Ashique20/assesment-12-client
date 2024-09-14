import { useContext } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../AuthContext/AuthProvider"
import { Link, useLocation, useNavigate } from "react-router-dom"

const LogIn =()=>{
  const location = useLocation()
  const navigate = useNavigate();

  const {logIn} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    const onSubmit = (data) => {
      const email = data.email
      const password = data.password
      logIn(email,password)
      .then(result=>{
        console.log(result)
        navigate(location?.state ? location.state : "/");

      })
      .catch(error=>console.log(error))

    }

    return(
        <div className="ml-[36%] mt-40">
               <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h1 className="text-3xl text-center ">Sign In</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input {...register("password")} type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <Link to='/register'>Have an Account?Please register</Link>
          </label>
        </div>
        <div className="form-control mt-6">
            <input className="btn" type="submit" />
        </div>
      </form>
    </div>
        </div>
    )
}

export default LogIn;