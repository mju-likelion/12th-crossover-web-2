import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostComponent from '../Component/PostComponent';

const DeletePostPage = ({ posts, setPosts }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === postId);

    const handleDelete = (confirm) => {
        if (confirm) {
            setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
        }
        navigate('/main');
    };

    if (!post) {
        return (
            <div style={styles.container}>
                <p>게시물을 찾을 수 없습니다.</p>
                <button
                    type="button"
                    style={styles.backButton}
                    onClick={() => navigate('/main')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.backButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.backButton.backgroundColor}
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
    backButtonHover: {
        backgroundColor: '#666666',
    },
};