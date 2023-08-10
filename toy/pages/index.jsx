import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { setCookie, destroyCookie } from 'nookies';
import { parseCookies } from 'nookies';
import { Container } from 'semantic-ui-react'
import Head from 'next/head';
import Profile from '../components/LoginButton'
import LoginButton from "../components/LoginButton";



const index = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSign, setIsSign] = useState(false);


  useEffect(() => {
    const cookies = parseCookies();
    const { accessToken, refreshToken, username } = cookies;

    if (accessToken && refreshToken && username) {
      setIsLoggedIn(true);
      setUsername(username);

    }
  }, []);



  //   회원가입 함수요청
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("모두 다 입력을 해주세요");
      return;
    }

    try {
      const userData = {
        username,
        email,
        password,
      };

      const res = await fetch("http://localhost:8080/member/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(userData),
      });

      setIsSign(true);
      setUsername("");
      // 로그인 상태로 변경
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }

  };


  //   로그인 요청
  const loginFormSubmit = async (e) => {

    e.preventDefault();
    try {
      const userData = {
        username,
        password,
      };
      const res = await fetch("http://localhost:8080/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        const username = data.data.username;
        setCookie(null, "accessToken", accessToken, { path: "/", maxAge: 86400 });
        setCookie(null, "refreshToken", refreshToken, { path: "/", maxAge: 86400 });
        setCookie(null, "username", username, { path: "/", maxAge: 86400 });
        console.log("로그인 성공");
        console.log("액세스 토큰:", accessToken);
        console.log("리프레시 토큰:", refreshToken);
        console.log("사용자 이름:", username);
      } else {
        // 로그인 실패
        alert("아이디 또는 비밀번호가 일치하지 않아요")
        console.error("로그인 실패:", data.message);
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };


  const handleLogout = () => {
    // 로그아웃 처리
    destroyCookie(null, "accessToken", { path: "/" });
    destroyCookie(null, "refreshToken", { path: "/" });
    destroyCookie(null, "username", { path: "/" });

    setIsLoggedIn(false);
  };


  return (
    <div className='App'>
      <Head>
        <link rel="stylesheet" type="text/css" href="style.css"></link>
      </Head>
      {isLoggedIn ? (
        <div className="Login-completed">

          <h2>로그인 완료!</h2>
          <p>환영합니다, {username}님!</p>
          {isLoggedIn && <button onClick={handleLogout}>로그아웃</button>}
          <Link href='/board'><img src="/img/rm429-065.jpg" alt="" /></Link>

        </div>
      ) : (
        <div>
          {isSign ? (
            <div className="LoginBox">

              {/* 로그인 */}
              <form onSubmit={loginFormSubmit}>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
              </form>

              {message && <div>{message}</div>}
            </div>
          ) : (
            <Container className="textArea">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="text-0"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="text-1"

                  type="email"
                  placeholder="ex ) abcd@abcd.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="text-2"

                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">회원가입</button>
              </form>
            </Container>
          )}
          <p></p>
        </div>
      )}
    </div>
  );
}

export default index;


