import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import flashcardAPI from "../../api/flashcardAPI";

const CardPackDetails = () => {
    const { id } = useParams();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const { data } = await flashcardAPI.get(`/packs/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                console.log(data);  // Log the response to check its structure
                if (Array.isArray(data)) {
                    setCards(data);
                } else {
                    // Handle case if the response is not an array (e.g., data.cards)
                    setCards(data.cards || []);
                }
            } catch (err) {
                console.error(err);
                alert("Error fetching cards");
            }
        };

        fetchCards();
    }, [id]);

    return (
        <div className="card-pack-details-container">
            <h2>Flashcards</h2>
            <ul>
                {Array.isArray(cards) && cards.map((card) => (
                    <li key={card.id}>
                        <strong>Q:</strong> {card.question}
                        <br />
                        <strong>A:</strong> {card.answer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardPackDetails;
