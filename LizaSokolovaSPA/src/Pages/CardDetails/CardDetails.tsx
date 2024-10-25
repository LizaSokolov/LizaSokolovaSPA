import { TCard } from "../../Types/TCard";

interface CardDetailsProps {
  card: TCard | null;
}
const CardDetails = ({ card }: CardDetailsProps) => {
  if (!card) {
    return <p>Loading card details...</p>;
  }

  return (
    <div className="text-black bg-white dark:bg-gray-700 dark:text-gray-200">
      <h1>{card.title}</h1>
      <h2>{card.bizNumber}</h2>
      <p>Phone: {card.phone}</p>
      <p>Description: {card.description}</p>
      <p>
        Address: {card.address.houseNumber} {card.address.street}, {card.address.city}
      </p>
    </div>
  );
};

export default CardDetails;