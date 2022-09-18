import React, { useState } from "react";
import api from "../../api/api";
import CodeEditor from "@uiw/react-textarea-code-editor";
const Form = () => {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("c");
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
    } else if (name === "dropDown") {
      setLang(value);
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
        <select value={lang} name="dropDown" onChange={changeHandler}>
          <option value="c">c</option>
          <option value="cpp">c++</option>
          <option value="js">javascript</option>
          <option value="ts">typeScript</option>
          <option value="java">java</option>
          <option value="kt">kotlin</option>
          <option value="html">html</option>
          <option value="css">css</option>
          <option value="dart">dart</option>
          <option value="py">python</option>
        </select>
        <div>
          <CodeEditor
            name="code"
            value={code}
            language={lang}
            placeholder={`Please enter ${lang} code`}
            onChange={changeHandler}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
            }}
          />
        </div>
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
