import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalStyle from '../gloablstyle';
import { COUNTRY, LANG, MENU } from '../info';
import { Dropdown, Step, Icon, Button, Label, Accordion } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default function Home(){
    const [country, setCountry] = useState(COUNTRY[0].value);
    const [lang, setLang] = useState('ko'); // country처럼 변경
    const [menu, setMenu] = useState('food'); // country처럼 변경
    const [activeIndex, setActiveIndex] = useState(0);
    const _handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }

    return (
        <div>
            <GlobalStyle/>
            <div>
                <Step.Group style={{display:'flex', height:document.body.clientHeight, width:document.body.clientWidth}}>
                    <Step active id='selectCountry'>
                        <Icon name='globe'/>
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={_handleClick}
                            >
                                <Step.Content style={{marginBottom:10}}>
                                    <Step.Title style={{fontSize:'1.5em'}}> COUNTRY </Step.Title>
                                    <Step.Description style={{fontSize:'1.2em'}}> step 1 </Step.Description>
                                </Step.Content>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:10}}>
                                        <Label pointing='right' style={{marginRight:10}} color='blue' id='countryFrom_label'>
                                            from
                                        </Label>
                                        <Dropdown
                                            placeholder={COUNTRY[0].text}
                                            fluid
                                            selection
                                            search
                                            options={COUNTRY}
                                            // onChange={(e, {value}) => setCountry(value)}
                                            onChange={()=>(
                                                document.getElementById('countryFrom_label').classList.remove('blue')
                                                , document.getElementById('countryTo_label').classList.add('blue')
                                                , document.getElementById('countryTo').classList.remove('disabled')
                                            )}
                                        />
                                    </div>
                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <Label pointing='right' style={{marginRight:10}} id='countryTo_label'>
                                            to
                                        </Label>
                                        <Dropdown id='countryTo'
                                            // disabled
                                            placeholder={COUNTRY[0].text}
                                            // fluid
                                            selection
                                            search
                                            options={COUNTRY}
                                            onChange={(e, {value}) => (
                                                setCountry(value)
                                                , document.getElementById('countryTo_label').classList.remove('blue')
                                                , document.getElementById('selectCountry').classList.remove('active')
                                                , document.getElementById('selectCountry').classList.add('completed')
                                                , document.getElementById('selectLanguage').classList.remove('disabled')
                                                , document.getElementById('selectLanguage').classList.add('active')
                                                , setActiveIndex(activeIndex + 1)
                                            )}
                                        />
                                    </div>
                                </div>
                            </Accordion.Content>
                        </Accordion>
                    </Step>
                    <Step disabled id='selectLanguage'>
                        <Icon name='language'/>
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={_handleClick}
                            >
                                <Step.Content style={{marginBottom:10}}>
                                    <Step.Title style={{fontSize:'1.5em'}}> LANGUAGE </Step.Title>
                                    <Step.Description style={{fontSize:'1.2em'}}> step 2 </Step.Description>
                                </Step.Content>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <Dropdown
                                    placeholder={COUNTRY[0].text} // language로 변경
                                    // fluid
                                    selection
                                    search
                                    options={COUNTRY} // language로 변경
                                    onChange={(e, {value}) => (
                                        setLang(value)
                                        , document.getElementById('selectLanguage').classList.remove('active')
                                        , document.getElementById('selectLanguage').classList.add('completed')
                                        , document.getElementById('selectMenu').classList.remove('disabled')
                                        , document.getElementById('selectMenu').classList.add('active')
                                        , setActiveIndex(activeIndex + 1)
                                    )}
                                />
                            </Accordion.Content>
                        </Accordion>
                    </Step>
                    <Step disabled id='selectMenu'>
                        <Icon name='paper plane'/>
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === 2}
                                index={2}
                                onClick={_handleClick}
                            >
                                <Step.Content style={{marginBottom:10}}>
                                    <Step.Title style={{fontSize:'1.5em'}}> TRAVEL </Step.Title>
                                    <Step.Description style={{fontSize:'1.2em'}}> step 3 </Step.Description>
                                </Step.Content>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 2}>
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <Dropdown style={{}}
                                        placeholder={MENU[0].text} // menu 구조 변경
                                        fluid
                                        selection
                                        search
                                        options={MENU} // menu 구조 변경
                                        onChange={(e, {value}) => (
                                            setMenu(value)
                                            , document.getElementById('menu_btn').classList.remove('disabled')
                                            , document.getElementById('menu_btn').removeAttribute('disabled')
                                            , document.getElementById('menu_btn').classList.add('primary')
                                            , document.getElementById('menu_btn').setAttribute('style', 'color: white')
                                            , document.getElementById('menu_icon').setAttribute('style', 'color: white')
                                        )}
                                    />
                                    <Link to={`/${menu}/${country}/${lang}`} style={{marginLeft:10}}>
                                        <Button icon disabled labelPosition='right' id='menu_btn'> 
                                            <Icon name='search' id='menu_icon'/>
                                            search 
                                        </Button>
                                    </Link>
                                </div>
                            </Accordion.Content>
                        </Accordion>
                    </Step>
                </Step.Group>
            </div>
        </div>
    );
}