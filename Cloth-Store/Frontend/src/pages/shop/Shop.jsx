import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Clothcard from '../../components/clothcard/Clothcard';

const Shop = () => {
  const [datas, setDatas] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [isWinterChecked, setIsWinterChecked] = useState(false);
  const [isSummerChecked, setIsSummerChecked] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/user/clothes/getcloth');
        setDatas(response.data);
        setSelectedData(response.data);
      } catch (error) {
        console.error('Error fetching clothes:', error);
      }
    };
    fetch();
  }, []);

  const handleFilter = (e) => {
    const { id, checked } = e.target;

    if (id === 'winterClothes') {
      setIsWinterChecked(checked);
    } else if (id === 'summerClothes') {
      setIsSummerChecked(checked);
    }

    let filteredData = datas;

    if (checked || isWinterChecked || isSummerChecked) {
      const filters = [];
      if (id === 'winterClothes' ? checked : isWinterChecked) {
        filters.push('winter clothes');
      }
      if (id === 'summerClothes' ? checked : isSummerChecked) {
        filters.push('summer clothes');
      }
      filteredData = datas.filter(item => filters.includes(item.category));
    }

    // If no filters are active, show all
    if (!isWinterChecked && !isSummerChecked && !checked) {
      setSelectedData(datas);
    } else {
      setSelectedData(filteredData);
    }
  };

  return (
    <div className='px-28 flex flex-col gap-x-4 items-center  bg-gray-200 min-h-screen'>
      <div className='flex gap-x-8 py-4'>
        <div className='flex items-center gap-x-2'>
          <label htmlFor='winterClothes'>Winter Clothes</label>
          <input
            id='winterClothes'
            type='checkbox'
            className='rounded'
            checked={isWinterChecked}
            onChange={handleFilter}
          />
        </div>
        <div className='flex items-center gap-x-2'>
          <label htmlFor='summerClothes'>Summer Clothes</label>
          <input
            id='summerClothes'
            type='checkbox'
            className='rounded'
            checked={isSummerChecked}
            onChange={handleFilter}
          />
        </div>
      </div>
      <Clothcard item={selectedData} />
    </div>
  );
};

export default Shop;
