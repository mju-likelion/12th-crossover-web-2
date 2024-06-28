import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostComponent from '../Component/PostComponent';

const DeletePostPage = ({ posts, setPosts }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === postId);

    // const handleDelete = async (confirm) => {
    //     if (confirm && post) {
    //         try {
    //             const response = await Axios.delete(`/boards/${post.boardId}/posts/${postId}`);
    //             if (response.status === 200) {
    //                 // Remove the deleted post from the state
    //                 setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    //                 // Navigate back to the main page
    //                 navigate('/main');
    //             } else {
    //                 console.error('Failed to delete the post');
    //             }
    //         } catch (error) {
    //             console.error('Error deleting the post:', error);
    //         }
    //     } else {
    //         console.error('Post not found or confirmation not received');
    //     }
    // };
    const handleDelete = (confirm) => {
        if (confirm && post) {
            setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
            navigate('/main');
        } else {
            console.error('Post not found or confirmation not received');
        }
    };


    useEffect(() => {
        if (!post) {
            console.error(`Post with ID ${postId} not found.`);
            navigate('/main'); // If post not found, navigate to main page
        }
    }, [postId, post, navigate]);

    return (
        <PostComponent
            title={post?.title}
            content={post?.body}
            handleSubmit={() => {}} // No action for handleSubmit in delete page
            handleDelete={handleDelete} // Pass the updated handleDelete function
            isReadOnly={true}
        />
    );
};

DeletePostPage.propTypes = {
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired
};

export default DeletePostPage;
