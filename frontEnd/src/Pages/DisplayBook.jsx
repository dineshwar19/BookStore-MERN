import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../Components/BackButton";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
const DisplayBook = () => {
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        if (response.status !== 200) throw new Error("Book is not Found");
        setBook(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchBook();
  });
  return (
    <div className="p-4">
      <BackButton />

      <div className="flex flex-col min-h-screen items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex justify-around w-full ">
            <div className="text-fuchsia-800">
              <h1 className="text-xl font-bold">id : </h1>
              <h1 className="text-xl font-bold">Book Title : </h1>
              <h1 className="text-xl font-bold">Author : </h1>
              <h1 className="text-xl font-bold">Published Year : </h1>
              <h1 className="text-xl font-bold">Created At : </h1>
              <h1 className="text-xl font-bold"> Updated At : </h1>
            </div>
            <div className="flex flex-col gap-1 p-1 font-semibold">
              <p>{book._id}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.publishedYear}</p>
              <p>{new Date(book.createdAt).toString()}</p>
              <p>{new Date(book.updatedAt).toString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayBook;
