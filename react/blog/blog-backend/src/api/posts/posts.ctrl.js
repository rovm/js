import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import sanitizeHtml from 'sanitize-html';

const {ObjectId} = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockqute',
    'a',
    'img',
  ],
  allowedAttribute: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};
// https://www.npmjs.com/package/sanitize-html

export const checkObjectId = (ctx, next) => {
  const {id} = ctx.params;
  if(!ObjectId.isValid(id)){
    ctx.status = 400; //Bad request
    return;
  }
  return next();
};

export const write = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(), // 문자열로 이루어진 배열
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const {title, body, tags} = ctx.request.body;
  const post = new Post({
    title,
    body: removeHtmlAndShorten(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try{
    await post.save();
    ctx.body = post;
  } catch(e){
    ctx.throw(500, e);
  }
}

//html을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const list = async ctx => {
  //query는 문자열이기 때문에 숫자로 변환해 주어야 합니다.
  //값이 주어지지 않았다면 1을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if(page < 1){
    ctx.status = 400;
    return;
  }
  const {tag, username} = ctx.query;
  //tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const query = {
    ...(username ? {'user.username' : username} : {}),
    ...(tag ? {tags: tag} : {}),
  };

  try{
    const posts = await Post.find(query).sort({_id: -1}).limit(10).skip((page-1) * 10).lean().exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount/10));
    ctx.body = posts.map(post => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch(e){
    ctx.throw(500, e);
  }
};

export const read = async ctx => {
  // const {id} = ctx.params;
  // try{
  //   const post = await Post.findById(id).exec();
  //   if(!post){
  //     ctx.status = 404;
  //     return;
  //   }
  //   ctx.body = post;
  //   } catch(e){
  //     ctx.throw(e);
  //   }
  ctx.body = ctx.state.post;
};

export const remove = async ctx => {
  const {id} = ctx.params;
  try{
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch(e){
    ctx.throw(500, e);
  }
};

export const update = async ctx => {
  const { id } = ctx.params;
  // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = {...ctx.request.body}; //객체를 복사하고
  //body 값이 주어졌으면 html 필터링
  if(nextData.body){
    nextData = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try{
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면, 업데이트된 데이터를 반환합니다.
      //false일 때는 업데이트되기 전의 데이터를 반환합니다.
    }).exec();
    if(!post){
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch(e){
    ctx.throw(e);
  }
};

export const getPostById = async (ctx, next) => {
  const {id} = ctx.params;
  if(!ObjectId.isValid(id)){
    ctx.status = 400;
    return;
  }
  try{
    const post = await Post.findById(id);
    //포스트가 존재하지 않을 때
    if(!post){
      ctx.status = 404; // Not Found 
      return;
    }
    ctx.state.post = post;
    return next();
  } catch(e){
    ctx.throw(500, e);
  }
}

export const checkOwnPost = (ctx, next) => {
  const {user, post} = ctx.state;
  if(post.user._id.toString() !== user._id){
    ctx.status = 403;
    return;
  }
  return next();
}