import axios from "axios";
import React, { useEffect, useState } from "react";
import Posts from "../posts/Posts";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/post") // Corrected URL
            .then((response) => setPosts(response.data)) // Corrected data extraction
            .catch((error) => console.error("Error fetching posts:", error)); // Added error handling
    }, []); // Added empty dependency array

    return (
        <>
            {posts.length > 0 &&
                posts.map((post) => <Posts key={post._id} {...post} />)}
        </>
    );
};

export default Home;