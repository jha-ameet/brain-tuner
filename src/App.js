import React, { useState, useEffect } from "react";
import "./App.css";

const BrainTunerGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions] = useState(10);
  const [timer, setTimer] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Timer effect to run continuously
  useEffect(() => {
    if (!isGameFinished) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isGameFinished]);

  // Function to generate a new question
  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 10);
    const newNum2 = Math.floor(Math.random() * 10);
    const operators = ["+", "-"];
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    setNum1(newNum1);
    setNum2(newNum2);
    setOperator(randomOperator);
    setAnswer(""); // Reset the answer input
  };

  // Check the user's answer
  const checkAnswer = (event) => {
    event.preventDefault();

    let correctAnswer = operator === "+" ? num1 + num2 : num1 - num2;

    if (parseInt(answer) === correctAnswer) {
      setCorrectAnswers((prevCount) => prevCount + 1);
      if (correctAnswers + 1 === totalQuestions) {
        setIsGameFinished(true); // End the game
      } else {
        generateQuestion(); // Generate a new question if the answer is correct
      }
    } else {
      alert("Wrong answer, try again!");
    }
  };

  // Start the game by generating the first question
  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="brain-tuner">
      <h1>Brain Tuner Game</h1>
      <div className="timer">Time: {timer} seconds</div>
      <div className="question-counter">
        Question: {correctAnswers + 1}/{totalQuestions}
      </div>

      {!isGameFinished ? (
        <div className="question">
          <label>{num1}</label>
          <span> {operator} </span>
          <label>{num2}</label>
          <span> = </span>
          <form onSubmit={checkAnswer}>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>You answered all {totalQuestions} questions correctly.</p>
          <p>Total Time: {timer} seconds</p>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrainTunerGame />
    </div>
  );
}

export default App;
