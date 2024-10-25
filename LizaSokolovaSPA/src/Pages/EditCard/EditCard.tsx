import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { toast } from "react-toastify";

const EditCard = () => {
    const { id } = useParams<{ id: string }>();
    const [card, setCard] = useState<TCard | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: { url: "", alt: "" },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: ""
        },
    });
    const nav = useNavigate();

    useEffect(() => {
        const getCard = async () => {
            try {
                const res = await axios.get(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                );
                setCard(res.data);
                setFormData({
                    title: res.data.title,
                    subtitle: res.data.subtitle,
                    description: res.data.description,
                    phone: res.data.phone,
                    email: res.data.email,
                    web: res.data.web,
                    image: { url: res.data.image.url, alt: res.data.image.alt },
                    address: {
                        state: res.data.address.state,
                        country: res.data.address.country,
                        city: res.data.address.city,
                        street: res.data.address.street,
                        houseNumber: res.data.address.houseNumber,
                    }
                });
            } catch (err) {
                toast.error("Failed to load card");
            }
        };
        getCard();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedFields: Partial<typeof formData> = {
            title: formData.title || card?.title,
            subtitle: formData.subtitle,
            description: formData.description,
            image: {
                url: formData.image.url,
                alt: formData.image.alt
            }
        };

        if (formData.phone) updatedFields.phone = formData.phone;
        if (formData.email) updatedFields.email = formData.email;
        if (formData.web) updatedFields.web = formData.web;
        if (formData.address) updatedFields.address = formData.address;

        try {
            const res = await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                updatedFields,
            );
            if (res.status === 200) {
                toast.success("Card updated successfully!");
                nav("/myCards");
            }
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                console.error("AxiosError (details):", err.response?.data);
                toast.error(`Failed to update card: ${err.response?.data?.message || err.message}`);
            } else {
                console.error("Error:", err);
                toast.error("Failed to update card");
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-start dark:bg-gray-600 dark:text-white">
            <h1 className="text-2xl">Edit Card</h1>
            {card && (
                <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Subtitle</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="url"
                        value={formData.image.url}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Image Alt</label>
                    <input
                        type="text"
                        name="alt"
                        value={formData.image.alt}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Website</label>
                    <input
                        type="text"
                        name="web"
                        value={formData.web}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <h2>Address</h2>
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.address.country}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>Street</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.address.street}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <label>House Number</label>
                    <input
                        type="number"
                        name="houseNumber"
                        value={formData.address.houseNumber}
                        onChange={handleInputChange}
                        className="p-2 border rounded" />
                    <button
                        type="submit"
                        className="p-2 mt-4 text-white bg-blue-500 rounded">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditCard;
