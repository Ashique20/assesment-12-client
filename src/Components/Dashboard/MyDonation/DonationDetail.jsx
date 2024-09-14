import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Shared/AuthContext/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { toast, ToastContainer } from "react-toastify";

const DonationDetail = (data) => {
    const donation = useLoaderData();
    const { user } = useContext(AuthContext);
    const axiosPublic= useAxiosPublic()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleDonate = () => {
        const updateInfo = {    
                    donation_status:'In Progress',
                    donor_name:data.email,
                    donor_name:data.name
        }
        axiosPublic.put(`/donations/${donation._id}`,updateInfo)
        .then(res=>{
            console.log(res)
            toast.success('Got Donated!')
        })
        document.getElementById("my_modal_5").close();


    }


    return (
        <div className="flex gap-10 border-4">
            <div className="w-3/4">
                <img className="min-h-screen" src="https://stanfordbloodcenter.org/wp-content/uploads/2020/06/Blood-facts_10-illustration-graphics__canteen.png" alt="" />
            </div>
            <div className="text-3xl w-1/2 text-black">
                <div className="flex flex-col gap-2">
                    <h1 className="mb-4 font-bold">Requester Information:</h1>
                    <h1 className="text-xl">Name: {donation.requester_name}</h1>
                    <h1 className="text-xl">Email: {donation?.requester_email}</h1>
                </div>
                <div className="mt-4 flex flex-col gap-y-2">
                    <h1 className="mb-4 font-bold">Donation Information:</h1>
                    <h1 className="text-xl">Recipient Name: {donation.recipient_name}</h1>
                    <h1 className="text-xl">Hospital Name: {donation.hospital_name}</h1>
                    <h1 className="text-xl">District: {donation.recipient_district}</h1>
                    <h1 className="text-xl">Upazila: {donation.recipient_upazila}</h1>
                    <h1 className="text-xl">Full Address: {donation.full_address_line}</h1>
                    <h1 className="text-xl">Donation Date: {donation.donation_date}</h1>
                    <h1 className="text-xl">Request Message: {donation.request_message}</h1>
                </div>
                {
                      user?.email !== donation.requester_email && donation.donation_status==='pending' &&    (
                        <>
                            <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Donate</button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <form onSubmit={handleSubmit(handleDonate)} >
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                value={user?.email}
                                                readOnly
                                                className="input input-bordered"
                                                required
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                value={user?.displayName}
                                                readOnly
                                                className="input input-bordered"
                                                required
                                            />
                                        </div>
                                        <div className="modal-action">
                                        <input type="submit" className="btn" />

                                    </div>
                                    </form>
                                 
                                </div>
                            </dialog>
                        </>
                    )
                }
            </div>
            <ToastContainer/>
        </div>
    );
}

export default DonationDetail;
