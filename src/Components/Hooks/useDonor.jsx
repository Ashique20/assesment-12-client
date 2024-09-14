import { useContext } from "react";
import useAxiosPublic from "./axiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Shared/AuthContext/AuthProvider";

const useDonor = () => {
    const { user } = useContext(AuthContext);  // Get the user from AuthContext
    const axiosPublic = useAxiosPublic();      // Get the axios instance

    const email = user?.email;  // Directly access email

    const { data: donor = [] ,refetch} = useQuery({
        queryKey: ['donor', email],  // Query key with email
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${email}`);
            console.log(res,'working')
            // Fetch data based on email
            return res.data;  // Return the response data
        }
    });

    return [donor,refetch];  // Return donor data
};

export default useDonor;
