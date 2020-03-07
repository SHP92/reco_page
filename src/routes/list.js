import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from './page';
import removeTags from '../removeTags';
import GlobalStyle from '../gloablstyle';
import { Card, Image, Divider, Label, Icon} from 'semantic-ui-react';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export default function List() {
    const { menu, country, lang } = useParams();
    const GET_LIST = gql`
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

    const DATA = data.GoogleGetAppList.googleApp;

    return (
        <div>
            <GlobalStyle /> 
            <Card style={{width:'100%'}}>
                <Card.Content>
                    <Card.Header style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Link to="/" style={{ textDecoration: 'none', position:'absolute', left:-3, top:-5}}>
                            <Image
                                label={{ 
                                color: 'teal',
                                content: 'HOME',
                                icon: 'home',
                                ribbon: true, 
                                size: 'large'}}
                            />
                        </Link>
                        <Icon name={menu} color='grey'/>
                        <div style={{marginRight:5, marginLeft:5}}> {menu.toUpperCase()} </div>
                        <Label pointing='left' color='teal' basic> {DATA.length} </Label>
                    </Card.Header>
                </Card.Content>
                <Card.Content style={{height:document.body.clientHeight*0.95, overflowY:'scroll'}}>
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
                                            {removeTags(i.summary)}
                                        </Card.Description>
                                    </Contents>
                                    <Badge>
                                        <img src={i.icon} alt={i.appId} 
                                            style={{borderRadius:'50%', width:50}}
                                        />
                                        <Icon name='star' color='yellow' 
                                            style={{fontSize:12, display:'flex', justifyContent:'center', marginTop:5}}
                                        >
                                            <div style={{color:'black'}}> {i.scoreText} </div>
                                        </Icon>
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