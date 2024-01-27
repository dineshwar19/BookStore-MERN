import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/books");
        if (response.status !== 200) {
          throw new Error("Data is not Found");
        }
        setBooks(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };
    fetchData();
  }, []);
  console.log(books);

  return (
    <div className="p-4 flex flex-col justify-center min-h-screen gap-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-fuchsia-700">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : books.length > 0 ? (
        <div className="">
          <table className="w-full border-separate border-spacing-2">
            <thead className="">
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Author
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Published Year
                </th>
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td className="border border-slate-700 rounded-md text-center font-semibold ">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center font-semibold">
                    {book.title}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden font-semibold">
                    {book.author}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden font-semibold">
                    {book.publishedYear}
                  </td>
                  <td className="flex gap-5 border border-slate-700 rounded-md justify-center py-2">
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit
                        size={20}
                        className="text-blue-700 cursor-pointer"
                      />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete
                        size={20}
                        className="text-red-600 cursor-pointer"
                      />
                    </Link>
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle
                        size={20}
                        className="text-green-600 cursor-pointer"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default Home;
