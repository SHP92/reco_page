import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Page from './page';
import removeTags from '../removeTags';
import GlobalStyle from '../gloablstyle';
import InfiniteScroll from "react-infinite-scroll-component";

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

export default function List() {
    const { menu, country, lang } = useParams();
    const GET_LIST = gql`
        query {
            GoogleGetApp(myLanguage:"${lang}", searchCountry:"${country}", category: "${menu}") {
                googleApp {
                    appId
                    title
                    summary
                    icon
                    scoreText
                    reviews
                }
            }
        }
    `
    const PAGE_ITEMS = 10;
    const [items, setItems] = useState(Array.from({ length: PAGE_ITEMS }));
    const [hasMore, setHasMore] = useState(true);

    const { loading, error, data } = useQuery(GET_LIST);
    if (loading) return <Page menu={menu} state={true}/>;
    if (error) return <Page menu={menu} state={false}/>;

    const DATA = data.GoogleGetApp.googleApp;
    const fetchMoreData = () => {
        if (DATA.length <= items.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems(items.concat(Array.from({ length: PAGE_ITEMS })));
        }, 1000);
    };

    return (
        <div>
            <GlobalStyle />
            <Header> 
                {menu.toUpperCase()} 
                <Link to="/" style={{ textDecoration: 'none' }}/> 
            </Header>
            <Body>
                <InsideBody>
                    <InfiniteScroll
                        dataLength={items.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={<b>Yay! You have seen it all</b>}
                    >
                        {DATA.map((i, key) => {
                            if (key < items.length) {
                                return (
                                    <Card title={i.title} key={i.appId}>
                                        <Block to={{
                                            pathname: `/${menu}/${country}/${lang}/${i.appId}`
                                        }} style={{ textDecoration: 'none' }}>
                                            <Contents>
                                                <Title> {removeTags(i.title)} </Title>
                                                <Summary> {removeTags(i.summary)} </Summary>
                                            </Contents>
                                            <Badge>
                                                <Icon src={i.icon} alt={i.appId}/>
                                                <Score> {`⭐️${i.scoreText}`} </Score>
                                            </Badge>
                                        </Block>
                                    </Card>
                                )
                            }
                        })}
                    </InfiniteScroll>
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
    overflow-y: scroll;
    height: 75vh;
    /* border: 1px solid black; */
`;
const Card = styled.div`
    display: flex;
    height: 12vh;
    border-bottom: 1px solid lightgray;
    /* border: 1px solid red; */
`;
const Block = styled(Link)`
    display: flex;
    flex-direction: row;
    padding: 0.6em;
    width: 100%;
    /* border: 1px solid blue; */
    overflow: hidden;
`;
const Contents = styled.span`
    display: flex;
    flex-direction: column;
    width: 80%;
    overflow-y: hidden;
    /* border: 1px solid black; */
`;
const Title = styled.span`
    margin-bottom: 0.5em;
    font-weight: bold;
    color: black;
`;
const Summary = styled.div`
    font-size: 0.8em;
    color: darkgray;
`;
const Badge = styled.span`
    display: flex;
    width: 20%;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid black; */
`;
const Score = styled.span`
    display: flex;
    font-size: 0.95em;
`;
const Icon = styled.img`
    display: flex;
    border-radius: 50%;
    width: 6vh; height: 6vh;
    margin-bottom: 0.3em;
`;