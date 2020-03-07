import React from 'react';
import GlobalStyle from '../gloablstyle';
import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Loading from './loading';
import Error from './error';

export default function Page( {menu, state} ){
    return(
        <div> 
            <GlobalStyle />
            <Card style={{width:'100%'}}>
                <Card.Content>
                    <Card.Header style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {state? null : 
                        <Link to="/" style={{ textDecoration: 'none', position:'absolute', left:-3, top:-5 }}>
                            <Image fluid label={{
                                color: 'teal',
                                content: 'HOME',
                                icon: 'home',
                                ribbon: true,
                            }}/>
                        </Link>
                    }
                        {state ? 
                            <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name={menu} color='grey'/>
                                <div style={{marginRight:5, marginLeft:5}}> {menu.toUpperCase()} </div>
                            </div> : "Oops!"} 
                    </Card.Header>
                </Card.Content>
                <Card.Content style={{height:document.body.clientHeight*0.95, display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    {state ? <Loading /> : <Error />}
                </Card.Content>
            </Card>
        </div>
    )
}