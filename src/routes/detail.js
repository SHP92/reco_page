import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from './page';
import removeTags from '../removeTags';
import GlobalStyle from '../gloablstyle';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export default function Detail(){
    const img = process.env.PUBLIC_URL;
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
                        <img src={DATA.icon} alt='icon' style={{width:100, height:100, borderRadius:5}}/>
                        <Box>
                            <div style={{fontWeight:'bold'}}> {removeTags(DATA.title)} </div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <span> ⭐️ {DATA.scoreText} </span>
                                <span> 🚀 {DATA.installs} </span>
                            </div>
                        </Box>
                    </Block>
                    <Line/>
                    <Block>
                        <div>
                            <div style={{marginBottom: 5, fontSize: 14}}> {removeTags(DATA.summary)} </div>
                            {/* <Desc> {desc.split('\r').map((i, key) => (
                                <div key={key}>{i}</div>
                            ))} </Desc> */}
                        </div>
                    </Block>
                    <Block>
                        <Comments>
                            {COMMENT.map(i => (
                                <Comment>
                                    <Info>
                                        <div style={{display:'flex', flexDirection:'row'}}>
                                            <img src={`${img}images/chat.png`} alt={i} style={{ width:20, paddingRight:7}}/>
                                            <span style={{paddingRight:7, fontWeight:'bold'}}> {i.userName.substring(0,10)} </span>
                                        </div>
                                        <span> 👍 {i.thumbsUp}</span>
                                    </Info>
                                    <div style={{backgroundColor:'#F4F4FF', padding:5}}> 
                                        <div style={{display:'flex', fontSize:12, justifyContent:'space-between'}}>
                                            <div> 
                                                {Array.from({length: Number(i.scoreText)}).map(i=>(
                                                    '⭐️'
                                                ))}
                                            </div>
                                            <div style={{color:'darkgrey'}}> {i.date.split('T')[0]} </div>
                                        </div>
                                        {(i.text.length > 150) ? `${i.text.substring(0,150)}...` :  i.text} 
                                    </div>
                                </Comment>
                            ))}
                        </Comments>
                    </Block>
                    {/* <Block>
                        <Write>
                            my review ✏️ 
                        </Write>
                    </Block> */}
                    <Block>
                        <List to={`/${menu}/${country}/${lang}`} style={{ textDecoration: 'none' }}>
                            🎁 list
                        </List>
                        <Download onClick={()=>window.open(removeTags(DATA.url), '_blank')}>
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
    justify-content: space-between;
    margin-left: 0.5em;
    width: 70vw;
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
    overflow-y: scroll;
    height: 40vh;
    padding: 0.5em;
    padding-top: 0;
`;
const Comment = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 0.9em;
    line-height: 1.5em;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    border-bottom: 1px solid lightgray;
`;
const Info = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 0.5em;
    justify-content: space-between;
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