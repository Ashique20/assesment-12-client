import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Shared/AuthContext/AuthProvider";
import useDonor from "../../Hooks/useDonor";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/axiosPublic";
import { toast, ToastContainer } from "react-toastify";


const Profile = () => {
    const axiosPublic = UseAxiosPublic();
    const [donor, refetch] = useDonor();
    const [districts, setDistrict] = useState([]);
    const [upazilas, setUpazila] = useState([]);
    const [isEditable, setIsEditable] = useState(false); // State to track editability

    useEffect(() => {
        fetch("/district.json")
            .then((res) => res.json())
            .then((data) => setDistrict(data.districts));
    }, []);

    useEffect(() => {
        fetch("/upazila.json")
            .then((res) => res.json())
            .then((data) => setUpazila(data.upazilas));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleUpdate = (data) => {
        const updateInfo = {
            displayName: data.name,
            blood_group: data.blood_group,
            district: data.district,
            upazila: data.upazila,
            image: data.image,
        };
        axiosPublic.put(`/users/${donor[0]?._id}`, updateInfo).then((res) => {
            console.log(res);
            toast('Data got Updated')
            refetch();
            setIsEditable(false); // Disable edit mode after submission
        });
    };

    return (
        <div>
            <div>
                <img
                    className="w-full h-96"
                    src="https://iwritingsolutions.com/wp-content/uploads/2022/05/starry-sky-night-dark-wallpaper-preview-1.jpg"
                    alt=""
                />
            </div>

            <div className="mx-20 my-8 flex items-center gap-4 border-b-4 p-4">
                <div className="avatar">
                    <div className="w-32 rounded-full">
                        <img src={donor[0]?.photoURL} alt="Profile" />
                    </div>
                </div>
                <div>
                    <h1 className="text-black font-bold text-xl">
                        <span className="text-black font-bold">Name:</span> {donor[0]?.displayName}
                    </h1>
                    <h1 className="text-black">
                        <span className="text-black font-bold">Email:</span> {donor[0]?.email}
                    </h1>
                    <h1 className="text-black">
                        <span className="text-black font-bold">Address:</span> {donor[0]?.district}, {donor[0]?.upazila}
                    </h1>
                    <h1 className="text-black mt-2">
                        Blood Group: <span className="bg-red-600 p-1 rounded ">{donor[0]?.blood_group}</span>
                    </h1>
                </div>
            </div>

            <button className="btn w-96 ml-40 mb-2" onClick={() => setIsEditable(true)}>
                Edit
            </button>

            <div>
                <form onSubmit={handleSubmit(handleUpdate)} className="grid grid-cols-2 gap-4 mx-10 mb-20 text-black">
                    <input
                        {...register("name")}
                        required
                        type="text"
                        placeholder="Name"
                        defaultValue={donor[0]?.displayName}
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                        disabled={!isEditable} // Disable if not in edit mode
                    />
                    <input
                        {...register("image")}
                        type="text"
                        placeholder="Image URL"
                        defaultValue={donor[0]?.image}
                        className="input input-bordered bg-white border-black"
                        required
                        disabled={!isEditable} // Disable if not in edit mode
                    />
                    <select
                    required
                        {...register("blood_group")}
                        defaultValue={donor[0]?.blood_group}
                        className="select bg-white select-bordered w-full rounded-lg border-black border-2"
                        disabled={!isEditable} // Disable if not in edit mode
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
                        defaultValue={donor[0]?.district}
                        className="select bg-white select-bordered w-full rounded-lg border-black border-2"
                        disabled={!isEditable} // Disable if not in edit mode
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district.id} value={district.name}>
                                {district?.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex">
                        <select
                        required
                            {...register("upazila", { required: true })}
                            defaultValue={donor[0]?.upazila}
                            className="select bg-white select-bordered w-full rounded-lg border-black border-2"
                            disabled={!isEditable} // Disable if not in edit mode
                        >
                            <option value="">Select Upazila</option>
                            {upazilas.map((upazila) => (
                                <option key={upazila.id} value={upazila.name}>
                                    {upazila?.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="submit"
                            className={`input input-bordered bg-red-500 cursor-pointer text-white font-bold border-2 border-white w-full ml-80 ${
                                isEditable ? "" : "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!isEditable} // Disable submit button if not in edit mode
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
        
    );
};

export default Profile;
