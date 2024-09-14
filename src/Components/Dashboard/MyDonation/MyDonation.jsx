import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Shared/AuthContext/AuthProvider";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const MyDonation = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const email = user?.email;

    const handleDelete = (id) => {
        axiosPublic.delete(`/donations/${id}`)
            .then(res => {
                console.log(res);
                toast.warning('Data got Deleted')
                refetch();  // Correctly call the refetch function
            });
    };

    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donations?email=${email}`);
            console.log(res.data, 'getting data');  // Log the response to see the data in the console
            return res.data;  // Make sure to return the data
        },
    });

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs text-black">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Recipient District</th>
                            <th>Recipient Upazila</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Requester Information</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => (
                            <tr key={donation._id}>
                                <th>{index + 1}</th>
                                <td>{donation.requester_name}</td>
                                <td>{donation.recipient_district}</td>
                                <td>{donation.recipient_upazila}</td>
                                <td>{donation.donation_date}</td>
                                <td>{donation.donation_time}</td>
                                <td>{donation.requester_information}</td>
                                <td>{donation.donation_status}</td>
                                <td>
                                <Link to={`/dashboard/my-donations-edit/${donation?._id}`}>
                                        <button
                                            className="btn btn-primary"
                                        >
                                            Edit                                    </button>
                                    </Link>
                                <Link to={`/dashboard/donation-detail/${donation?._id}`}>
                                        <button
                                            className="btn btn-primary"
                                        >
                                            View                                    </button>
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleDelete(donation._id)}  // Pass function reference
                                    >
                                        Delete
                                    </button>
                                  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default MyDonation;
