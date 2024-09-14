import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            console.log(res.data, 'getting data');  // Log the response to see the data in the console
            return res.data;  // Make sure to return the data
        },
    });

    const handleBlock = (id, currentStatus) => {
        const updateInfo = { status: currentStatus === 'blocked' ? 'active' : 'blocked' }; // Toggle between 'blocked' and 'active'
        axiosPublic.patch(`/users/${id}`, updateInfo)
            .then(res => {
                console.log(res);
                refetch();  // Refetch data to update the table after the status change
            });
    };

    const handleAdmin = (id, currentRole) => {
        const newRole = currentRole === 'admin' ? 'donor' : 'admin';  // Toggle between 'admin' and 'donor'
        const updateInfo = { role: newRole };

        axiosPublic.patch(`/users/${id}`, updateInfo)
            .then(res => {
                console.log(res);
                refetch();
            });
    };

    const handleVolunteer = (id, currentRole) => {
        const newRole = currentRole === 'volunteer' ? 'donor' : 'volunteer';  // Toggle between 'volunteer' and 'donor'
        const updateInfo = { role: newRole };

        axiosPublic.patch(`/users/${id}`, updateInfo)
            .then(res => {
                console.log(res);
                refetch();
            });
    };

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
                            <th>user Date</th>
                            <th>user Time</th>
                            <th>Requester Information</th>
                            <th>Status</th>
                            <th>Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.requester_name}</td>
                                <td>{user.displayName}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>{user.user_time}</td>
                                <td>{user.requester_information}</td>
                                <td>{user.user_status}</td>
                                <td>
                                    {/* Toggle Block/Unblock Button */}
                                    <button
                                        onClick={() => handleBlock(user._id, user.status)}
                                        className="btn btn-primary"
                                    >
                                        {user.status === 'blocked' ? 'Unblock' : 'Block'}  {/* Dynamic button label */}
                                    </button>
                                    
                                    {/* Toggle Volunteer Button */}
                                    <button
                                        onClick={() => handleVolunteer(user._id, user.role)}  // Pass the current role
                                        className="btn btn-primary"
                                    >
                                        {user.role === 'volunteer' ? 'Revoke Volunteer' : 'Make Volunteer'}  {/* Change button label dynamically */}
                                    </button>

                                    {/* Toggle Admin Button */}
                                    <button
                                        onClick={() => handleAdmin(user._id, user.role)}  // Pass the current role
                                        className="btn btn-primary"
                                    >
                                        {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}  {/* Change button label dynamically */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
