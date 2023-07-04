import styles from './styles.module.css';
import React, { useState, useRef, createContext } from 'react';
import HandleGame from './handleGame';
import ButtonGame from './button';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export const GameContext = createContext();

const PinPonGame = ():JSX.Element => {
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const [pauseGame, setPauseGame] = useState<boolean>(true);
    const [restartGame, setRestartGame] = useState<boolean>(false);
    const [firstPlay, setFirstPlay] = useState<undefined>(undefined);

    return (
        <>  
            <div className="block sm:hidden font-extrabold text-[#3f9150] text-sm">*The screen width must be more than 600px to play <SentimentDissatisfiedIcon className="text-[#3f9150] !block !text-9xl !w-auto pl-1/2" /> </div>
            <div className="overflow-hidden mt-20 my-30 w-full hidden sm:block">
                <div ref={gameAreaRef} className={styles.area}>
                    <GameContext.Provider value={{gameAreaRef, pauseGame, setPauseGame, restartGame, firstPlay, setFirstPlay}}>
                        <div className={styles.line}></div>
                        {/* açılışta büyük play tuşu ama restart olduğunda görünüp kaybolma sorunu var. Daha sonra sistemi değiştir */}
                        {/* {pauseGame
                        && <button 
                            className={`absolute flex justify-center items-center h-16 w-52 focus:w-48 focus:h-14 hover:bg-[#fff] bg-[#ff0000] outline-[#ff0000] outline-double outline-4 text-white hover:text-[#ff0000] text-2xl text-bolder transition duration-500 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4`} 
                            onClick={e => setPauseGame(false)}>
                            PLAY GAME
                            </button>
                        } */}
                    <HandleGame />
                    </GameContext.Provider>
                </div>
                <div
                    className="flex flex-row justify-around mt-3">
                    <ButtonGame 
                        values={{class:'', content:'Pause'}}
                        onClick={e => setPauseGame(true)} />
                    <ButtonGame 
                        values={{class:'', content:'Play'}}
                        onClick={e => setPauseGame(false)} />
                    <ButtonGame 
                        values={{class:'', content:'Restart'}}
                        onClick={e => setRestartGame(prevRestart => !prevRestart)} />
                </div>
                <p 
                    className="font-bold text-xs mt-4">
                    * W,S on keybord to LeftPlayer, arrow directions on the keyboard to RightPlayer
                </p>
            </div>
        </>
    )
}

export default PinPonGame