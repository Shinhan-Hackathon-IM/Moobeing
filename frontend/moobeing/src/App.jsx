import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import Router from "./Router";

function App() {
  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post(
          "https://naem11.shop/api/user/login",
          {
            email: "test@gmail.com",
            password: "test",
          },
          {
            withCredentials: true, // 쿠키를 포함시킬 수 있도록 설정
          }
        );

        if (response.status === 200) {
          console.log("로그인 성공:", response.data);
        } else {
          console.log("로그인 실패:", response.status);
        }
      } catch (error) {
        console.error("로그인 중 오류 발생:", error);
      }
    };

    login();
  }, []);

  return (
    <div className="app-container">
      <Router />
    </div>
  );
}

export default App;
