import React from 'react';
import { Link } from 'react-router';
import { registerUser } from '../utils/users-api';
import { browserHistory } from 'react-router';
import { Flash } from './components/mini-components/Flash';

export class Register extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(event) {
        event.preventDefault();
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        registerUser(username, email, password)
<<<<<<< HEAD
            .then((response) => {
                console.log(response.username + ", has been Registered Successfully!");
                browserHistory.push("/dashboard");
            }).catch((error) => {
                return error;
                console.log(error);
=======
            .then((registerInfo) => {
                console.log(registerInfo.username + ", has been Registered Successfully!");
                browserHistory.push("/dashboard");
            }).catch((error) => {
                return error;
>>>>>>> 8c9b9fced4ba2c0e262cffdcbd25356aa9e131e7
            })
    }

    render() {
        return(
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <center><h2>Register</h2></center>
                    {/* <Flash type="danger" content="User not Registered!"/> */}
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form>
                                <div className="form margin-large-top text-center">
                                    <div className="form-group">
                                        <input type="text" ref="username" className="form-control" id="inputUsername"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" ref="email" className="form-control" id="inputEmail"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword"/>
                                    </div>
                                    <div className="margin-large-top">
                                        <a type="submit" className="btn btn-default margin-top" onClick={this.handleRegister}>Register</a>
                                        <Link to={"/login"} type="button" className="btn btn-default margin-top margin-left">Login</Link>
                                    </div>
                                </div>
                            </form>    
                        </div>    
                    </div> 
                </div>
            </div>
        );
    }
}