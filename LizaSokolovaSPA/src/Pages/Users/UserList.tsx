import { useEffect, useState } from "react";
import axios from "axios";
import { TUser } from "../../Types/TUser";
import { toast } from "react-toastify";
import { FaTrash, FaUserTie } from "react-icons/fa";

const UsersList = () => {
    const [users, setUsers] = useState<TUser[]>([]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found");
                return;
            }

            const config = {
                headers: {
                    "x-auth-token": token
                }
            };

            const response = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
                config
            );

            console.log("Users:", response.data);

            setUsers(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "x-auth-token": token
                }
            };

            await axios.delete(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
                config
            );

            setUsers(users.filter(user => user._id !== id));
            toast.success("User deleted!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("User is not deleted");
        }
    };

    const promoteToBusiness = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "x-auth-token": token
                }
            };

            await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/promote/${id}`,
                {},
                config
            );

            fetchUsers();
            toast.success("User updated to business!");
        } catch (error) {
            console.error("Error", error);
            toast.error("User could not be updated");
        }
    };

    return (
        <div className="min-h-screen p-5 bg-gray-100 dark:bg-gray-600 dark:text-white">
            <h1 className="mb-5 text-3xl font-bold text-center">User List</h1>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="flex items-center justify-between p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:bg-blue-50 dark:bg-gray-800 dark:text-white"
                    >
                        <div className="flex-grow">
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex-shrink-0 space-x-2">
                            <FaUserTie
                                className="text-blue-500 cursor-pointer"
                                onClick={() => promoteToBusiness(user._id)}
                                title="Update to business"
                            />
                            <FaTrash
                                className="text-red-500 cursor-pointer"
                                onClick={() => deleteUser(user._id)}
                                title="Delete User"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default UsersList;
