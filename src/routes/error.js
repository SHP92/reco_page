import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Error(){
    const [img, setImg] = useState(process.env.PUBLIC_URL);

    return(
        <Container>
            <Img>
                <img src={`${img}images/error.png`} style={{ width:200, height: 200}}/>
            </Img>
            <Button to="/" style={{ textDecoration: 'none' }}> 
                <Text> HOME </Text> 
            </Button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Img = styled.span`
    display: flex;
`;
const Button = styled(Link)`
    display: flex;
    margin-top: 3em;
    justify-content: center;
    padding: 0.5em;
    width: 100%;
    border: 5px solid #F79109
`;
const Text = styled.div`
    display: flex;
    font-size: 1.5em;
    font-weight: bold;
    color: #F79109;
`;