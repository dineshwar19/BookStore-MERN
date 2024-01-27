import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState(null);
  const [newBook, setNewBook] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const postNewBook = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/books",
          newBook
        );
        if (response.status !== 200) throw new Error();
        setMessage(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    postNewBook();
  }, [newBook]);

  function createNewBook(e) {
    e.preventDefault();
    if (!title || !author || !publishedYear) return;
    setNewBook({ title, author, publishedYear });
    setTitle("");
    setAuthor("");
    setPublishedYear("");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fuchsia-400">
      <form
        className="flex flex-col gap-5 bg-fuchsia-600 p-4 text-white rounded-lg shadow-2xl"
        onSubmit={(e) => createNewBook(e)}
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

export default CreateBook;
