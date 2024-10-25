import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaPencil } from "react-icons/fa6";
import { PiPlus } from "react-icons/pi";

const MyCards = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector(
        (state: TRootState) => state.SearchSlice.search,
    );

    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false;
    };

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    const getData = async () => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

        const res = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
        );
        setCards(res.data);
    };

    const likeUnlikeCard = async (card: TCard) => {
        const res = await axios.patch(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id,
        );
        if (res.status === 200) {
            toast.success("card liked/unliked");

            const index = cards.indexOf(card);
            const ifLiked = cards[index].likes.includes(user.user!._id);
            const newCards = [...cards];
            if (ifLiked) {
                newCards[index].likes.splice(index);
            } else {
                newCards[index].likes.push(user.user!._id);
            }

            setCards(newCards);
        }
    };

    const deleteCard = async (card: TCard) => {
        try {
            const res = await axios.delete(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" +
                card._id,
            );

            const index = cards.indexOf(card);
            const newCards = [...cards];
            newCards.splice(index, 1);

            setCards(newCards);

            if (res) {
                toast.success("card deleted");
            }
        } catch (err) {
            toast.error("card delete failed");
        }
    };

    const navToCreate = () => {
        nav("/createCard");
    };

    useEffect(() => {
        getData();
    }, []);

    const user = useSelector((state: TRootState) => state.UserSlice);

    return (
        <div className="flex flex-col items-center justify-start gap-2 dark:bg-gray-600 dark:text-white">
            <h1 className="text-2xl md:text-3xl lg:text-4x">My Cards</h1>
            <p className="text-lg md:text-xl">this cards was made by the user</p>

            <div className="flex flex-wrap justify-center w-full max-w-6xl gap-6 m-auto">
                {searchCards()!.map((item: TCard) => {
                    return (
                        <Card key={item._id} className="card dark:bg-gray-700 dark:text-gray-200">
                            <img
                                onClick={() => navToCard(item._id)}
                                src={item.image.url}
                                alt={item.image.alt}
                                className="object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h1 className="card-title">{item.title}</h1>
                                <h3 className="card-subtitle">{item.subtitle}</h3>
                                <p className="card-description">{item.description}</p>
                                <p className="card-address">
                                    Address: {item.address.houseNumber} {item.address.street}, {item.address.city}, {item.address.country}
                                </p>
                            </div>
                            <hr />
                            {user && user.user && (
                                <>
                                    <div className="flex justify-between mt-2">
                                        <FaHeart
                                            size={20}
                                            className="m-auto cursor-pointer"
                                            color={isLikedCard(item) ? "red" : "black"}
                                            onClick={() => likeUnlikeCard(item)}
                                        />
                                        <div className="flex space-x-2">
                                            <FaPencil size={20} onClick={() => nav(`/editCard/${item._id}`)} />
                                            <FaTrash size={20} onClick={() => deleteCard(item)} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </Card>
                    );
                })}
            </div>

            <div className="fixed flex p-3 rounded-full cursor-pointer right-10 top-20 bg-cyan-300">
                <PiPlus size={20} onClick={navToCreate} />
            </div>
        </div>
    );
};

export default MyCards;
