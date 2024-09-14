
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Shared/AuthContext/AuthProvider";
import useAxiosPublic from "../Hooks/axiosPublic";


const DonationRequests=()=>{
    
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const email = user?.email;

 

    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donations`);
            console.log(res.data, 'getting data');  // Log the response to see the data in the console
            return res.data;  // Make sure to return the data
        },
    });
    return(
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
                       
                            <Link to={`/dashboard/donation-detail/${donation?._id}`}>
                                    <button
                                        className="btn btn-primary"
                                    >
                                        View                                    </button>
                                </Link>
                             
                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default DonationRequests