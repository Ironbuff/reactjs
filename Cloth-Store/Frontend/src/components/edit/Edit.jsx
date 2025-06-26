import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate()
  const {id} = useParams()


  


  useEffect(()=>{
          const fetch = async()=>{
            const response = await axios.get(`http://localhost:8081/api/user/clothes/getclothbyid/${id}`,{
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`,
          'id': `${localStorage.getItem("id")}`,
          'role': `${localStorage.getItem("role")}`,
        },
      })
           if(response.status===200){
            
            setTitle(response.data.title)
            setPrice(response.data.price)
            setDescription(response.data.description)
            setCategory(response.data.category)
            setSeller(response.data.seller)
            setDiscount(response.data.discount)
            setQuantity(response.data.quantity)
           }
          }
          fetch()
  },[])

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("seller", seller);
    formdata.append("discount", discount);
    formdata.append("quantity", quantity);

    if (file) {
      formdata.append("file", file); // field name must match multer.single("img")
    }

    const response = await axios.put(
      `http://localhost:8081/api/user/clothes/updatecloth/${id}`,
      formdata,
      {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`,
          'id': `${localStorage.getItem("id")}`,
          'role': `${localStorage.getItem("role")}`,
          'Content-Type':'multipart/formdata'
          // DO NOT manually set Content-Type to multipart/form-data!
        },
      }
    );
   if(response.status===200){
    alert("Clothes Added Sucessfully")
    navigate('/shop')
   }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4 py-10'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-4 w-full max-w-3xl p-8 bg-white shadow-xl rounded-lg'
      >
        {/* Image Upload */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='img' className='text-lg font-semibold'>
            Image:
          </label>
          <input
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
            className='p-3 border rounded-lg'
          />
        </div>

        {/* Title */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='title' className='text-lg font-semibold'>
            Title:
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-2 border rounded-lg'
          />
        </div>

        {/* Price */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='price' className='text-lg font-semibold'>
            Price:
          </label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='p-2 border rounded-lg'
          />
        </div>

        {/* Description */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='description' className='text-lg font-semibold'>
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className='p-2 border rounded-lg resize-none'
          />
        </div>

        {/* Category */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='category' className='text-lg font-semibold'>
            Category:
          </label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='p-2 border rounded-lg'
          />
        </div>

        {/* Seller */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='seller' className='text-lg font-semibold'>
            Seller:
          </label>
          <input
            type='text'
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            className='p-2 border rounded-lg'
          />
        </div>

        {/* Discount */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='discount' className='text-lg font-semibold'>
            Discount:
          </label>
          <input
            type='number'
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className='p-2 border rounded-lg'
          />
        </div>

        {/* Quantity */}
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='quantity' className='text-lg font-semibold'>
            Quantity:
          </label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='p-2 border rounded-lg'
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='mt-4 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-semibold'
        >
          Update Cloth Detail
        </button>
      </form>
    </div>
  );
};

export default Edit;
