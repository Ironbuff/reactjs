import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Clothcard from '../../components/clothcard/Clothcard';

const Shop = () => {
  const [datas, setDatas] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isWinterChecked, setIsWinterChecked] = useState(false);
  const[isSummerChecked,setIsSummerChecked] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:8081/api/user/clothes/getcloth');
      setDatas(response.data);
    };
    fetch();
  }, []);

  const handleFilter = (e) => {
    const checked = e.target.checked;
    

    if (checked) {
      const winterClothes = datas.filter(item => item.category === "winter clothes");
      setSelectedData(winterClothes);
    } else {
      setSelectedData(null);
    }
  };

  return (
    <div className='px-28 bg-gray-200'>
      <div className='flex  gap-x-3'>
        <label htmlFor='winterClothes'>
          Winter clothes
        </label>
        <input
          id='winterClothes'
          type='checkbox'
          className='rounded-xl bg-transparent'
          checked={isWinterChecked}
          onChange={handleFilter}
        />
      </div>
      <div className='flex  gap-x-3'>
        <label htmlFor='winterClothes'>
          Winter clothes
        </label>
        <input
          id='winterClothes'
          type='checkbox'
          className='rounded-xl bg-transparent'
          checked={isSummerChecked}
          onChange={handleFilter}
        />
      </div>


      <Clothcard item={selectedData ? selectedData : datas} />
    </div>
  );
};

export default Shop;
