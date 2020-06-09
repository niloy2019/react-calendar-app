import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import CalendarIntegration from './CalendarIntegration'
import FontAwesome from 'react-fontawesome'
import   './GoogleLogin.css'
import Calendar from './Calender'

export class GLogin extends Component{

    constructor(props) {
        super(props)

        this.state={
           loggedIn:false,
           access_token:'',
           calendarId:'',
           name:'',
           imageUrl:''
        }
        this.responseGoogle=this.responseGoogle.bind(this)
    }

    responseGoogle = (response) => {
      console.log("LoggedIn")
      console.log(response)
        this.setState({
            access_token : response.tokenObj.access_token,
            calendarId   : response.profileObj.email,
            loggedIn:true,
            name : response.profileObj.email,
            imageUrl:response.profileObj.imageUrl
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
            button = <div  >
                        <table>
                            <tr>
                                <td className="t">
                                    <GoogleLogout
                                        clientId="443492183069-fboa840bbvj5h8pc4311snf3jscifqem.apps.googleusercontent.com"
                                        buttonText="Logout"
                                        onLogoutSuccess={this.logout}
                                    >
                                    </GoogleLogout>
                                </td>
                                <td className="r">
                                     <h4 className="email"> {this.state.name}</h4> 
                                </td>
                                <td className="x">
                                    <img src={this.state.imageUrl} alt={this.state.imageUrl} className="image" />    
                                </td>
                            </tr>
                        </table>
                        <CalendarIntegration  access_token={this.state.access_token} calendarId={this.state.calendarId} />
                    </div>
        }else{
            button = <div >
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
                           <Calendar/>
                    </div>
        }
         
        return(
          <div  className="g" >                
              {button}
          </div>
        )
    }
}

export default GLogin;