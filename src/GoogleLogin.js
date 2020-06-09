import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import CalendarIntegration from './CalendarIntegration'
import FontAwesome from 'react-fontawesome'

export class GLogin extends Component{

    constructor(props) {
        super(props)

        this.state={
           loggedIn:false,
           access_token:'',
           calendarId:''
        }
        this.responseGoogle=this.responseGoogle.bind(this)
    }

    responseGoogle = (response) => {
      console.log("LoggedIn")
      console.log(response)
        this.setState({
            access_token : response.tokenObj.access_token,
            calendarId   : response.profileObj.email,
            loggedIn:true
        })
        console.log(this.state.calendarId)
        console.log(this.state.access_token)
        this.forceUpdate()
    }
    
    logout = () => {
        console.log("Logged Out")
        this.setState({
            access_token : '',
            calendarId   : '',
            loggedIn:false
        })
    }

    render(){
     
        let button
        if(this.state.loggedIn){
            button = <div>
                        <GoogleLogout
                            clientId="443492183069-fboa840bbvj5h8pc4311snf3jscifqem.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.logout}
                        >
                        </GoogleLogout>      
                        <CalendarIntegration  access_token={this.state.access_token} calendarId={this.state.calendarId} />
                    </div>
        }else{
            button = <div>
                             <GoogleLogin 
                                clientId="443492183069-fboa840bbvj5h8pc4311snf3jscifqem.apps.googleusercontent.com"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}     
                                scope={'https://www.googleapis.com/auth/calendar'}
                                isSignedIn={true}
                            >
                                <FontAwesome name='google'/>
                                <span> Login with Google</span>
                           </GoogleLogin> 
                           {/* <CalendarIntegration/> */}
                    </div>
        }
         
        return(
          <div>                
              {button}
          </div>
        )
    }
}

export default GLogin;