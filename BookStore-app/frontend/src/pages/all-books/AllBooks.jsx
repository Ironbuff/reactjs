import React, { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import Bookcard from "../../components/bookcard/Bookcard";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { X } from "lucide-react";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState("");

  // 1. We wait 500ms for the user to stop typing
  const [debouncedSearch] = useDebounce(searchAuthor, 500);

  // 2. This function now uses the *current* state values directly,
  //    or we pass them in from the useEffect.
  const fetchFilteredBooks = async (langs, auth) => {
    try {
      let url = "http://localhost:3000/api/books/getfilteredbooks";
      const params = [];

      // Logic to build query params
      if (langs.length > 0) {
        params.push(`language=${langs.join(",")}`);
      }

      if (auth) {
        params.push(`author=${auth}`);
      }

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching filtered books:", error);
    }
  };

  useEffect(() => {
    fetchFilteredBooks(selectedLanguages, debouncedSearch);
  }, [selectedLanguages, debouncedSearch]);

  const handleCheckboxChange = (language) => {
    let updated = [...selectedLanguages];

    if (updated.includes(language)) {
      updated = updated.filter((l) => l !== language);
    } else {
      updated.push(language);
    }

    setSelectedLanguages(updated);
    // Removed the fetch call here. The useEffect above detects the state change and handles it.
  };

  return (
    <div className="bg-neutral-800 px-20 min-h-screen">
      <h1 className="text-3xl text-neutral-200 font-semibold py-5">
        All Books
      </h1>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by author..."
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          className="w-full border-none focus:ring-0 ouline-none shadow-sm bg-gray-700 rounded-md p-2"
        />
        {searchAuthor && (
          <button
            aria-label="Clear search"
            onClick={() => setSearchAuthor("")}
            className="
      absolute right-2 top-1/2 -translate-y-1/2
      p-1.5 rounded-full
      hover:bg-neutral-600
      transition-all duration-200 ease-in-out
      hover:scale-110
      focus:outline-none
    "
          >
            <X className="size-4 text-red-500" />
          </button>
        )}
      </div>

      <div className="flex gap-4 py-5">
        {["english", "spanish"].map((lang) => (
          <label className="text-neutral-300 flex items-center" key={lang}>
            <input
              type="checkbox"
              value={lang}
              checked={selectedLanguages.includes(lang)}
              onChange={() => handleCheckboxChange(lang)}
              className="mr-2"
            />
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </label>
        ))}
      </div>

      {!data.length && (
        <div className="flex items-center justify-center py-3">
          <Loader />
        </div>
      )}

      <div className="py-4 gap-3 grid grid-cols-4">
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
