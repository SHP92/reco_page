import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from './page';
import removeTags from '../removeTags';
import GlobalStyle from '../gloablstyle';
import { Card, Icon, Rating, Accordion, Label, Image, Tab, CardContent, Button } from 'semantic-ui-react';
import DivideLine from '../divider';
import { MENU } from '../info';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export default function Detail(){
    const { menu, country, lang, id } = useParams();
    const key = Object.keys(MENU).filter(i => MENU[i].value === menu);
    const text = MENU[key].text;
    const icon = MENU[key].icon;
    const [activeIndex, setActiveIndex] = useState(-1);

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const GET_DETAIL = iOS ? 
        gql`
        query {
            AppleGetFullDetail(appId:"${id}", country:"${country}"){
                appleApp{
                    title
                    # installs
                    reviews
                    score
                    icon
                    url
                    # summary
                    description
                    comments
                    screenshots
                }
            }
        }
    ` 
        : gql`
        query {
            GoogleGetFullDetail(appId:"${id}", country:"${country}", language:"${lang}"){
                googleApp{
                    title
                    installs
                    score
                    icon
                    url
                    summary
                    description
                    comments
                    screenshots
                }
            }
        }
    `
    const { loading, error, data } = useQuery(GET_DETAIL);
    if (loading) return <Page menu={menu} state={true}/>;
    if (error) return <Page menu={menu} state={false}/>;

    const DATA = iOS ? data.AppleGetFullDetail.appleApp : data.GoogleGetFullDetail.googleApp;
    const COMMENT = JSON.parse(DATA.comments);

    const PANE = [
        {
            menuItem: {icon: 'picture'}
            , render: () => (
                <Tab.Pane style={{display:'flex', overflowX:'scroll'}}>
                    {DATA.screenshots.map((i,key) => {
                        if(key < 5){
                            return (
                                <div>
                                    <img src={i} width={150}/>
                                </div>
                            )
                        }
                    })}
                </Tab.Pane>
            )
        },
        {
            menuItem: {icon: 'content'}
            , render: () => (
                <Tab.Pane> 
                    {removeTags(DATA.description).split('\r').map((i, key) => (
                        <div key={key}>{i}</div>
                    ))}
                </Tab.Pane>
            )
        }
    ];

    return (
        <div>

            <GlobalStyle/>
            <Card style={{width:'100%', overflowX:'hidden'}}>
                <div style={{position:'absolute', zIndex:10, right:10, top:document.body.clientHeight*0.9}}>
                    <Button circular primary icon='angle double up' size='massive' onClick={()=>document.getElementById('contents').scroll(0,0)}/>
                </div>
                <Card.Content>
                    <Card.Header style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}> 
                        <Link to={`/${menu}/${country}/${lang}`} style={{ textDecoration: 'none', position:'absolute', left:-3, top:-5}}>
                            <Image
                                label={{ 
                                color: 'blue',
                                content: 'LIST',
                                icon: 'list ul',
                                ribbon: true, 
                                size: 'large'}}
                            />
                        </Link>
                        <Icon name={icon} color='grey'/>
                        {/* <div style={{marginRight:5, marginLeft:5}}> {menu.toUpperCase()}  </div> */}
                    </Card.Header>
                </Card.Content>
                <Card.Content style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <img src={DATA.icon} alt='icon' style={{display:'flex', width:100, height:100, borderRadius:5, marginRight:7}}/>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                            <Card.Header style={{fontWeight:'bold'}}> {removeTags(DATA.title)} </Card.Header>
                            <div>
                                <Card.Description style={{display:'flex'}}> 
                                    <Icon name='star' color='yellow'/>
                                    <div> {DATA.score.toFixed(1)}  </div>
                                </Card.Description>
                                <Card.Description style={{display:'flex', alignItems:'center'}} onClick={()=>window.open(removeTags(DATA.url), '_blank')}> 
                                    <Icon name='download' color='grey'/>
                                    <div> {DATA.installs} </div>
                                    <Label as='a' basic color='blue' pointing='left' size='small' style={{marginLeft:10}}> 
                                        DOWNLOAD
                                    </Label>
                                </Card.Description>
                            </div>
                        </div>
                    </div>
                </Card.Content>
                <Card.Content id='contents' style={{height:document.body.clientHeight*0.85, overflowX:'hidden', marginRight:-50, paddingRight:50}}>
                    <div style={{display:'flex', flex:1, flexDirection:'column'}}>
                        { DivideLine('tag', 'grey', 'description', 'grey') }
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
                                <div style={{marginBottom: 5, fontSize: 14}}> 
                                    {removeTags(DATA.summary)}
                                    <Label style={{marginLeft:10, marginTop:5}} horizontal> 
                                        {(activeIndex===-1) ? 
                                            <div>
                                                more 
                                                <Icon name='plus' style={{marginLeft:5}}/> 
                                            </div>
                                            : <Icon name='angle double up' style={{marginLeft:5}}/>
                                        }
                                    </Label>
                                </div>
                            </Accordion.Title>
                            <Accordion.Content 
                                active={activeIndex === 0} 
                                style={{overflowX:'hidden', marginRight:-50, paddingRight:50}}
                            >
                                <Tab 
                                    menu={{ secondary: true }}
                                    panes={PANE}
                                    style={{marginLeft:10}}
                                />
                            </Accordion.Content>
                        </Accordion>
                    </div>
                    <div style={{display:'flex', flex:2, flexDirection:'column', paddingBottom:20}} onClick={()=>setActiveIndex(-1)}>
                        { DivideLine('comments', 'grey', 'reviews', 'grey') }
                        <div style={{display:'flex', flexDirection:'column', marginRight:-50, paddingRight:50}}>
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
                                    <div style={{padding:5, lineHeight:1.8}}> 
                                        {i.text} 
                                        <div style={{color:'darkgrey', fontSize:12, textAlign:'right', lineHeight:0.5}}> {i.date.split('T')[0]} </div>
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