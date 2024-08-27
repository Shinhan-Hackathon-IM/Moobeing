import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizResult } from "../apis/QuizApi";
import RightResult from "../components/Quiz/RightResult";
import WrongResult from "../components/Quiz/WrongResult";

function QuizResult() {
  const [result, setResult] = useState(null);
  const { quizId } = useParams();

  useEffect(() => {
    async function fetchResult() {
      if (!quizId) return;
      try {
        const data = await getQuizResult(quizId);
        setResult(data);
      } catch (error) {
        console.error("퀴즈 결과 가져오기 실패:", error);
      }
    }
    fetchResult();
  }, [quizId]);

  if (result === null) return <div>Loading...</div>;

  return <div>{result.is_correct ? <RightResult /> : <WrongResult />}</div>;
}

export default QuizResult;
