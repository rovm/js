import Post from './models/post';

export default function createFakeDate() {
    const posts = [...Array(40).keys()].map(i => ({
        title: `포스트 #${i}`,
        body: '그냥 그냥  그냥 그냥 그냥ㅇ으그그그그극냥',
        tags: ['가짜','데이터'],
    }));

    Post.insertMany(posts, (err, docs) => {
        console.log(docs);
    });
}