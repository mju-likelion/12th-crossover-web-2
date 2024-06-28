import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from '../Api/Axios';
import BlueProfile from '../Img/profile.svg';

const MainPage = ({ posts, setPosts }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = Cookies.get('userToken');
        if (!userToken) {
            navigate('/');
        }
    }, [navigate]);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const userToken = Cookies.get('userToken');
            const response = await Axios.get(`/boards?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const { data } = response.data;

            const newPosts = data.boardList.map((board, index) => ({
                id: `fetched-${(page - 1) * 10 + index + 1}`,
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
        <Container>
            <PostButton onClick={() => navigate('/post')}>작성하기</PostButton>
            {posts.map((post, index) => (
                <PostWrapper key={index} onClick={() => handlePostClick(post.id)}>
                    <Box>
                        <ProfileBox>
                            <TextBox>
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
                </PostWrapper>
            ))}
            {loading && <Loading>Loading...</Loading>}
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
    background: #2186FC;
    border-radius: 25px;
    margin-bottom: 40px;
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
    padding: 10px 10px 10px 10px;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 10px 10px 10px;
`;

const Title = styled.p`
    color: #000;
    font-weight: bold;
    margin: 0 0 10px 10px;
    font-size: 30px;
`;

const Contents = styled.p`
    color: #666666;
    margin: 0;
    font-size: 20px;
`;

const ContentBox = styled.div`
    padding: 0px 10px 0px 10px;
    margin-top: 0px;
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

const Loading = styled.div`
    color: #2186FC;
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
`;

export default MainPage;
