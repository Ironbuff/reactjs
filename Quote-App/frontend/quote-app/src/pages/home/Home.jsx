import axios from "axios";
import React, { useEffect, useState } from "react";
import Quotepage from "../quotepage/Quotepage";
import { useLocation } from "react-router-dom";

const Home = () => {
    const [quotes, setQuotes] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios
            .get("http://localhost:2000/api/quotes/getquote",{withCredentials:true}) // Corrected URL
            .then((response) => setQuotes(response.data)) // Corrected data extraction
            .catch((error) => console.error("Error fetching posts:", error)); // Added error handling
    }, [location.search]); // Added empty dependency array

    return (
        <>
            {quotes.length > 0 &&
                quotes.map((quote) => <Quotepage key={quote._id} {...quote} />)}
        </>
    );
};

export default Home;