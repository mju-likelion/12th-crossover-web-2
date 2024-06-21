import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostPage = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: `new-${Date.now()}`,
      title,
      body: content,
      time: new Date().toLocaleTimeString(),
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    navigate("/main");
  };

  const isButtonDisabled = title === "" || content === "";

  return (
    <div style={styles.container}>
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
            <span style={styles.contentCharCount}>
              ( {content.length} / 140 )
            </span>
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
            type="button"
            style={styles.backButton}
            onClick={() => navigate("/main")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.backButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.backButton.backgroundColor)
            }
          >
            뒤로가기
          </button>
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
    </div>
  );
};

export default PostPage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "700px",
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
    height: "500px",
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
  backButton: {
    width: "150px",
    backgroundColor: "#888888",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "16px",
  },
  backButtonHover: {
    backgroundColor: "#666666",
  },
  buttonDisabled: {
    backgroundColor: "var(--colorBlue1)",
  },
};
