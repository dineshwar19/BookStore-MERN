import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./Pages/CreateBook";
import Home from "./Pages/Home";
import DisplayBook from "./Pages/DisplayBook";
import DeleteBook from "./Pages/DeleteBook";
import UpdateBook from "./Pages/UpdateBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<DisplayBook />} />
      <Route path="/books/edit/:id" element={<UpdateBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
