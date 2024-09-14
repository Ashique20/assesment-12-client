import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Shared/AuthContext/AuthProvider";
import useAxiosPublic from "../../Hooks/axiosPublic";
import useDonor from "../../Hooks/useDonor";
import { toast, ToastContainer } from "react-toastify";

const AddDonation=()=>{
    const {user} = useContext(AuthContext)
    const axiosPublic =useAxiosPublic()
    const[donor] = useDonor()
    const handleRequest=(data)=>{
        console.log(data)
        const requests={
            requester_name:user?.displayName,
            requester_email:user?.email,
            recipient_name:data.recipient_name,
            recipient_district:data.recipient_district,
            recipient_upazila:data.recipient_upazila,
            hospital_name:data.hospital_name,
            full_address_line:data.full_address_line,
            donation_date:data.donation_date,
            request_message:data.request_message,
            donation_time:data.donation_time,
            donation_status:'pending',
            requester_information:'No donor'
        }

        axiosPublic.post('/donations',requests)
        .then(res=>{
            console.log(res)
            toast('Data Got Added')
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
    return(
        <div>
             {
                donor[0].status!=='blocked'? <form action=""  onSubmit={handleSubmit(handleRequest)} className=" gap-4 mx-10 mb-20 text-black">
                <div className="grid grid-cols-2 gap-2 my-10">
                <input
                   
                     type="text"
                     placeholder={user?.displayName}
                     className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full "
                     readOnly
                 />
                <input
                   
                     type="text"
                     placeholder={user?.email}
                     className="input bg-white border-black border-2 input-bordered rounded-none input-md w-full"
                     readOnly
                 />
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
                     <option value="A+">A(positive)</option>
                     <option value="A-">A(negative)</option>
                     <option value="B+">B(positive)</option>
                     <option value="B-">B(negative)</option>
                     <option value="AB+">AB(positive)</option>
                     <option value="AB-">AB(negative)</option>
                     <option value="O+">O(positive)</option>
                     <option value="O-">O(negative)</option>
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
             </form>:<h1 className="text-black text-3xl text-center mt-40">
                You have been blocked by the Admin
             </h1>
             }
             <ToastContainer/>
        </div>
    )
}

export default AddDonation