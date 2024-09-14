import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/axiosPublic";

const SearchDonor = () => {
    const axiosPublic = useAxiosPublic();
    const [districts, setDistrict] = useState([]);
    const [upazilas, setUpazila] = useState([]);
    const [donors, setDonors] = useState([]);
    console.log(donors)
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Fetch districts data
    useEffect(() => {
        fetch("/district.json")
            .then((res) => res.json())
            .then((data) => setDistrict(data.districts));
    }, []);

    // Fetch upazilas data
    useEffect(() => {
        fetch("/upazila.json")
            .then((res) => res.json())
            .then((data) => setUpazila(data.upazilas));
    }, []);

    // Handle search form submission
    const handleSearch = (data) => {
        const { upazila, district, blood_group } = data;
        console.log(data)
        setLoading(true);

        // Make API request to search for donors
        axiosPublic
            .get(`/users?district=${district}&upazila=${upazila}&blood=${blood_group}`)
            .then((res) => {
                setDonors(res.data); // Set the donors data
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <div>
            {/* Search Form */}
            <form onSubmit={handleSubmit(handleSearch)} className="grid grid-cols-1 gap-4 mx-10 mb-20 text-black">

                {/* Upazila Dropdown */}
                <select
                    {...register("upazila", { required: true })}
                    className="select select-bordered w-full rounded-lg border-black bg-white border-2"
                >
                    <option value="">Select Upazila</option>
                    {upazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.name}>
                            {upazila?.name}
                        </option>
                    ))}
                </select>

                {/* District Dropdown */}
                <select
                    {...register("district", { required: true })}
                    className="select select-bordered w-full rounded-lg border-black bg-white border-2"
                >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                        <option key={district.id} value={district.name}>
                            {district?.name}
                        </option>
                    ))}
                </select>

                {/* Blood Group Dropdown */}
                <select
                    {...register("blood_group", { required: true })}
                    className="select bg-white select-bordered w-full rounded-lg border-black border-2"
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

                <input className="btn" type="submit" value='Search' />
            </form>

            {/* Donors List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {donors.length > 0 ? (
                        <ul>

                            <div className="overflow-x-auto"
                            >
                                <table className="table table-xs text-black">
                                    <thead>
                                        <tr className="text-black">
                                            <th></th>
                                            <th>Name</th>
                                            <th>Recipient District</th>
                                            <th>Recipient Upazila</th>
                                            <th>District</th>
                                            <th>Blood_Group</th>
                                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donors.map((donor, index) => (
                                            <tr key={donor._id}>
                                                <th>{index + 1}</th>
                                                <td>{donor.displayName}</td>
                                                <td>{donor.email}</td>
                                                <td>{donor.upazila}</td>
                                                <td>{donor.district}</td>
                                                <td>{donor.blood_group}</td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ul>
                    ) : (
                        <p>No donors found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchDonor;
