import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {

    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [language, setLanguage] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const[discount,setDiscount]= useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem('token')}`, // Fixed template literal syntax
        bookid: id
    }

    // Fetch book info from API when component mounts
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/books/getbookbyid/${id}`);
                setAuthor(response.data.author);
                setDescription(response.data.description);
                setLanguage(response.data.language);
                setPrice(response.data.price);
                setTitle(response.data.title);
                setUrl(response.data.url);
                setDiscount(response.data.discount);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetch();
    }, []);

    const data = {
        url,
        title,
        author,
        language,
        price,
        description,
        discount
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.put(
                'http://localhost:3000/api/books/updatebook',
                data,
                { headers: headers }
            );
            alert(response.data.message)
            // Handle success (e.g., clear form, show message)
            navigate(`/view-book-detail/${id}`)
        } catch (error) {
            console.error('Error adding book:', error);
            // Handle error (e.g., show error message to the user)
        }
    };


    return (
        <div>
            <div className="h-[screen] py-5 text-neutral-300  bg-neutral-800 flex flex-col items-center justify-center">
                <div className="max-w-3xl ">
                    <h1 className="text-2xl font-semibold  text-center ">
                        Update Book
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-3 bg-gray-900 p-5 h-auto rounded-3xl">
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 py-3">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter URL of image"
                                className=" block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 py-1">
                                Title of Book
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title of book"
                                className=" block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-300 py-1">
                                Author of Book
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Enter author of book"
                                className=" block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-300 py-1">
                                    Language
                                </label>
                                <input
                                    type="text"
                                    id="language"
                                    name="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    placeholder="Language of book"
                                    className="block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-300 py-1">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price of book"
                                    className=" block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-300 py-1">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    placeholder="Discount of  book"
                                    className=" block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 py-1">
                                Description of Book
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description of book"
                                className=" block w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-center w-full py-2  bg-blue-500 rounded-3xl hover:bg-blue-600 hover:translate-0.5 hover:shadow-md transition-all ease-in-out duration-300"
                        >
                            Updatebook
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update