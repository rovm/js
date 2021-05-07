import Recat from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import {StaticRouter} from 'react-router-dom';
import App from './App';
import path from 'path';

const app = express();

//서버 사이드 렌더링을 처리할 핸들러 함수입니다.
const serverRender = (req, res, next) => {
    //이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줍니다.
    const context = {};
    const jsx = (
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    )
    const root = ReactDOMServer.renderToString(jsx);
    res.send(root);
};

const serve = express.static(path.resolve('./build'), {
    index: false 
})

app.use(serve)
app.use(serverRender);

//5000 포트로 서버를 가동합니다.
app.listen(5000, () => {
    console.log(`Running on http://localhost:5000`)
})

// const html = ReactDOMServer.renderToString(
//     <div>Hello Server Side Rendering</div>
// );

// console.log(html);