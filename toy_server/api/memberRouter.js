const express = require('express');
const router = express.Router();
const Member = require('../schemas/memberSchema');

// CORS 설정
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 회원 가입 API
router.post('/signup', async (req, res) => {
  console.log("33333333333333333333333333333333")
  try {
    const { username, email, password } = req.body;

    // 데이터베이스에 새로운 회원 생성
    const member = await Member.create({
      username,
      email,
      password,
    });
    console.log('회원 생성됨:', member);

    res.status(201).json({ sueccess: true, data: member });
  } catch (error) {
    console.error('회원 가입 중 오류 발생:', error);
    res.status(500).json({ message: '회원 가입 중 오류가 발생했습니다.' });
  }
});

//로그인 API
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 검증 로직 구현
    const member = await Member.findOne({ username });

    if (member && member.password === password) {
      // 로그인 성공
      // 액세스 토큰 발급
      const accessToken = member.generateAccessToken();
      // 리프레시 토큰 발급
      const refreshToken = member.generateRefreshToken();
      console.log("로그인성공" + member);
      res.status(200).json({ success: true, data: member, accessToken, refreshToken });
    } else {
      // 로그인 실패
      res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
  }
});

//로그인 데이터 조회 API
router.get("/login/username", async (req, res) => {
  try {

    // 사용자 검증 로직 구현
    const member = await Member.findOne({ username });
    res.status(200).json({ success: true, data: member });

  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    res.status(401).json({ message: '정보 조회 실패' });

    res.status(500).json({ message: '정보 조회 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
