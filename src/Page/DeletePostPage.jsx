import PropTypes from "prop-types";
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostComponent from '../Component/PostComponent';

const DeletePostPage = ({ posts, setPosts }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === postId);

    const handleDelete = async (confirm) => {
        if (confirm) {
            try {
                const response = await fetch(`https://api.likelion-crossover-team2.com/boards/{board-id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
                    navigate('/main');
                } else {
                    console.error('Failed to delete the post');
                }
            } catch (error) {
                console.error('Error deleting the post:', error);
            }
        }
    };

    if (!post) {
        return (
            <div style={styles.container}>
                <p>게시물이 삭제되었습니다.</p>
                <button
                    type="button"
                    style={styles.backButton}
                    onClick={() => navigate('/main')}
                >
                    뒤로가기
                </button>
            </div>
        );
    }

    return (
        <PostComponent
            title={post.title}
            content={post.body}
            handleSubmit={() => { }}
            handleDelete={handleDelete}
            isReadOnly={true}
        />
    );
};

DeletePostPage.propTypes = {
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired
};

export default DeletePostPage;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        backgroundColor: '#888888',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};
