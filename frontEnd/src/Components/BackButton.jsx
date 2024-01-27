import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BackButton = ({ designation = "/" }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-black w-fit text-white p-1 px-2 rounded-lg">
      {/* <button className="cursor-pointer" onClick={() => navigate("/")}>
        <BsArrowLeft size={25} />
      </button> */}

      <Link to={designation}>
        <BsArrowLeft size={25} />
      </Link>
    </div>
  );
};

export default BackButton;
