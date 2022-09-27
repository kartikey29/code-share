import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./ProblemPage.module.css";
import CodeBlock from "../CodeBlock";
import CodeEditor from "@uiw/react-textarea-code-editor";

import api from "../../api/api";
const ProblemPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [commentDesc, setCommentDesc] = useState("");
  const [code, setCode] = useState("");
  const [comments, setComments] = useState([]);
  const [lang, setLang] = useState("cpp");
  let { id } = useParams();

  const getData = async () => {
    const queryData = await api.get(`/${id}`);
    console.log(queryData);
    if (queryData.status === 200) {
      setData(queryData.data);
    }
    const commentData = await api.get(`/${id}/comments`);
    setComments(commentData.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const mapComments = (comment) => {
    return (
      <div className={classes.comment} key={comment.id}>
        <div className={classes.userDesc}>
          <h4>Description :</h4>
          {comment.commentDesc}
        </div>
        <div className={classes.userDesc}>
          <h4>Code :</h4>
        </div>
        <div>
          <CodeBlock givenCode={comment.commentCode} lang="cpp"></CodeBlock>
        </div>
      </div>
    );
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(code);
    const body = {
      commentId: 76567,
      postId: id,
      commentDesc,
      commentCode: code,
      lang,
    };
    const response = await api.post(`/${id}/addcomment`, body);
    setComments((prevVal) => {
      return [...prevVal, response.data];
    });
    console.log(response);
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "commentDesc") {
      setCommentDesc(value);
    } else if (name === "code") {
      setCode(value);
    } else if (name === "dropDown") {
      setLang(value);
    }
  };

  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <div className={classes.userDesc}>
        <Link to="/">
          <button className={classes.homeBtn}> Return To Home</button>
        </Link>

        <h4>User descriptions :</h4>
        {data.userDesc}
      </div>
      <div className={classes.userDesc}>
        <h4>Problem link :</h4>
        <a href={data.problemLink}>{data.problemLink}</a>
      </div>
      <h4 className={classes.userDesc}>User code :</h4>
      <CodeBlock givenCode={data.givenCode}></CodeBlock>

      <div>
        <form onSubmit={commentSubmitHandler}>
          <input
            name="commentDesc"
            placeholder="enter comment"
            onChange={changeHandler}
            value={commentDesc}
            required="required"
          ></input>
          {/* <textarea
            name="code"
            placeholder="enter code"
            className={classes.textarea}
            onChange={changeHandler}
            value={code}
            required="required"
          ></textarea> */}
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
              required="required"
              padding={15}
              style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
              }}
            />
          </div>
          <button className={classes.submitBtn}>submit</button>
        </form>
      </div>
      <h2>Comments :-</h2>
      {comments.map(mapComments)}
    </>
  );
};

export default ProblemPage;
