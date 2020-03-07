import React from 'react';

export default function Error(){
    const img = process.env.PUBLIC_URL;

    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <img src={`${img}images/error.png`} style={{ width:200, height: 200}}/>
        </div>
    )
}