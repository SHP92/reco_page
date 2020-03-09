import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from './page';
import removeTags from '../removeTags';
import GlobalStyle from '../gloablstyle';
import { Card, Image, Divider, Label, Icon, Button} from 'semantic-ui-react';
import { MENU } from '../info';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export default function List() {
    const { menu, country, lang } = useParams();
    const key = Object.keys(MENU).filter(i => MENU[i].value === menu);
    const text = MENU[key].text;
    const icon = MENU[key].icon;

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const GET_LIST = iOS ? 
        gql`
        query {
            AppleGetAppList(country:"${country}", category: "${menu}", collection: "top") {
                appleApp {
                    appId
                    title
                    description
                    icon
                    score
                }
            }
        }
        ` 
        : gql`
        query {
            GoogleGetAppList(language:"${lang}", country:"${country}", category: "${menu}", collection: "top") {
                googleApp {
                    appId
                    title
                    summary
                    icon
                    scoreText
                }
            }
        }
    `
    const { loading, error, data } = useQuery(GET_LIST);
    if (loading) return <Page menu={menu} state={true}/>;
    if (error) return <Page menu={menu} state={false}/>;

    const DATA = iOS ? data.AppleGetAppList.appleApp : data.GoogleGetAppList.googleApp;

    return (
        <div>
            <GlobalStyle /> 
            <Card style={{width:'100%', overflowX:'hidden'}}>
                <Card.Content>
                    <Card.Header style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Link to="/" style={{ textDecoration: 'none', position:'absolute', left:-3, top:-5}}>
                            <Image
                                label={{ 
                                color: 'blue',
                                content: 'HOME',
                                icon: 'home',
                                ribbon: true, 
                                size: 'large'}}
                            />
                        </Link>
                        <Icon name={icon} color='grey'/>
                        {/* <div style={{marginRight:5, marginLeft:3}}> {text.toUpperCase()} </div> */}
                        <Label pointing='left' color='blue' basic> {DATA.length} </Label>
                    </Card.Header>
                </Card.Content>
                <Card.Content style={{height:document.body.clientHeight*0.95, overflowY:'scroll', marginRight:-50, paddingRight:50}}>
                    {DATA.map((i, key) => {
                        return (
                            <div>
                                <Link to={{
                                        pathname: `/${menu}/${country}/${lang}/${i.appId}`
                                    }} 
                                    style={{ 
                                        textDecoration: 'none'
                                        , display: 'flex'
                                        , flexDirection: 'row'
                                        , color: 'black'
                                    }}
                                >
                                    <Contents style={{paddingRight:10}}>
                                        <Card.Header style={{fontWeight:'bold'}}> {removeTags(i.title)} </Card.Header>
                                        <Card.Description style={{color:'darkgray', fontSize:12, paddingTop:7}}> 
                                            {iOS ? `${removeTags(i.description).substring(0,150)}...` : removeTags(i.summary)}
                                        </Card.Description>
                                    </Contents>
                                    <Badge>
                                        <img src={i.icon} alt={i.appId} 
                                            style={{borderRadius:'50%', width:50}}
                                        />
                                        { iOS ? 
                                            <div>
                                                {(key < 3) ?
                                                    <Button labelPosition='right' as='div' size='mini' style={{marginTop:5}}>
                                                        <Button size='mini' basic>
                                                            <Icon name='trophy' color='yellow'/>
                                                        </Button>
                                                        <Label size='mini' pointing='left'>
                                                            {key+1}
                                                        </Label>
                                                    </Button>
                                                    : null
                                                }
                                            </div>
                                            : <Icon name='star' color='yellow' 
                                                style={{fontSize:12, display:'flex', justifyContent:'center', marginTop:5}}
                                            >
                                                <div style={{color:'black'}}> {i.scoreText} </div>
                                            </Icon>
                                        }
                                    </Badge>
                                </Link>
                                <Divider />
                            </div>
                        )
                    })}
                </Card.Content>
            </Card>
        </div>
    );
}

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* border: 1px solid red; */
`;
const Badge = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid blue; */
`;