// Game.tsx
import {useState} from 'react';
import questionsData from '../../../questions.json'
import './Game.scss'


interface Questions {
    question: string,
    answer: string[],
    correctAnswerIndex: number[],
    questionPrice: string
}


const Game = () => {

    const questions: Questions[] = questionsData;

    const [gameOver, setGameOver] = useState(false)
    const [win, setWin] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answerSelected, setAnswerSelected] = useState<boolean>(false);
    const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);

    const handleAnswer = (selectedOption: number) => {
        setAnswerSelected(true);
        setUserSelectedOption(selectedOption);
        setTimeout(() => {
            const correctAnswers = questions[currentQuestionIndex].correctAnswerIndex;
            if (correctAnswers.includes(selectedOption)) {
                if (currentQuestionIndex === questions.length - 1) {
                    setGameOver(true);
                    setWin(true);
                } else {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setAnswerSelected(false);
                }
            } else {
                setGameOver(true);
            }
        }, 1500);
    };


    const handleRestart = () => {
        setGameOver(false)
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
                            <p className={'game-question'}>{questions[currentQuestionIndex].question}</p>
                            <div className={'question-price'}>
                                {questions.map((question, index) => {
                                    return (
                                        <p className={`price ${index === currentQuestionIndex && 'current-question'} ${index <= currentQuestionIndex && 'answered'}`}>${question.questionPrice}</p>
                                    )
                                })}
                            </div>
                            <div className={'questions'}>
                                {questions[currentQuestionIndex].answer.map((answer, index) => {
                                    return (
                                        <div id={'pointer'}
                                             className={`option-button ${answerSelected && userSelectedOption === index ? (questions[currentQuestionIndex].correctAnswerIndex.includes(index) ? 'correct' : 'incorrect') : ''}`}
                                             key={index} onClick={() => handleAnswer(index)}>
                                            {answer}
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default Game;
