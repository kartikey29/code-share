import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <div style={{ border: "1px black solid" }} key={comment.id}>
        <div>description {comment.commentDesc}</div>
        <div>code {comment.commentCode}</div>
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
      <div>
        problem Link : {data.problemLink} , givenCode :{data.givenCode} ,
        userDesc : {data.userDesc}
      </div>
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
            rows="10"
            cols="50"
            placeholder="enter code"
            onChange={changeHandler}
            value={code}
          ></textarea>
          <button>submit</button>
        </form>
      </div>
      {comments.map(mapComments)}
    </>
  );
};

export default ProblemPage;
