import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { Link } from "react-router-dom";

const AllRequests = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch donations using react-query
    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donations');
            console.log(res.data, 'getting data');  // Log the response to see the data in the console
            return res.data;  // Return the fetched data
        },
    });

    // Handle setting donation status to "done"
    const handleDone = (id) => {
        const updateInfo = { donation_status: 'done' };
        axiosPublic.patch(`/donations/${id}`, updateInfo)
            .then(res => {
                console.log(res.data);  // Log the result of the PATCH request
                refetch();  // Refetch donations to update the UI
            });
    };

    const handleCancel = (id) => {
        const updateInfo = { donation_status: 'cancel' };
        axiosPublic.patch(`/donations/${id}`, updateInfo)
            .then(res => {
                console.log(res.data);  // Log the result of the PATCH request
                refetch();  // Refetch donations to update the UI
            });
    };

    const handleDelete=(id)=>{
        axiosPublic.delete(`/donations/${id}`)
        .then(res => {
            console.log(res);
            refetch();  // Correctly call the refetch function
        });
    }

    return (
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
                        <th>Actions</th>
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
                            <td>
                                {donation.donation_status === 'In Progress'
                                    ? `${donation.requester_name} (${donation.requester_email})`
                                    : donation.requester_information
                                }
                                {donation.donation_status === 'In Progress' && (
                                    <div className="flex gap-2 p-2">
                                        <button 
                                            onClick={() => handleDone(donation._id)} 
                                            className="btn bg-green-600 text-white">
                                            Done
                                        </button>
                                        <button 
                                            onClick={() => handleCancel(donation._id)} 
                                            className="btn bg-red-600 text-white">
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td>{donation.donation_status}</td>
                            <td className="flex gap-2">
                                <Link to={`/dashboard/my-donations-edit/${donation._id}`}>
                                    <button className="btn btn-primary">Edit</button>
                                </Link>
                                <Link to={`/dashboard/donation-detail/${donation._id}`}>
                                    <button className="btn btn-primary">View</button>
                                </Link>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => handleDelete(donation._id)}>  {/* Assuming you will implement handleDelete */}
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllRequests;
