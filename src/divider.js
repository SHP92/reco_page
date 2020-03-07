import React from 'react';
import { Divider, Icon } from 'semantic-ui-react';

export default function DivideLine(icon, iconColor, text, textColor){
    return (
        <Divider horizontal>
            <div style={{display:'flex'}}>
                <Icon name={icon} color={iconColor}/>
                <div style={{color:{textColor}, fontWeight:'lighter'}}> {text} </div>
            </div>
        </Divider>
    )
}
