import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Popup from './popup';
import GlobalStyle from '../gloablstyle';
import { COUNTRY, LANG } from '../info';

const MENU = ['translate', 'wifi', 'map', 'food', 'hotel', 'travel'];

export default function Home(){
    const img = process.env.PUBLIC_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState(Object.keys(COUNTRY)[0]);
    const [lang, setLang] = useState(Object.keys(LANG)[0]);

    const _toggle = () => {
        setIsOpen(isOpen ? false : true);
    }

    return (
        <div>
            <GlobalStyle/>
            {isOpen ? <Popup _setCountry={setCountry} _setLang={setLang}/> : null}
            <Header onClick={_toggle}>
                {country.toUpperCase()}
            </Header>
            <Body onClick={()=>setIsOpen(false)}>
                {MENU.map(m => (
                    <Div
                        to={{pathname: `/${m}/${COUNTRY[country]}/${LANG[lang]}`}} 
                        style={{ textDecoration: 'none' }}
                    >
                        <Content>
                            <Img>
                                <img src={`${img}images/${m}.png`} alt={m} style={{ width:50 }}/>
                            </Img>
                            <Card >
                                <Title>{m.toUpperCase()}</Title>
                            </Card>
                            <img src={`${img}images/step.png`} alt={`${m}_step`} style={{ width:25 }}/>
                        </Content>
                    </Div>
                ))}
            </Body>
        </div>
    );
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
const Body = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 0.5em;
    box-shadow: 3px 5px 1px #F79109;
    margin-top: 1.5em;
    margin-right: 1.5em;
    margin-left: 1.5em;
    /* height: 80vh; */
`;
const Div = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5em;
    padding-bottom: 0.8em;
    border-bottom: 1px solid lightgray;
`;
const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;
const Card = styled.div`
    display: flex;
    background-color: white;
    border-radius: 0.5em;
    padding: 0.5em;
    width: 100%;
    /* justify-content: center; */
`;
const Title = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 1.5em;
    color: black;
    padding-left: 0.5em;
`;
const Img = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5em;
`;