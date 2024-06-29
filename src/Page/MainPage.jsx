import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from '../Api/Axios';
import Modal from '../Component/ModalComponent';
import BlueProfile from '../Img/profile.svg';

const MainPage = ({ posts, setPosts }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
            navigate('/');
        }
    }, [navigate]);

    const fetchPosts = useCallback(async (currentPage) => {
        setLoading(true);
        try {
            const response = await Axios.get(`/boards?page=${currentPage}`);
            const { data } = response.data;

            const newPosts = data.boardList.map((board, index) => ({
                id: `fetched-${currentPage * 10 + index + 1}`,
                title: board.title,
                body: board.content,
                time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
            }));

            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    }, [setPosts]);

    useEffect(() => {
        fetchPosts(page);
    }, [fetchPosts, page]);

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

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <Container>
            <PostButton onClick={() => navigate('/post')}>작성하기</PostButton>
            {posts.map((post, index) => (
                <PostWrapper key={post.id || index}>
                    <Box>
                        <ProfileBox>
                            <TextBox onClick={() => handlePostClick(post.id)}>
                                <ProfileImg src={BlueProfile} alt="profileImg" />
                                <Right>
                                    <Title>{post.title}</Title>
                                    <ContentBox>
                                        <Contents>{post.body}</Contents>
                                    </ContentBox>
                                </Right>
                            </TextBox>
                        </ProfileBox>
                    </Box>
                    <Time>{post.time}</Time>
                    <MoreButton onClick={openModal}>더 보기</MoreButton>
                </PostWrapper>
            ))}
            <Modal showModal={showModal} closeModal={closeModal} />
        </Container>
    );
};

MainPage.propTypes = {
    posts: PropTypes.array.isRequired,
    setPosts: PropTypes.func.isRequired,
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const PostButton = styled.button`
    align-self: flex-end;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 233px;
    height: 70px;
    background: #2186fc;
    border-radius: 25px;
    margin-bottom: 40px;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 44px;
    text-align: center;
`;

const PostWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 783px;
    height: 343px;
    background-color: #fff;
    border-radius: 25px;
    padding: 20px;
    margin-bottom: 40px;
    cursor: pointer;
    border: 2px solid #717171;
`;

const Box = styled.div`
    width: 699px;
    height: 277px;
    position: relative;
`;

const Time = styled.p`
    color: #717171;
    position: absolute;
    bottom: 10px;
    right: 10px;
    margin: 0;
    font-size: 20px;
`;

const ProfileBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
`;

const Title = styled.p`
    color: #000;
    font-weight: bold;
    margin: 0 0 10px 10px;
    font-size: 30px;
`;

const Contents = styled.p`
    width: 550px;
    height: 162px;
    margin: 20px;
    display: flex;
    justify-content: flex-start;
`;

const ContentBox = styled.div`
    margin-top: 13px;
    width: 698px;
    height: 198px;
    border-radius: 25px;
    border: 2px solid #1e90ff;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

const MoreButton = styled.button`
    align-self: flex-end;
    color: #2186fc;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
`;

export default MainPage;
