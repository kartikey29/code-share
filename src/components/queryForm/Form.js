import React, { useState } from "react";
import api from "../../api/api";
const Form = () => {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const [pageLink, setPageLink] = useState();
  const [showLink, setShowLink] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "link") {
      setLink(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "code") {
      setCode(value);
    }
  };

  const submissionHandler = async (e) => {
    e.preventDefault();
    const body = {
      id: 837458345,
      problemLink: link,
      userDesc: description,
      givenCode: code,
    };
    console.log("asjnnsak");
    const response = await api.post("/create", body);
    if (response.status === 200) {
      setPageLink(`${process.env.REACT_APP_FRONTEND_URL}/${response.data}`);
      setShowLink(true);
    }
  };

  return (
    <>
      <form onSubmit={submissionHandler}>
        <input
          type="text"
          name="link"
          placeholder="Problem statement link"
          onChange={changeHandler}
        ></input>
        <textarea
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={changeHandler}
        ></textarea>
        <textarea
          placeholder="enter your code"
          name="code"
          onChange={changeHandler}
          value={code}
        ></textarea>
        <button type="Submit">Submit</button>
      </form>
      {showLink && (
        <div>
          <h1>
            Your shareable link is :- <a href={pageLink}>{pageLink}</a>
          </h1>
        </div>
      )}
    </>
  );
};

export default Form;
