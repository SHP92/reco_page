import React from 'react';

export default function Loading(){
    const img = process.env.PUBLIC_URL;
    return(
        <img src={`${img}images/loader.png`} alt='loader' height={256}/>
    )
}