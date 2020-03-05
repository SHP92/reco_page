import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from './page';
import removeTags from '../removeTags';
import GlobalStyle from '../gloablstyle';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export default function Detail(){
    const img = process.env.PUBLIC_URL;
    const [swiper, setSwiper] = useState(null);
    const { menu, country, lang, id } = useParams();
    const GET_DETAIL = gql`
        query {
            GoogleGetFullDetail(appId:"${id}", country:"${country}", language:"${lang}"){
                googleApp{
                    title
                    installs
                    scoreText
                    icon
                    url
                    summary
                    description
                    comments
                }
            }
        }
    `
    const { loading, error, data } = useQuery(GET_DETAIL);
    if (loading) return <Page menu={menu} state={true}/>;
    if (error) return <Page menu={menu} state={false}/>;

    const DATA = data.GoogleGetFullDetail.googleApp;
    const COMMENT = JSON.parse(DATA.comments);
    const desc = (DATA.description.length > 250) ? `${removeTags(DATA.description).substring(0,250)}...` : removeTags(DATA.description)

    return (
        <div>
            <GlobalStyle/>
            <Header>
                {menu.toUpperCase()}
            </Header>
            <Body>
                <InsideBody>
                    <Block>
                        <Img src={DATA.icon} width={100} height={100}/>
                        <Box>
                            <Title> {removeTags(DATA.title)} </Title>
                            <div> ⭐️ {DATA.scoreText} </div>
                            <div> 🚀 {DATA.installs} </div>
                        </Box>
                    </Block>
                    <Line/>
                    <Block>
                        <div>
                            <Summary> {removeTags(DATA.summary)} </Summary>
                            {/* <Desc> {desc.split('\r').map((i, key) => (
                                <div key={key}>{i}</div>
                            ))} </Desc> */}
                        </div>
                    </Block>
                    <Block>
                        <Comments>
                            {COMMENT.map(i => (
                                <Comment>
                                    <img src={`${img}images/chat.png`} style={{ width:20}}/>
                                    {console.log(i)}
                                    <div> {i.userName} </div>
                                    <div> {i.text} </div>
                                    <div> ⭐️ {i.scoreText} </div>
                                    <div> 👍 {i.thumbsUp}</div>
                                </Comment>
                            ))}
                        </Comments>
                    </Block>
                    <Block>
                        <Write>
                            my review ✏️ 
                        </Write>
                    </Block>
                    <Block>
                        <List to={`/${menu}/${country}/${lang}`} style={{ textDecoration: 'none' }}>
                            🎁 list
                        </List>
                        <Download onClick={()=>window.open(DATA.url, '_blank')}>
                            download 🚀
                        </Download>
                    </Block>
                </InsideBody>
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
const Body = styled.span`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 0.5em;
    box-shadow: 3px 5px 1px #F79109;
    margin-top: 1.5em;
    margin-right: 1.5em;
    margin-left: 1.5em;
    height: 80vh;
`;
const InsideBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 75vh;
    /* border: 1px solid black; */
`;
const Block = styled.span`
    display: flex;
    justify-content: center;
`;
const Box = styled.span`
    display : flex;
    flex-direction: column;
    margin-left: 0.5em;
    width: 70vw;
`;
const Title = styled.div`
    font-weight: bold;
    margin-bottom: 0.5em;
`;
const Summary = styled.div`
    margin-bottom: 0.5em;
    font-size: 0.9em;
`;
const Img = styled.img`
    display: flex;
    border-radius: 0.5em;
`;
const Desc = styled.div`
    font-size: 0.9em;
    padding: 0.5em;
    line-height: 1.5em;
    background: rgba(254, 208, 110, 0.5);
`;
const Comments = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightgray;
    padding: 0.5em;
    overflow-y: scroll;
    height: 40vh;
`;
const Comment = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 0.9em;
    line-height: 1.5em;
`;
const Nav = styled.div`
    display: flex;
    align-items: center;
    /* padding: 0.5em; */
`;
const Button = styled.div`
    justify-content: center;
    align-items: center;
    height: 6vh;
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 0.5em;
`;
const Write = styled(Button)`
    display: inline-flexbox;
    width: 100vw;
    color: #F79109;
    border: 5px solid #F79109;
`;
const Download = styled(Button)`
    display: flex;
    width: 50vw;
    border: 5px solid #F79109;
    margin-left: 0.2em;
    color: #F79109;
`;
const List = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6vh;
    width: 50vw;
    border:5px solid #5e6fa3;
    margin-right: 0.2em;
    font-size: 1.2em;
    color: #5e6fa3;
    font-weight: bold;
    margin-top: 0.5em;
`;
const Line = styled.div`
    border-top: 1px solid lightgray;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`