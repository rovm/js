import React from 'react';
import HeaderContainer from '../components/common/HeaderContainer';
import PostListContainer from '../components/posts/PostListContainer';
import PaginationContainer from '../components/posts/PaginationContainer';

const PostListPage = () => {
    return (
        <>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </>
    );
};

export default PostListPage;