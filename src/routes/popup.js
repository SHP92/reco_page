import React from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';
import { COUNTRY, LANG } from '../info';

export default function Popup({ _setCountry, _setLang }){
    return(
        <Container style={{position: 'absolute', left: 0, top: 60, zIndex:10}}>
            <Menu>
                <Title> COUNTRY </Title>
                <Contents>
                    {Object.keys(COUNTRY).map(i=>(
                        <Ripples>
                            <Content key={i} onClick={()=>_setCountry(i)}>
                                {i}
                            </Content>
                        </Ripples>
                    ))}
                </Contents>
            </Menu>
            <Menu>
                <Title> LANGUAGE </Title>
                <Contents>
                    {Object.keys(LANG).map(i=>(
                        <Ripples>
                            <Content key={i} onClick={()=>_setLang(i)}>
                                {i}
                            </Content>
                        </Ripples>
                    ))}
                </Contents>
            </Menu>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 20vh;
    border: 8px solid #5e6fa3;
    background-color: white;
    margin: 2.5em;
    box-shadow: 3px 5px 1px #F79109;
`;
const Menu = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0.3em;
    overflow-y: scroll;
`;
const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.3em;
    min-height: 3vh;
    background-color: #F79109;
    font-weight: bold;
    color: white;
`;
const Contents = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    /* align-items: center; */
`;
const Content = styled.div`
    margin-bottom: 0.3em;
`;