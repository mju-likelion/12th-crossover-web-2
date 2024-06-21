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
            제목
            <span style={styles.charCount}>{title.length} / 20</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            maxLength="20"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            내용
            <span style={styles.charCount}>{content.length} / 140</span>
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
    width: "794px",
    padding: "20px",
    borderRadius: "10px",
  },
  formGroup: {
    marginBottom: "25px",
    position: "relative",
    borderRadius: "15px",
    border: "2px solid #717171",
    padding: "10px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "15px",
  },
  textarea: {
    width: "100%",
    fontSize: "16px",
    borderRadius: "15px",
    resize: "none",
    height: "550px",
    padding: "10px",
    boxSizing: "border-box",
    border: "none",
  },
  charCount: {
    position: "absolute",
    bottom: "5px",
    right: "10px",
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