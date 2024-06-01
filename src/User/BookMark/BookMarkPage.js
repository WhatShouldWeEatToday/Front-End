import "./css/BookMarkPage.css";
import React from "react";
import Header from "../../etc/components/Header";
import BookMark from "./components/BookMark";

function BookMarkPage() {
  return (
    <div className="BookMarkPage">
      <Header />
      <BookMark />
    </div>
  );
}

export default BookMarkPage;
