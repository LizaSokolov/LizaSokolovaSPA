import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { toast } from "react-toastify";
import { Card } from "flowbite-react";
import { FaHeart } from "react-icons/fa";

const CardPage = () => {
    const { id } = useParams<{ id: string }>();
    const [cardData, setCardData] = useState<TCard | null>(null);
    const user = useSelector((state: TRootState) => state.UserSlice);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
                setCardData(response.data);
            } catch (error) {
                console.error("Error fetching card data", error);
            }
        };
        fetchCardData();
    }, [id]);

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false;
    };

    const likeUnlikeCard = async () => {
        if (!cardData) return;
        try {
            const res = await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardData._id}`,
            );
            if (res.status === 200) {
                toast.success("Card liked/unliked");
                const newCardData = { ...cardData };
                const ifLiked = newCardData.likes.includes(user.user!._id);
                if (ifLiked) {
                    newCardData.likes = newCardData.likes.filter(
                        (like) => like !== user.user!._id,
                    );
                } else {
                    newCardData.likes.push(user.user!._id);
                }
                setCardData(newCardData);
            }
        } catch (error) {
            toast.error("Error liking/unliking card");
        }
    };

    return (
        <div className="flex flex-wrap justify-center w-full max-w-6xl gap-6 m-auto">
            {cardData && (
                <Card className="card dark:bg-gray-700 dark:text-gray-200">
                    <img
                        src={cardData.image.url}
                        alt={cardData.image.alt}
                        className="h-[300px] w-full object-cover mb-4"
                    />
                    <h1 className="card-title">{cardData.title}</h1>
                    <h3 className="card-subtitle">{cardData.subtitle}</h3>
                    <p className="card-description">{cardData.description}</p>
                    <p className="card-address">
                        Address: {cardData.address.houseNumber}{" "}
                        {cardData.address.street}, {cardData.address.city},{" "}
                        {cardData.address.state}, {cardData.address.country}, {cardData.address.zip}
                    </p>
                    <hr className="my-4" />
                    {user && user.user && (
                        <div className="flex items-center justify-between">
                            <FaHeart
                                size={25}
                                className="cursor-pointer"
                                color={isLikedCard(cardData) ? "red" : "black"}
                                onClick={likeUnlikeCard}
                            />
                            <span>{cardData.likes.length} Likes</span>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default CardPage;
