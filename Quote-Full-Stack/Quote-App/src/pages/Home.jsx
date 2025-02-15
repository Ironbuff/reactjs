import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import QuoteModal from '../components/QuoteModal'
import axios from 'axios'
import QuoteCard from '../components/QuoteCard'
import {toast} from 'react-toastify'
const Home = () => {
  const [isModalOpen, setModalOpen]=useState(false)
  const [quotes,setQuotes]= useState([])
  const [currentQuote,setCurrentQuote]= useState(null)
  const [query, setQuery]= useState('')
  const[filteredQuotes, setFilteredQuotes]= useState([])
  
  const closeModal =()=>{
    setModalOpen(false)
  }


  useEffect(()=>{
   fetchQuotes()
  },[])

  useEffect(()=>{
    setFilteredQuotes(
      quotes.filter((quote)=> 
        quote.title.toLowerCase().includes(query.toLowerCase())||
        quote.description.toLowerCase().includes(query.toLowerCase())
    )
      
    )
  },[query,quotes])
  
  
  const fetchQuotes = async() =>{
    try {
      const{data} = await axios.get("http://localhost:5000/api/quote",
       { headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      )
      setQuotes(data.quotes)
    }
    catch(error){

    }
  }
   
  const onEdit = (quote)=>{
    setCurrentQuote(quote)
    setModalOpen(true)
  }

  const deleteQuote = async (id) =>{
 // help to prevent page reload before submitting
 try{
  // for posting the response to the server we use axios with url 
  const response= await axios.delete(`http://localhost:5000/api/quote/${id}`,
  {
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  if(response.data.sucess){
    toast.success("quote deleted")
    fetchQuotes()
    closeModal()
    }
}
catch(error){
  //   to display error
  console.log(error)
}
  }


  const addQuote = async(title,description)=>{
    // help to prevent page reload before submitting
    try{
      // for posting the response to the server we use axios with url 
      const response= await axios.post('http://localhost:5000/api/quote/add',{title,description},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(response.data.sucess){
        fetchQuotes()
        closeModal()
        }
  }
  catch(error){
      //   to display error
      console.log(error)
  }
  }

  const editQuote = async(id, title, description) =>{
  // help to prevent page reload before submitting
  try{
    // for posting the response to the server we use axios with url 
    const response= await axios.put(`http://localhost:5000/api/quote/${id}`,{id, title, description},{
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    if(response.data.sucess){
      fetchQuotes()
      closeModal()
      }
}
catch(error){
    //   to display error
    console.log(error)
}
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery}/>
      <div className='grid grid-cols-1 md:grid-cols-3 px-8 pt-4 gap-5'>
        { filteredQuotes.length >0 ? filteredQuotes.map(quote=>(
         <QuoteCard 
         quote={quote} 
         onEdit={onEdit}
         deleteQuote={deleteQuote}
         />
        ))
      :<p>No Quotes</p>
      }
      </div>
      <button
      onClick={()=>setModalOpen(true)}
       className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
          +
      </button>
      {isModalOpen && <QuoteModal closeModal={closeModal} addQuote={addQuote} currentQuote={currentQuote} editQuote={editQuote}/>}
    </div>
  )
}

export default Home