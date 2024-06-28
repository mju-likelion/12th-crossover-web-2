import PropTypes from "prop-types";
import React, { useState } from "react";

const PostForm = ({ setPosts, navigate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: `new-${Date.now()}`,
      title: `제목 : ${title}`,
      body: content,
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    navigate("/main");
  };

  const isButtonDisabled = title === "" || content === "";

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          제목 :{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            maxLength="20"
            required
          />
          <span style={styles.titleCharCount}>( {title.length} / 20 )</span>
        </label>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          <span style={styles.contentCharCount}>( {content.length} / 140 )</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
          maxLength="140"
          required
        />
      </div>
      <div style={styles.buttonGroup}>
        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: isButtonDisabled
              ? styles.buttonDisabled.backgroundColor
              : styles.buttonHover.backgroundColor,
          }}
          disabled={isButtonDisabled}
        >
          작성하기
        </button>
      </div>
    </form>
  );
};

PostForm.propTypes = {
  setPosts: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "794px",
    padding: "20px",
    borderRadius: "10px",
  },
  formGroup: {
    marginBottom: "25px",
    position: "relative",
    flexDirection: "row",
    borderRadius: "15px",
    border: "2px solid var(--colorGray)",
    padding: "20px",
    alignItems: "center",
  },
  label: {
    display: "flex",
    margin: "0 6px",
    fontWeight: "bold",
    fontSize: "20px",
    alignItems: "center",
  },
  input: {
    margin: "0 10px",
    width: "80%",
    padding: "5px 0",
    fontSize: "20px",
    border: "none",
    borderRadius: "10px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    fontSize: "16px",
    borderRadius: "15px",
    resize: "none",
    height: "550px",
    boxSizing: "border-box",
    border: "none",
    outline: "none",
  },
  titleCharCount: {
    position: "absolute",
    right: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "12px",
    color: "#999",
  },
  contentCharCount: {
    position: "absolute",
    right: "30px",
    bottom: "30px",
    fontSize: "12px",
    color: "#999",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "150px",
    height: "50px",
    backgroundColor: "#99CEFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonHover: {
    backgroundColor: "var(--colorBlue2)",
  },
  buttonDisabled: {
    backgroundColor: "var(--colorBlue1)",
  },
};

export default PostForm;
