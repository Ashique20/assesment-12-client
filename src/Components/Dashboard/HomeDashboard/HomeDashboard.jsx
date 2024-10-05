import { useContext } from "react";
import { AuthContext } from "../../../Shared/AuthContext/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosPublic from "../../Hooks/axiosPublic"; 

const HomeDashboard = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donations?email=${email}`);
            console.log(res.data, 'getting data');  // Log the response to see the data in the console
            return res.data;  // Make sure to return the data
        },
    });

    const handleDelete = (id) => {
        axiosPublic.delete(`/donations/${id}`)
            .then(res => {
                console.log(res);
                refetch();  // Correctly call the refetch function
            });
    };

    return (
        <div className="text-black">
            <h1 className="text-6xl mb-10 mt-4">Welcome {user?.displayName}</h1>
            {donations.length === 0 ? (
                <h1 className="text-3xl text-red-500">Please add requests</h1>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-xs text-black">
                        <thead className="text-black">
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
                                        <Link to={`/dashboard/my-donations-edit/${donation._id}`}>
                                            <button className="btn btn-primary">
                                                Edit
                                            </button>
                                        </Link>
                                        <Link to={`/dashboard/donation-detail/${donation._id}`}>
                                            <button className="btn btn-primary">
                                                View
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleDelete(donation._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HomeDashboard;
