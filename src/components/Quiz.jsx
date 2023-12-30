import { useState } from "react";
import QUESTION from '../questions.js';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }

    return <div id='question'>
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id="answers">
            {QUESTION[activeQuestionIndex].answers.map((answer) => (
                <li key={answer} className="answer">
                    <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                </li>
            ))}
        </ul>
    </div>
}