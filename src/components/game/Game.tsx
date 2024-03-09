// Game.tsx
import React, {useState} from 'react';
import questionsData from '../../../questions.json'
import './Game.scss'


interface Questions {
    question: string,
    answer: string[],
    correctAnswerIndex: number,
    questionPrice: number
}


const Game: React.FC = () => {

    const questions: Questions[] = questionsData;

    const [gameOver, setGameOver] = useState(false)
    const [win , setWin] = useState(false)
    const [score, setScore] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answerSelected, setAnswerSelected] = useState<boolean>(false);
    const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null); // Track user selected option

    const handleAnswer = (selectedOption: number) => {
        setAnswerSelected(true);
        setUserSelectedOption(selectedOption);
        setTimeout(() => {
            if (selectedOption === questions[currentQuestionIndex].correctAnswerIndex) {
                setScore(score + 1);
                if (currentQuestionIndex === questions.length - 1) {
                    setGameOver(true)
                    setWin(true);
                } else {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
            } else {
                setGameOver(true);
            }
        }, 1200);
    };

    const handleRestart = () => {
        setGameOver(false)
        setScore(0)
        setCurrentQuestionIndex(0)
        setAnswerSelected(false)
        setUserSelectedOption(null)
        setWin(false)
    }


    return (
        <div className="game-container">
            {
                gameOver ?
                    (
                        <div>
                            {win ? <h2>You win!</h2> : <h2>Game over!</h2>}
                            <p>You earn: ${questions[currentQuestionIndex].questionPrice}</p>
                            <button onClick={handleRestart}>Play Again</button>
                        </div>
                    ) : (
                        <div>
                            <h2>Question {currentQuestionIndex + 1}</h2>
                            <p>{questions[currentQuestionIndex].question}</p>
                            <div>
                                {questions.map((question, index) => {
                                    return(
                                        <p className={`price ${index === currentQuestionIndex && 'current-question'} ${index <= currentQuestionIndex && 'answered'}`}>${question.questionPrice}</p>
                                    )
                                })}
                            </div>
                            <div>
                                {questions[currentQuestionIndex].answer.map((answer, index) => {
                                    return (
                                        <button className={`
                                          option-button 
                                          ${answerSelected && userSelectedOption === index && index === questions[currentQuestionIndex].correctAnswerIndex ? 'correct' : ''}
                                          ${answerSelected && userSelectedOption === index && index !== questions[currentQuestionIndex].correctAnswerIndex ? 'incorrect' : ''}
                                        `} key={index} onClick={() => handleAnswer(index)}>
                                            {answer}
                                        </button>
                                    )
                                })}
                            </div>
                            <p>Score: {score}</p>
                        </div>
                    )
            }
        </div>
    );
};

export default Game;
