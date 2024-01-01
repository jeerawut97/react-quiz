
import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answer.jsx";
import QUESTIONS from '../questions.js';

export default function Question({
    index,
    onSelecteAnswer,
    onSkipAnswer
    }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    function handleSelecteAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelecteAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect? 'correct': 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = "answered";
    }

    console.log("123124"+answer.selectedAnswer)
    return (
        <div id='question'>
            <QuestionTimer
                timeout={10000}
                onTimeout={onSkipAnswer}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelecteAnswer}
            />
        </div>
    )
}