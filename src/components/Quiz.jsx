import { useState, useCallback } from "react";
import QUESTION from '../questions.js';
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from '../assets/quiz-logo.png';

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = 
        answerState === ''? userAnswers.length: userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTION.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            setAnswerState('answered');
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTION[activeQuestionIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5);

    return (
        <div id='quiz'>
            <div id='question'>
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={10000}
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTION[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClasses = '';

                        if (answerState === 'answered' && isSelected) {
                            cssClasses = 'selected';
                        }

                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClasses = answerState;
                        }

                        return <li key={answer} className="answer">
                            <button 
                                onClick={() => handleSelectAnswer(answer)} 
                                className={cssClasses}
                            >
                                {answer}
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
}