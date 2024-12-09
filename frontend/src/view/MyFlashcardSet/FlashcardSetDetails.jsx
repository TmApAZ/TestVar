import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CardPackDetails = () => {
    const { id } = useParams(); // Get card pack ID from URL
    const [cardPackDetails, setCardPackDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCardPackDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found. Please log in again.");
                }

                const response = await axios.get(
                    `http://localhost:5000/api/flashcards/packs/${id}`, // Use the correct endpoint
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setCardPackDetails(response.data);
            } catch (err) {
                console.error("Error fetching card pack details:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Failed to fetch card pack details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCardPackDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="card-pack-details">
            <h2>Card Pack Details</h2>
            <h3>{cardPackDetails.pack.name}</h3>
            <p>
                <strong>Created By:</strong> {cardPackDetails.pack.user_name}
            </p>
            <p>
                <strong>Created At:</strong> {new Date(cardPackDetails.pack.created_at).toLocaleDateString()}
            </p>
            <h3>Cards</h3>
            <div className="card-list">
                {cardPackDetails.cards.map((pack) => (
                    <div className="card" key={pack.id}>
                        <h2>Card Pack Details</h2>
            <h3>{pack.name}</h3>
            <p>
                <strong>Created By:</strong> {pack.user_name}
            </p>
            <p>
                <strong>Created At:</strong> {pack.created_at}
            </p>
                        <p>
                            <strong>Question:</strong> {pack.question}
                        </p>
                        <p>
                            <strong>Answer:</strong> {pack.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardPackDetails;
