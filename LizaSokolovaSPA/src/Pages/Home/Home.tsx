import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { TbInfoHexagon } from "react-icons/tb";

const Home = () => {
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
    const res = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
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

  useEffect(() => {
    getData();
  }, []);

  const user = useSelector((state: TRootState) => state.UserSlice);

  return (
    <div className="flex flex-col items-center justify-start gap-2 dark:bg-gray-600 dark:text-white">
      <h1 className="text-2xl md:text-3xl lg:text-4x">Home Page</h1>
      <p className="text-lg md:text-xl">Welcome Home!</p>
      {user.isLoggedIn && <p className="text-lg md:text-xl">User Is Logged In!</p>}

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
                <hr />
                <div className="flex justify-between mt-2">
                  {user && user.user && (
                    <FaHeart
                      size={20}
                      className="m-auto cursor-pointer"
                      color={isLikedCard(item) ? "red" : "black"}
                      onClick={() => likeUnlikeCard(item)}
                    />
                  )}
                  <TbInfoHexagon
                    size={20}
                    className="m-auto hover:underline"
                    onClick={() => navToCard(item._id)}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div >
  );
};

export default Home;
