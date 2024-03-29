import React, {useEffect} from "react";
import WriteActionButtons from "./WriteActionButtons";
import  {useSelector, useDispatch} from 'react-redux';
import { withRouter } from "react-router-dom";
import { writePost, updatePost } from "../../modules/write";

const WriteActionButtonsConTainer = ({history}) => {
    const dispatch = useDispatch();
    const {title, body, tags, post, postError, originalPostId} = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId,
    }));

    //포스트 등록
    const onPublish = () => {
        if(originalPostId){
            dispatch(updatePost({title, body, tags, id:originalPostId}));
            return;
        }
        dispatch(
            writePost({
                title,
                body,
                tags,
            }),
        );
    };

    //취소
    const onCancel = () => {
        history.goBack();
    };

    useEffect(() => {
        if(post){
            const {_id, user} = post;
            history.push(`/@${user.username}/${_id}`);
        }
        if(postError){
            console.log(postError);
        }
    }, [history, post, postError]);

    return <WriteActionButtons 
                onPublish={onPublish} 
                onCancel={onCancel}
                isEdit={!!originalPostId}
            />
};

export default withRouter(WriteActionButtonsConTainer);