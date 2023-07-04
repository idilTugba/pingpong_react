import styles from './styles.module.css';
import React, { useState, useEffect, useRef, useContext} from 'react';
import HandleKeyDown from './handleKeyDown';
import HandleBall from './handleBall';
import { GameContext } from './index';

export default function HandleSticks(){
    const {gameAreaRef, pauseGame, setPauseGame, restartGame, firstPlay, setFirstPlay} = useContext<any>(GameContext);

    const leftStickRef = useRef<HTMLDivElement>(null);
    const rightStickRef = useRef<HTMLDivElement>(null);

    const [leftStick, setLeftStick] = useState<string>('0px');
    const [rightStick, setRightStick] = useState<string>('0px');
    const [sticksRef, setSticksRef] = useState<array>([leftStickRef,rightStickRef]);

    useEffect(() => {
        if (gameAreaRef.current) {
            const height:string = `${(gameAreaRef.current.offsetHeight) / 2 - leftStickRef.current.offsetHeight/2}px`;
            setLeftStick(height);
            setRightStick(height);
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const leftStickMove:number = parseInt(leftStickRef.current.style.top, 10);
        const rightStickMove:number = parseInt(rightStickRef.current.style.top, 10);
        
        switch (e.keyCode) {
        case 87:
            if (leftStickMove <= 0) break;
            setLeftStick(`${leftStickMove - 30}px`);
            break;
        case 83:
            if (leftStickMove >= gameAreaRef.current.offsetHeight - 30) break;
            setLeftStick(`${leftStickMove + 30}px`);
            break;
        case 38:
            if (rightStickMove <= 0) break;
            setRightStick(`${rightStickMove - 30}px`);
            break;
        case 40:
            if (rightStickMove >= gameAreaRef.current.offsetHeight - 30) break;
            setRightStick(`${rightStickMove + 30}px`);
            break;
        }
    };

    return(
        <>
            <div 
                ref={leftStickRef} 
                style={{top: leftStick}} 
                className='w-1 h-[50px] bg-black absolute z-[99] left-3'>
            </div>
            <div 
                ref={rightStickRef} 
                style={{top: rightStick}} 
                className="w-1 h-[50px] bg-black absolute z-[99] right-3">
            </div>
            <HandleKeyDown onKeyDown={handleKeyDown}/>
            <HandleBall sticksRef={sticksRef}/>
        </>
    )
}

