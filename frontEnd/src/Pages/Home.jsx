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

  return (
    <div className="p-4">
      <h1>Book List</h1>
      {isLoading ? (
        <Spinner />
      ) : books.length > 0 ? (
        <ul>
          {books.map((book , index) => (
            <li>
              
            </li>
          ))}
        </ul>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default Home;
