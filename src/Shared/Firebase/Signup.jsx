import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../Components/Hooks/axiosPublic";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [districts, setDistrict] = useState([]);
  const [upazilas, setUpazila] = useState([]);
  const [formError, setFormError] = useState(""); // renamed error state

  useEffect(() => {
    fetch("district.json")
      .then((res) => res.json())
      .then((data) => setDistrict(data.districts));
  }, []);

  useEffect(() => {
    fetch("upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazila(data.upazilas));
  }, []);

  const { signUp } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setError, // to set form validation errors
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, confirm_password, name: displayName, image:photoURL, password, blood_group, district, upazila } = data;

    // Clear previous errors
    clearErrors();
    setFormError(""); // clear renamed formError state

    // Check if passwords match
    if (password !== confirm_password) {
      return setError("confirm_password", { type: "manual", message: "Passwords do not match" });
    }

    // Sign up the user
    signUp(email, password)
      .then((result) => {
        const user = result.user;

        // Update profile after successful sign-up
        return updateProfile(user, {
          displayName,
          photoURL
        }).then(() => {
          console.log("User profile updated:", user);
          const userInfo = {
            email, displayName, blood_group, district, upazila, status: 'active', role: 'donor', photoURL
          };
          axiosPublic.post('/users', userInfo)
            .then(res => {
              console.log(res.data);
              toast("User created successfully"); // Optional: using toast to show success
              navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
              console.log(err.message);
              setFormError("Error creating user in database");
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
        setError("signUp", { type: "manual", message: error.message });
      });
  };

  return (
    <div className="ml-[36%] mt-40">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl text-center mt-2">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          {formError && <p className="text-red-500 text-center">{formError}</p>} {/* Display formError if any */}
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              {...register("image")}
              type="text"
              placeholder="Image URL"
              className="input input-bordered"
              required
            />
          </div>

          <select
            {...register("blood_group")}
            className="select select-bordered w-full rounded-lg border-black border-2"
            required
          >
            <option value="A(positive)">A(positive)</option>
            <option value="A(negative)">A(negative)</option>
            <option value="B(positive)">B(positive)</option>
            <option value="B(negative)">B(negative)</option>
            <option value="AB(positive)">AB(positive)</option>
            <option value="AB(negative)">AB(negative)</option>
            <option value="O(positive)">O(positive)</option>
            <option value="O(negative)">O(negative)</option>
          </select>

          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full rounded-lg border-black border-2"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district?.name}
              </option>
            ))}
          </select>

          <select
            {...register("upazila", { required: true })}
            className="select select-bordered w-full rounded-lg border-black border-2"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila?.name}
              </option>
            ))}
          </select>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              {...register("confirm_password")}
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered"
              required
            />
            {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
          </div>
          
          <label className="label">
            <Link to="/logIn">New here? Please sign in</Link>
          </label>
          
          <div className="form-control mt-6">
            <input className="btn" type="submit" />
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
