import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../gloablstyle';

import Loading from './loading';
import Error from './error';

export default function Page( {menu, state} ){
    return(
        <div> 
            <GlobalStyle />
            <Header>
                {state ? menu.toUpperCase() : "Oops!"} 
            </Header>
            <Body>
                {state ? <Loading /> : <Error />}
            </Body>  
        </div>
    )
}

const Header = styled.span`
    display: flex;
    border: 8px solid #5e6fa3;
    background-color: white;
    margin: 1em;
    margin-bottom: 0.7em;
    box-shadow: 3px 5px 1px #F79109;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    font-weight: bold;
    color: #5e6fa3;
    padding: 0.5em;
`;
const Body = styled.span`
    height: 85vh;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 3px 5px 1px #F79109;
    margin-top: 1.5em;
    margin-right: 1.5em;
    margin-left: 1.5em;
`;