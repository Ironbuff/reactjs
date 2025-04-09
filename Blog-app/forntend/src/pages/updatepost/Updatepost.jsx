import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

const Updatepost = () => {
    // State variables to manage form inputs and redirection
    const [title, setTitle] = useState(''); // State for the post title
    const [summary, setSummary] = useState(''); // State for the post summary
    const [content, setContent] = useState(''); // State for the post content (rich text)
    const [file, setFile] = useState(null); // State for the uploaded file (image)
    const [redirect, setRedirect] = useState(false); // State to control redirection after successful post creation
    const{id}=useParams()

    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/users/post/${id}`)
        .then((response)=>{
            setTitle(response.data.title) //set value of title,summary and content
            setSummary(response.data.summary)
            setContent(response.data.content)
        })
    },[])
    
    // Function to handle form submission
    const UpdatePost = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Create a FormData object to send form data, including files
        const formdata = new FormData();
        formdata.set('title', title); // Add title to FormData
        formdata.set('summary', summary); // Add summary to FormData
        formdata.set('content', content); // Add content to FormData 
        formdata.set('id',id)
        //check file
        if (file) {
            formdata.set('file', file);
          }

        try {
            // Send a Put request to the server with the FormData
            const response = await axios.put('http://localhost:8000/api/users/updatepost', formdata, {
                withCredentials: true, // Include cookies in the request
            });

            console.log('Success:', response.data); // Log the response data
            if (response.status === 200) {
                setRedirect(true); // Set redirect state to true on successful post creation
            }
        } catch (error) {
            console.error('Error creating post:', error); // Log any errors
            // Handle error as needed (e.g., show error message to the user)
        }
    };

    return (
        <>
            {/* Conditionally render Navigate component if redirect is true it navigate to postpage if redirect is true */}
            {redirect && <Navigate to={'/post/'+id} />}

            {/* Form for creating a new post */}
            <form onSubmit={UpdatePost} className="max-w-3xl mx-auto mt-8 px-4">
                {/* Title input field */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-3 border border-gray-300 rounded"
                />

                {/* Summary input field */}
                <input
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full p-2 mb-3 border border-gray-300 rounded"
                />

                {/* File upload input field */}
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full p-2 mb-3 border border-gray-300 rounded"
                />

                {/* React Quill rich text editor */}
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    className="mb-4"
                    theme="snow"
                />

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded"
                >
                    Update post
                </button>
            </form>
        </>
    );
};

export default Updatepost;