import {useState} from 'react';
import questionsData from '../../../questions.json'
import './Game.scss'
import hand from '../../assets/hand.png'


interface Questions {
    question: string,
    answer: string[],
    correctAnswerIndex: number[],
    questionPrice: string
}


const Game = () => {

    const questions: Questions[] = questionsData;

    const [gameOver, setGameOver] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answerSelected, setAnswerSelected] = useState<boolean>(false);
    const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
    const [totalEarned, setTotalEarned] = useState<number>(0);
    const [burgerMenu, setBurgerMenu] = useState(false)


    const handleOpenMenu = () => {
        setBurgerMenu(!burgerMenu);
    }

    const handleAnswer = (selectedOption: number) => {
        setAnswerSelected(true);
        setUserSelectedOption(selectedOption);
        setTimeout(() => {
            const correctAnswers = questions[currentQuestionIndex].correctAnswerIndex;
            if (correctAnswers.includes(selectedOption)) {
                const questionPrice = parseInt(questions[currentQuestionIndex].questionPrice.replace(',', ''));
                setTotalEarned(questionPrice);
                if (currentQuestionIndex === questions.length - 1) {
                    setGameOver(true);
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
        setTotalEarned(0);
    }


    return (
        <div className="game-container">
            {
                gameOver ?
                    (
                        <div className={'game-over'}>
                            <img alt={'hand'} src={hand} className={'game-over-img'}/>
                            <div className={'stat-info'}>
                                <p className={'earned'}>
                                    <span
                                        className={'total'}>Total score:</span><br/>${totalEarned} earned
                                </p>
                                <button className={'button-again'} onClick={handleRestart}>Play Again</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className={'game-question'}>{questions[currentQuestionIndex].question}</p>
                            <div className={'burger-menu'} onClick={handleOpenMenu}>
                                <div className={'burger-menu-btn'}></div>
                                <div className={'burger-menu-btn'}></div>
                                <div className={'burger-menu-btn'}></div>
                            </div>
                            <div className={`question-price ${burgerMenu && 'responsive'}`}>
                                <div className={`burger-menu burger-menu-close`} onClick={handleOpenMenu}>
                                    <div className={'burger-menu-btn'} id={'close-1'}></div>
                                    <div className={'burger-menu-btn'} id={'close-2'}></div>
                                </div>
                                {questions.map((question, index) => {
                                    return (
                                        <div className={'info'} key={index}>
                                            <p className={`price ${index === currentQuestionIndex && 'current-question'} ${index <= currentQuestionIndex && 'answered'}`}>${question.questionPrice}</p>
                                            <svg className={'question-price-wrapper'} width="240" height="40"
                                                 viewBox="0 0 389 72" fill="current-color"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    className={`price-wrapper ${index === currentQuestionIndex && 'current-question'} ${index <= currentQuestionIndex && 'answered'}`}
                                                    d="M23.8137 5.09773C25.9857 2.2033 29.3933 0.5 33.012 0.5H355.988C359.607 0.5 363.014 2.2033 365.186 5.09773L388.375 36L365.186 66.9023C363.014 69.7967 359.607 71.5 355.988 71.5H33.012C29.3933 71.5 25.9857 69.7967 23.8137 66.9023L0.625116 36L23.8137 5.09773Z"
                                                    fill="white" stroke="#D0D0D8"/>
                                            </svg>
                                        </div>

                                    )
                                })}
                            </div>
                            <div className={'answers'}>
                                {questions[currentQuestionIndex].answer.map((answer, index) => {
                                    return (
                                        <div className={'option-wrapper'}
                                             key={index} onClick={() => handleAnswer(index)}>
                                            <p className={'option-answer'}>
                                                {answer}
                                            </p>
                                            <svg width="389" height="72" viewBox="0 0 389 72" fill="current-color"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    className={`option-button ${answerSelected && userSelectedOption === index ? (questions[currentQuestionIndex].correctAnswerIndex.includes(index) ? 'correct' : 'incorrect') : ''}`}
                                                    d="M23.8137 5.09773C25.9857 2.2033 29.3933 0.5 33.012 0.5H355.988C359.607 0.5 363.014 2.2033 365.186 5.09773L388.375 36L365.186 66.9023C363.014 69.7967 359.607 71.5 355.988 71.5H33.012C29.3933 71.5 25.9857 69.7967 23.8137 66.9023L0.625116 36L23.8137 5.09773Z"
                                                    fill="white" stroke="#D0D0D8"/>

                                            </svg>
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
