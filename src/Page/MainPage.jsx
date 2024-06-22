import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const MainPage = ({ posts, setPosts }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const fetchPosts = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const newPosts = Array.from({ length: 10 }, (_, index) => ({
                id: `fetched-${(page - 1) * 10 + index + 1}`,
                title: '제목 : text',
                body: 'text',
                time: new Date().toLocaleTimeString(),
            }));
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setLoading(false);
        }, 1000);
    }, [page, setPosts]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5 && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handlePostClick = (postId) => {
        navigate(`/delete/${postId}`);
    };

    return (
        <div style={styles.container}>
            <button style={styles.postButton} onClick={() => navigate('/post')}>작성하기</button>
            {posts.map((post, index) => (
                <div key={index} style={styles.post} onClick={() => handlePostClick(post.id)}>                    
                    <div style={styles.postContent}>
                        <div style={styles.postTitle}>
                            <strong>{post.title}</strong>
                        </div>
                        <div style={styles.postBody}>{post.body}</div>
                        <div style={styles.postTime}>{post.time}</div>
                    </div>
                </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

MainPage.propTypes = {
    posts: PropTypes.any.isRequired,
    setPosts: PropTypes.any.isRequired
};

export default MainPage;


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    },
    postButton: {
        alignSelf: 'flex-end',
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px',
    },
    post: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '500px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '20px',
        cursor: 'pointer',
    },
    postContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    postTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },

};
