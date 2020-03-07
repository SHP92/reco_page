import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalStyle from '../gloablstyle';
import { COUNTRY, LANG } from '../info';
import { Dropdown, Step, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const MENU = ['translate', 'wifi', 'map', 'food', 'hotel', 'travel'];

export default function Home(){
    const [country, setCountry] = useState(COUNTRY[0].value);
    const [lang, setLang] = useState('ko'); // country처럼 변경
    const [menu, setMenu] = useState('food'); // country처럼 변경

    return (
        <div>
            <GlobalStyle/>
            <div>
                <Step.Group style={{display:'flex'}}>
                    <Step active>
                        <Icon name='globe'/>
                        <Step.Content style={{marginBottom:10}}>
                            <Step.Title> COUNTRY </Step.Title>
                            <Step.Description> step 1 </Step.Description>
                        </Step.Content>
                        <Dropdown
                            placeholder={COUNTRY[0].text}
                            fluid
                            selection
                            search
                            options={COUNTRY}
                            onChange={(e, {value}) => setCountry(value)}
                        />
                    </Step>
                    <Step disabled>
                        <Icon name='language'/>
                        <Step.Content style={{marginBottom:10}}>
                            <Step.Title> LANGUAGE </Step.Title>
                            <Step.Description> step 2 </Step.Description>
                        </Step.Content>
                        <Dropdown
                            placeholder={COUNTRY[0].text} // language로 변경
                            fluid
                            selection
                            search
                            options={COUNTRY} // language로 변경
                            onChange={(e, {value}) => setLang(value)}
                        />
                    </Step>
                    <Step disabled>
                        <Icon name='paper plane'/>
                        <Step.Content style={{marginBottom:10}}>
                            <Step.Title> ??? </Step.Title>
                            <Step.Description> step3 </Step.Description>
                        </Step.Content>
                        <Dropdown
                            placeholder={COUNTRY[0].text} // menu 구조 변경
                            fluid
                            selection
                            search
                            options={COUNTRY} // menu 구조 변경
                            onChange={(e, {value}) => setMenu(value)}
                        />
                    </Step>
                </Step.Group>
                <Link to={`/${menu}/${country}/${lang}`}>
                    test
                </Link>
            </div>
        </div>
    );
}