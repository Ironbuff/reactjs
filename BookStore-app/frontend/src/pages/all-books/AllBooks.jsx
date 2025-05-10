import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/Loader';
import Bookcard from '../../components/bookcard/Bookcard';
import axios from 'axios';

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const fetchFilteredBooks = async (languages = []) => {
    try {
      let url = 'http://localhost:3000/api/books/getfilteredbooks';

      if (languages.length > 0) {
        url += `?language=${languages.join(',')}`;
      }

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching filtered books:", error);
    }
  };

  useEffect(() => {
    fetchFilteredBooks();
  }, []);

  const handleCheckboxChange = (language) => {
    let updated = [...selectedLanguages];

    if (updated.includes(language)) {
      updated = updated.filter((l) => l !== language);
    } else {
      updated.push(language);
    }

    setSelectedLanguages(updated);
    fetchFilteredBooks(updated);
  };

  return (
    <div className='bg-neutral-800 px-20 min-h-screen'>
      <h1 className='text-3xl text-neutral-200 font-semibold py-5'>All Books</h1>

      <div className='flex gap-4 pb-5'>
        {["english", "spanish"].map((lang) => (
          <label className='text-neutral-300' key={lang}>
            <input
              type='checkbox'
              value={lang}
              checked={selectedLanguages.includes(lang)}
              onChange={() => handleCheckboxChange(lang)}
              className='mr-2'
            />
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </label>
        ))}
      </div>

      {!data.length && <div className='flex items-center justify-center py-3'><Loader /></div>}

      <div className='py-4 gap-3 grid grid-cols-4'>
        {data.map((item, i) => (
          <div key={i}>
            <Bookcard datas={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
