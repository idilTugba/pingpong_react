import styles from './styles.module.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { GameContext } from './index';
import HandleScoreBoard from './handleScoreBoard';

interface BallInformation {
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
}

export interface Score {
    leftPlayer: number;
    rightPlayer: number;
}

export default function HandleBall({sticksRef}:{sticksRef:array}){
    const {gameAreaRef, pauseGame, setPauseGame, restartGame, firstPlay, setFirstPlay} = useContext<any>(GameContext);

    const ballRef = useRef<HTMLDivElement>(null);
    const castleLeftRef = useRef<HTMLDivElement>(null);
    const castleRightRef = useRef<HTMLDivElement>(null);

    const [ballInformation, setBallInformation] = useState<BallInformation>({x: 100, y: 150, xSpeed: 2, ySpeed: 2});
    const [score, setScore] = useState<Score>({leftPlayer: 0, rightPlayer: 0});
    const [winner, setWinner] = useState<boolean>(false);

    const handleBall = () => {
        let newBallInformation = {...ballInformation};
        
        //change the way of path by crash lines
        newBallInformation.x = newBallInformation.x + newBallInformation.xSpeed;
        newBallInformation.y = newBallInformation.y + newBallInformation.ySpeed;

        if ( newBallInformation.y < 0 || newBallInformation.y + ballRef.current.offsetHeight + 16 > gameAreaRef.current.offsetHeight) {
            newBallInformation.ySpeed *= -1;          
        } 
        if ( newBallInformation.x < 0 || newBallInformation.x + ballRef.current.offsetWidth + 16 > gameAreaRef.current.offsetWidth) {
            newBallInformation.xSpeed *= -1;          
        } 

        //Kick the ball
        // border 8px - each stick 4px
        if(newBallInformation.x <= 21 && newBallInformation.y + 8 < parseInt(sticksRef[0].current.style.top) + sticksRef[0].current.offsetHeight && newBallInformation.y + 8> parseInt(sticksRef[0].current.style.top)){
                newBallInformation.xSpeed *= -1;          
        } 
        if(newBallInformation.x + ballRef.current.offsetWidth/2 >= gameAreaRef.current.offsetWidth - 40 && newBallInformation.y + 8 < parseInt(sticksRef[1].current.style.top) + sticksRef[1].current.offsetHeight && newBallInformation.y + 8 > parseInt(sticksRef[1].current.style.top)){
                newBallInformation.xSpeed *= -1;          
        } 

        if(!pauseGame) setBallInformation(newBallInformation);
        
        //Goal
        //Area of Castles
        const castleTopPoint = (gameAreaRef.current.offsetHeight - castleLeftRef.current.offsetHeight)/2;
        const castleBottomPoint = (gameAreaRef.current.offsetHeight - castleLeftRef.current.offsetHeight)/2 + castleLeftRef.current.offsetHeight;

        if(newBallInformation.y < castleBottomPoint && newBallInformation.y > castleTopPoint){
            if(newBallInformation.x <= 17) setScore(score => ({...score, rightPlayer:score.rightPlayer+1}))  
            if(newBallInformation.x + ballRef.current.offsetWidth/2 >= gameAreaRef.current.offsetWidth - 26) setScore(score => ({...score, leftPlayer:score.leftPlayer+1}))   
            if(newBallInformation.x <= 17 || newBallInformation.x + ballRef.current.offsetWidth/2 >= gameAreaRef.current.offsetWidth - 26){   
                ballRef.current.style.opacity= 0;
                resetBall();
            } 
        }

    };

    
    const resetBall = () => {
        let newBallInformation = {...ballInformation};
        newBallInformation.x = gameAreaRef.current.offsetWidth/2;
        newBallInformation.y = gameAreaRef.current.offsetHeight/2;
        newBallInformation.xSpeed=2;
        newBallInformation.ySpeed=2;
        ballRef.current.style.opacity= 1;
        
        let randomPathWay = Math.random();

        if(randomPathWay<0.25) {
            newBallInformation.xSpeed *= -1;
        } else if(randomPathWay<0.5){
            newBallInformation.ySpeed *= -1;
        } else if(randomPathWay<0.75){
            newBallInformation.xSpeed *= -1;
            newBallInformation.ySpeed *= -1;
        }

        setBallInformation(newBallInformation);
    }

    //check winner to each new score
    useEffect(() => {
        if(score.rightPlayer==5 || score.leftPlayer==5) {
            setWinner(true)
            setPauseGame(true);
        }
    }, [score]);

    //start game
    useEffect(() => {
        handleBall();
    }, []);
    
    //repeat game
    useEffect(() => {
        const ballInterval = setTimeout(()=>{
            handleBall();
            setFirstPlay(false)
        }, 20)
    }, [ballInformation, pauseGame]);

    //restart game
    useEffect(() => {
        //dont render this codeblock to first component render
        if(firstPlay !== undefined){
            setPauseGame(true);
            setWinner(false);
            setScore({leftPlayer: 0, rightPlayer: 0});
            setTimeout(()=>{
                resetBall();
                setPauseGame(false);
            },20)
        }
    }, [restartGame]);
    
    return(
        <>
            <div 
                ref={ballRef} 
                style={{top: ballInformation.y+'px' , left: ballInformation.x+'px'}} 
                className={styles.ball}>
            </div>
            <HandleScoreBoard playersScore={score} />
            <>
                <div
                    ref={castleLeftRef} 
                    className={styles.castle + ' -left-2 bg-[#90ee90]'}>
                </div>
                <div 
                    ref={castleRightRef} 
                    className={styles.castle + ' -right-2 bg-[#90ee90]'}>
                </div>
            </>
            <p 
                className={`absolute p-10 bg-[#0000ff] outline-[#0000ff] outline-double outline-4 text-white text-3xl top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4  ${winner ? 'inline-block' : 'hidden'} `}>
                Player 
                {(score.rightPlayer==5) ? ' Right ' : ' Left '} 
                Win
            </p>
        </>
    )
}