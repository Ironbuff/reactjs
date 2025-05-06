import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Bookcard = ({ datas, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed template literal syntax
    bookid: datas._id,
  };

  const handleremove = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/books/favourite/delete-favourite-books",
      {},
      { headers }
    );
    alert(response.data.message);
    // reload the page
    window.location.reload();
  };

  return (
    <div className="bg-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-5">
      <Link
        to={`/view-book-detail/${datas._id}`}
        className="transition-transform duration-300 hover:scale-105"
      >
        <div className="bg-zinc-700/30 p-4 rounded-lg mb-4">
          <img
            src={datas.url}
            alt={datas.title}
            className="h-[25vh] object-contain rounded-md"
          />
        </div>

        <h1 className="text-neutral-100 text-base font-bold text-center mb-1">
          {datas.title}
        </h1>

        <p className="text-neutral-400 text-sm mb-1 italic text-center">
          by {datas.author}
        </p>

        <h2 className="text-green-400 text-md font-semibold flex items-center justify-center py-3">
          <p>
            Price:{" "}
            <span
              style={{
                textDecoration: datas.discount > 0 ? "line-through" : "none",
              }}
            >
              ${datas.price}
            </span>
            {datas.discount > 0 && (
              <span style={{ color: "green", marginLeft: "10px" }}>
                ${datas.discountedPrice}
              </span>
            )}
          </p>
        </h2>
      </Link>
      {favourite === true && (
        <button
          className="text-base flex flex-row font-semibold bg-amber-300/20 px-3 py-2 rounded-2xl shadow-md text-neutral-200 hover:bg-amber-300/80 translate-2.5 transition-all ease-in-out duration-300"
          onClick={handleremove}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default Bookcard;
