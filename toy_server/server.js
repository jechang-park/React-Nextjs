require('dotenv').config(); // .env 파일 로드

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // 다른 리소스 접근
app.use("/member", require("./api/memberRouter.js"));
app.use("/board", require("./api/boardRouter.js"));

app.use(express.json());
// MongoDB 연결 설정
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");



    // 나머지 미들웨어 및 라우트 설정
    // ...

    // 서버 시작
    app.listen(8080, () => {
      console.log("서버가 포트 8080에서 실행 중입니다.");
    });
  })
  .catch((error) => {
    console.error("MongoDB 연결 중 오류 발생:", error);
  });
