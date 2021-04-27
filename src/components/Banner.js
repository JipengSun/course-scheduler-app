import React from 'react'
import {Message, Button, Title} from 'rbx';
import firebase from '../shared/firebase'
import  StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const uiConfig = {
    signInFlow:'popup',
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccessWithAuthResult:()=>false
    }
  };

const Welcome = ({user})=>(
  <Message color='info'>
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={()=>firebase.auth().signOut()}>
        Log Out
      </Button>
    </Message.Header>
  </Message>
)

const SignIn = ()=>(
<Message color='info'>
    <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
    />
</Message>
);

const Banner = ( {user,title} ) => (
    <React.Fragment>
      {user? <Welcome user={user}/>:<SignIn/>}
      <Title>{ title || '[loading...]'}</Title>
    </React.Fragment>
  );

export default Banner;