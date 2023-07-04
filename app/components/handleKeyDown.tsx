import React,{useEffect} from 'react';

const getKeyDown = ({onKeyDown} : {onKeyDown:React.KeyboardEvent}) => {

    useEffect(()=>{
        const handleKeyDown = (e: React.KeyboardEvent) => {
            onKeyDown(e);
        }
        document.addEventListener('keydown', handleKeyDown);
        
            return () => {
              document.removeEventListener('keydown', handleKeyDown);
            };
    },[onKeyDown])

    return(
        <></>
    )
}

export default getKeyDown