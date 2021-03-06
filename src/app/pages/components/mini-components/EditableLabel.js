import React from 'react';
import { getUserData, getUserModules, patchUserData } from '../../../utils/users-api';
import { Flash } from './Flash';
import { Spinner } from './Spinner';
import { MiniSpinner } from './MiniSpinner';

export class EditableLabel extends React.Component {
    constructor(props) {
        super();
        this.state = {
            editing: false,
            text: '',
            username: '',
            email: '',
            modules: [],
            error: '',
            status: '',
            btnStatus: 'success'

        }

        this.labelClicked = this.labelClicked.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.inputLostFocus = this.inputLostFocus.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    labelClicked() {
        this.setState({
            editing: true
        })
    }

    textChanged() {
        this.setState({
            text: this.refs.textInput.value
        })
    }

    inputLostFocus() {
        this.setState({
            editing: false
        })
    }

    inputFocus() {
        this.setState({
            editing: true
        })
    }
    
    keyPressed(event) {
        if(event.key == 'Enter') {
            this.inputLostFocus();
            this.handleUpdate();
        }
    }

    handleUpdate() {
        var data = this.props.text;
        this.setState({
            btnStatus: 'loading'
        })
        var newData = this.refs.textInput.value;
        if(data === "username" || data === "email") {
            patchUserData(data, newData)
                .then((response) => {
                    if(response.success === true) {
                        this.setState({
                            status: "'" + data + "' has been successfully changed to '" + newData + "'."
                        })
                        console.log(this.state.status);
                        window.location.reload();
                    } else if(response.success === false) {
                        console.log(response);
                        this.setState({
                            error: response[0].error
                        })
                    } else {
                        console.log(response[0].error);
                        this.setState({
                            error: response[0].error
                        })
                    }
                }).catch((error) => {
                    console.log("Update Error!");
                    this.setState({
                        error: "Update Error!"
                    })
                })
        } else {
            console.log("No props passed to EditableText!");
        }
    }

    componentDidMount() {
        if(this.props.text === "username") {
            getUserData()
                .then((response) => {
                    var uname = response.username;
                    var email= response.email;
                    this.setState({
                        username: uname,
                        text: uname
                    })
                })
        } else if(this.props.text === "email") {
            getUserData()
                .then((response) => {
                    var uname = response.username;
                    var email= response.email;
                    this.setState({
                        email: email,
                        text: email
                    })
                })
        }
        
        this.labelClicked;
        this.textChanged;
        this.inputLostFocus;
        this.inputFocus;
        this.keyPressed;
        this.handleUpdate;
    }


    render() {
        var { text, btnStatus } = this.state;
        if(this.state.editing)
            return <div className="modules"><input 
            ref='textInput'
            type='text'
            onChange={this.textChanged}
            onKeyPress={this.keyPressed}
            value={this.state.text}
            autoFocus
            /> 
            {
                (btnStatus == "loading") ? <MiniSpinner /> :
                    <button 
                    type="submit"
                    className="badge badge-primary"
                    onClick={this.handleUpdate}
                    >Update
                    </button>
            }
            <button
            type="reset"
            className="badge red badge-danger margin-left"
            onClick={this.inputLostFocus}
            >Cancel
            </button>
            </div>;
            
            return <div onClick={this.labelClicked} >{ text }
                {(this.state.error == '')? '' : <Flash type={(this.state.error === "")? "success" : "danger"} name={(this.state.error === "")? "Success" : "Error"} content={this.state.error}/>}
                {(this.state.status == '')? '' : <Flash type="success" name="Success" content={this.state.status}/>}
            </div>;
    }
}