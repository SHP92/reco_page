import React from 'react';
import { Loader } from 'semantic-ui-react';

export default function Loading(){
    const img = process.env.PUBLIC_URL;
    return(
        <Loader active inline='centered' size='massive'/>
        // <img src={`${img}images/loader.png`} alt='loader' height={256}/>
    )
}