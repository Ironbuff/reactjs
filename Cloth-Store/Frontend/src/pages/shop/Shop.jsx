import React, { useEffect, useState } from "react";
import axios from "axios";
import Clothcard from "../../components/clothcard/Clothcard";
import { useDebounce } from "use-debounce";
import { RxCrossCircled } from "react-icons/rx";

const Shop = () => {
  const [datas, setDatas] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = debouncedSearch
          ? `http://localhost:8081/api/user/clothes/getcloth?title=${encodeURIComponent(
              debouncedSearch
            )}`
          : `http://localhost:8081/api/user/clothes/getcloth`;
        const response = await axios.get(url);
        setDatas(response.data);
        setSelectedData(response.data);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    };
    fetch();
  }, [debouncedSearch]);

  return (
    <div className="px-28 flex flex-col gap-x-4 items-center w-full  bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Our Latest Product
      </h1>
      <div className="w-full relative ">
        <input
          type="text"
          value={searchTerm}
          className="w-full p-2 bg-gray-100 shadow-md mb-5 rounded-sm focus:ring-0 focus:outline-none"
          placeholder="Enter Cloth Title"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm.length > 1 && (
          <button
            className="absolute right-2 top-2"
            onClick={() => setSearchTerm("")}
          >
            <RxCrossCircled size={20} className=" text-red-400" />
          </button>
        )}
      </div>
      <Clothcard item={selectedData.length > 0 ? selectedData : datas} />
    </div>
  );
};

export default Shop;
