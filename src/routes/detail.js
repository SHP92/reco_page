import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from './page';
import removeTags from '../removeTags';
import GlobalStyle from '../gloablstyle';
import { Card, Icon, Rating, Accordion, Label, Image } from 'semantic-ui-react';
import DivideLine from '../divider';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export default function Detail(){
    const { menu, country, lang, id } = useParams();
    const [activeIndex, setActiveIndex] = useState();
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
            <Card style={{width:'100%'}}>
                <Card.Content>
                    <Card.Header style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}> 
                        <Link to={`/${menu}/${country}/${lang}`} style={{ textDecoration: 'none', position:'absolute', left:-3, top:-5}}>
                            <Image
                                label={{ 
                                color: 'teal',
                                content: 'LIST',
                                icon: 'list ul',
                                ribbon: true, 
                                size: 'large'}}
                            />
                        </Link>
                        <Icon name={menu} color='grey'/>
                        <div style={{marginRight:5, marginLeft:5}}> {menu.toUpperCase()}  </div>
                    </Card.Header>
                </Card.Content>
                <Card.Content style={{height:document.body.clientHeight*0.95, overflowY:'scroll', display:'flex', flexDirection:'column', overflow:'hidden'}}>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <img src={DATA.icon} alt='icon' style={{display:'flex', width:100, height:100, borderRadius:5, marginRight:7}}/>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                            <Card.Header style={{fontWeight:'bold'}}> {removeTags(DATA.title)} </Card.Header>
                            <div>
                                <Card.Description style={{display:'flex'}}> 
                                    <Icon name='star' color='yellow'/>
                                    <div> {DATA.scoreText}  </div>
                                </Card.Description>
                                <Card.Description style={{display:'flex', alignItems:'center'}} onClick={()=>window.open(removeTags(DATA.url), '_blank')}> 
                                    <Icon name='download' color='grey'/>
                                    <div> {DATA.installs} </div>
                                    <Label as='a' basic color='teal' pointing='left' size='small' style={{marginLeft:10}}> 
                                        DOWNLOAD
                                    </Label>
                                </Card.Description>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex', flex:1, flexDirection:'column'}}>
                        { DivideLine('tag', 'grey', 'description', 'grey') }
                        <div style={{marginBottom: 5, fontSize: 14}}> {removeTags(DATA.summary)} </div>
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={(e, titleProps) => {
                                    const { index } = titleProps
                                    const newIndex = activeIndex === index ? -1 : index
                                    setActiveIndex(newIndex)
                                }}
                            >
                            <Icon name='dropdown' />
                            What is a dog?
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <p>
                                    A dog is a type of domesticated animal. Known for its loyalty and
                                    faithfulness, it can be found as a welcome guest in many households
                                    across the world.
                                </p>
                            </Accordion.Content>
                        </Accordion>
                        {/* <Desc> {desc.split('\r').map((i, key) => (
                            <div key={key}>{i}</div>
                        ))} </Desc> */}
                    </div>
                    <div style={{display:'flex', flex:2, flexDirection:'column', paddingBottom:20}}>
                        { DivideLine('comments', 'grey', 'reviews', 'grey') }
                        <div style={{display:'flex', flexDirection:'column', overflowY:'scroll', height:document.body.clientHeight*0.5}}>
                            {COMMENT.map(i => (
                                <Comment>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                        <Label image>
                                            <img src={i.userImage} />
                                            {i.userName.substring(0,10)}
                                            <Label.Detail>
                                                <Icon name='heart' color='red'/> 
                                                {i.thumbsUp}

                                            </Label.Detail>
                                        </Label>
                                        <Rating defaultRating={Number(i.scoreText)} maxRating={5} icon='star' disabled size='tiny'/>
                                    </div>
                                    <div style={{padding:5}}> 
                                        {i.text} 
                                        <div style={{color:'darkgrey', fontSize:12, textAlign:'right'}}> {i.date.split('T')[0]} </div>
                                    </div>
                                </Comment>
                            ))}
                        </div>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
}

const Desc = styled.div`
    font-size: 0.9em;
    padding: 0.5em;
    line-height: 1.5em;
    background: rgba(254, 208, 110, 0.5);
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