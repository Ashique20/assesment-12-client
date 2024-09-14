import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom"
import useAxiosPublic from "../../Hooks/axiosPublic";
import { toast, ToastContainer } from "react-toastify";

const UpdateDonation = () => {
    const donation = useLoaderData()
    const axiosPublic = useAxiosPublic()

    const handleUpdate = (data) => {
        const requests = {

            recipient_name: data.recipient_name,
            recipient_district: data.recipient_district,
            recipient_upazila: data.recipient_upazila,
            hospital_name: data.hospital_name,
            full_address_line: data.full_address_line,
            donation_date: data.donation_date,
            request_message: data.request_message,
            donation_time: data.donation_time,
            

        }

        axiosPublic.patch(`/donations/${donation?._id}`, requests)
        .then(res => {
            toast('Data got updated')
            console.log(res)
        })
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [districts, setDistrict] = useState([]);
    const [upazilas, setUpazila] = useState([]);

    useEffect(() => {
        fetch("/district.json")
            .then((res) => res.json())
            .then((data) => setDistrict(data.districts)); // Set the districts state with fetched data
    }, []);

    useEffect(() => {
        fetch("/upazila.json")
            .then((res) => res.json())
            .then((data) => setUpazila(data.upazilas)); // Set the upazilas state with fetched data
    }, []);
    return (
        <div>
            {donation._id}
            <form action="" onSubmit={handleSubmit(handleUpdate)} className=" gap-4 mx-10 mb-20 text-black">
                <div className="grid grid-cols-2 gap-2 my-10">

                    <input
                        {...register("recipient_name")}
                        type="text"
                        placeholder='Recipient Name'
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                    />
                    <select
                        {...register("blood_group")}
                        className="select bg-white select-bordered w-full rounded-lg border-black border-2"
                        required
                    >
                        <option value="">Blood Group</option>
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
                        {...register("recipient_district", { required: true })}
                        className="select bg-white select-bordered w-full rounded-lg border-black border-2"
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district.id} value={district.name}>
                                {district?.name}
                            </option>
                        ))}
                    </select>
                    <select
                        {...register("recipient_upazila", { required: true })}
                        className="select bg-white select-bordered w-full rounded-lg border-black border-2"
                    >
                        <option value="">Select Upazila</option>
                        {upazilas.map((upazila) => (
                            <option key={upazila.id} value={upazila.name}>
                                {upazila?.name}
                            </option>
                        ))}
                    </select>
                    <input
                        {...register("hospital_name")}
                        type="text"
                        placeholder="Hospital name"
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                    />
                    <input
                        {...register("full_address_line")}
                        type="text"
                        placeholder="Full address line"
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                    />
                    <input
                        {...register("donation_date")}
                        type="date"
                        placeholder="Date"
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                    />
                    <input
                        {...register("donation_time")}
                        type="time"
                        placeholder="Time"
                        className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                    />

                </div>
                <input
                    {...register("request_message")}
                    type="text"
                    placeholder="Request message"
                    className="input bg-white border-black border-2 input-bordered rounded-none  mb-4 w-full"
                />
                <input type="submit" className="input input-bordered bg-red-500 cursor-pointer text-white font-bold border-2 border-white w-full  " />
            </form>
            <ToastContainer/>
        </div>
    )
}

export default UpdateDonation