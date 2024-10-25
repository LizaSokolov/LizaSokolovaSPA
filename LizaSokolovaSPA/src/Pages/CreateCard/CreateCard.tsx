import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateCard = () => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: {
            url: '',
            alt: '',
        },
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: ''
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            image: {
                ...prevData.image,
                [name]: value,
            },
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");

        try {
            const response = await axios.post(
                'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                toast.success('Card created successfully!');
                setFormData({
                    title: '',
                    subtitle: '',
                    description: '',
                    phone: '',
                    email: '',
                    web: '',
                    image: { url: '', alt: '' },
                    address: { state: '', country: '', city: '', street: '', houseNumber: '' },
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("AxiosError:", error.response?.data || error.message);
            } else {
                console.error("Error:", error);
            }
            toast.error('Error creating card');
        }
    };


    return (
        <div className="min-h-screen p-4 text-black bg-white dark:bg-gray-600 dark:text-gray-200">
            <div className="container max-w-md p-6 mx-auto bg-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:text-gray-200">
                <h1 className="mb-4 text-2xl">Create New Card</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="p-2 border" />
                    <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" required className="p-2 border" />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="p-2 border" />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-2 border" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border" />
                    <input type="text" name="web" value={formData.web} onChange={handleChange} placeholder="Website" className="p-2 border" />

                    <h2 className="text-lg">Image</h2>
                    <input type="text" name="url" value={formData.image.url} onChange={handleImageChange} placeholder="Image URL" className="p-2 border" />


                    <h2 className="text-lg">Address</h2>
                    <input type="text" name="country" value={formData.address.country} onChange={handleAddressChange} placeholder="Country" className="p-2 border" />
                    <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} placeholder="City" className="p-2 border" />
                    <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} placeholder="Street" className="p-2 border" />
                    <input type="number" name="houseNumber" value={formData.address.houseNumber} onChange={handleAddressChange} placeholder="House Number" className="p-2 border" />

                    <button type="submit" className="p-2 text-white bg-blue-500 rounded">Create Card</button>
                </form>
            </div>
        </div>
    );
};

export default CreateCard;
