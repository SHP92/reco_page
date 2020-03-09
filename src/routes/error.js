import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Error(){
    return(
        <Modal size='mini' open={true} dimmer='inverted' style={{display:'flex', width:document.body.clientWidth*0.8}}>
            <Modal.Content> Oops! Bad requset :( </Modal.Content>
            <Modal.Actions style={{display:'flex', flexDisplay:'row', justifyContent:'flex-end'}}> 
                <Link to='/' style={{paddingBottom:'1em'}}>
                    <Button primary icon='home' labelPosition='right' content='home'/>
                </Link>
            </Modal.Actions>
        </Modal>
    )
}