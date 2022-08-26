import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import classes from "./CodeBlock.module.css";

const CodeBlock = (props) => {
  return (
    <div className={classes.codeBlock}>
      <CopyBlock
        text={props.givenCode}
        language="cpp"
        showLineNumbers={true}
        theme={dracula}
        codeBlock
        wrapLines
      />
    </div>
  );
};

export default CodeBlock;
