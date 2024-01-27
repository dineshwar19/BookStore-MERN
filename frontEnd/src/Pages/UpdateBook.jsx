import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState(null);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        if (response.status !== 200) throw new Error();
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishedYear(response.data.publishedYear);
      } catch (err) {
        console.log(err.message);
      }
    };
    getBook();
  }, []);
  async function updateBook(e) {
    e.preventDefault();
    if (!title || !author || !publishedYear) return;

    try {
      const response = await axios.put(`http://localhost:8000/books/${id}`, {
        title,
        author,
        publishedYear,
      });

      if (response.status !== 200) {
        throw new Error();
      }

      setMessage(response.data);
      setTitle("");
      setAuthor("");
      setPublishedYear("");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fuchsia-400">
      <h1 className="uppercase text-2xl font-bold ">Update book</h1>
      <form
        className="flex flex-col gap-5 bg-fuchsia-600 p-4 text-white rounded-lg shadow-2xl"
        onSubmit={(e) => updateBook(e)}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border-b border-black p-2 text-xl outline-none bg-inherit placeholder:text-white font-semibold placeholder:font-light"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="border-b border-black p-2 text-xl outline-none bg-inherit placeholder:text-white font-semibold placeholder:font-light"
        />
        <input
          type="text"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          placeholder="Published Year"
          className="border-b border-black p-2 text-xl outline-none bg-inherit placeholder:text-white font-semibold placeholder:font-light"
        />
        <input
          type="submit"
          value="Submit"
          className="bg-green-600 w-fit self-center p-1 rounded-md cursor-pointer"
        />
      </form>
      <div className="text-white m-4">
        {message && <div>{message.message}</div>}
      </div>
    </div>
  );
};
export default UpdateBook;
