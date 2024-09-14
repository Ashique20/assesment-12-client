import { NavLink, Outlet } from "react-router-dom";
import useDonor from "../Hooks/useDonor";

const Dashboard = () => {
  const [donorArray] = useDonor(); // useDonor returns an array, destructure it to get the donor
  const donor = donorArray[0]; // Access the first donor object

  if (!donor) {
    return <div>Loading...</div>; // Handle the case when donor is not yet loaded
  }

  const isAdmin = donor.role === 'admin';
  const isVolunteer = donor.role === 'volunteer';

  return (
    <div className="flex bg-white">
      <div className="bg-red-500 min-h-screen w-96 menu text-white text-xl">
        {(isAdmin || isVolunteer) ? (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Home Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">Go to Profile</NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink to="/dashboard/users">All Users</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/dashboard/blogs">Content Management</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/all-requests">All Requests</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Home Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">Go to Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-donation-request">Create Donation Request</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-donations">My Requests</NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="w-[100%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
