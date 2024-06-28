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
            const response = await Axios.get(`/boards?page=${page}`);
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
`;

const ProfileBox = styled.div`
    width: 699px;
    height: 239px;
    display: flex;
    justify-content: right;
`;

const TextBox = styled.div`
    width: 699px;
    height: 239px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const ProfileImg = styled.img`
    width: 62px;
    height: 62px;
`;

const Right = styled.div`
    display: flex;
    align-items: end;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.p`
    width: 598px;
    height: 24px;
    font-weight: 600;
    font-size: 24px;
    display: flex;
    justify-content: flex-start;
`;

const ContentBox = styled.p`
    margin-top: 13px;
    width: 598px;
    height: 198px;
    border-radius: 25px;
    border: 2px solid #1E90FF;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Contents = styled.p`
    width: 550px;
    height: 162px;
    margin: 20px;
    display: flex;
    justify-content: flex-start;
`;

const Loading = styled.p`
    font-size: 18px;
    color: gray;
`;

export default MainPage;
