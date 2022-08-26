import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./ProblemPage.module.css";
import CodeBlock from "../CodeBlock";

import api from "../../api/api";
const ProblemPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [commentDesc, setCommentDesc] = useState("");
  const [code, setCode] = useState("");
  const [comments, setComments] = useState([]);
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
          <CodeBlock givenCode={comment.commentCode}></CodeBlock>
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
    }
  };

  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <div className={classes.userDesc}>
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
          ></input>
          <textarea
            name="code"
            placeholder="enter code"
            className={classes.textarea}
            onChange={changeHandler}
            value={code}
          ></textarea>
          <button>submit</button>
        </form>
      </div>
      <h2>Comments :-</h2>
      {comments.map(mapComments)}
    </>
  );
};

export default ProblemPage;
