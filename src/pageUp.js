import React from 'react';
import { Button } from 'semantic-ui-react';

export default function PageUp(){
    return(
        <div style={{position:'absolute', zIndex:10, right:10, top:document.body.clientHeight*0.9}}>
            <Button circular primary icon='angle double up' size='huge' onClick={()=>document.getElementById('contents').scroll(0,0)}/>
        </div>
    );
}