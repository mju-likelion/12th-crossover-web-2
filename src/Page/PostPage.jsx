import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../Component/PostForm";

const PostPage = ({ setPosts }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/main");
  };

  return (
    <div style={styles.container}>
      <PostForm setPosts={setPosts} navigate={navigate} />
      <button
        type="button"
        style={styles.backButton}
        onClick={handleBack}
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
    </div>
  );
};
PostPage.propTypes = {
  setPosts: PropTypes.func.isRequired,
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
  backButton: {
    width: "150px",
    backgroundColor: "#888888",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
  backButtonHover: {
    backgroundColor: "#666666",
  },
};

