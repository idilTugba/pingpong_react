import styles from './styles.module.css';
import React, { useState, useEffect, useRef } from 'react';
import {scoreBoard} from './handleBall';

export default function HandleScoreBoard({playersScore}:{playersScore:scoreBoard}){
    return(
        <div id="scoreboard" className={styles.scoreBoard}>
            <div 
                className={styles.score+ ' float-left'}
                >
                {playersScore.leftPlayer}
            </div>
            <div 
                className={styles.score+ ' float-right'}
                >
                {playersScore.rightPlayer}
            </div>
        </div>
    )
}