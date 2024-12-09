import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import flashcardAPI from "../../api/flashcardAPI";

const CardPacks = () => {
    const [cardPacks, setCardPacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCardPacks = async () => {
            try {
                const { data } = await flashcardAPI.get("/packs", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCardPacks(data);
            } catch (err) {
                console.error(err);
                alert("Error fetching card packs");
            }
        };

        fetchCardPacks();
    }, []);

    return (
        <div className="card-packs-container">
            <h2>Your Card Packs</h2>
            <ul>
                {cardPacks.map((pack) => (
                    <li key={pack.id} onClick={() => navigate(`/cards/${pack.id}`)}>
                        {pack.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardPacks;
