import axios from "axios";

const flashcardAPI = axios.create({ baseURL: "http://localhost:5000/api/flashcards" });

export default flashcardAPI;
