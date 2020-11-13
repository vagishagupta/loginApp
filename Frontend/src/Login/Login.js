import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, Button, DialogContent, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/UserOperations';
import { withRouter } from 'react-router-dom';

const useStyles = (theme) => {

}

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        hidePassword: true,
        errorMsg: ""
    }
    redirectProfile(path) {
        this.props.history.push(path);
    }
    handleClose = () => {
        this.props.onClose();
        this.setState({ email: "", password: "", errorMsg: "" })
    };
    handleItemClick = (value) => {
        this.props.onClose(value);
    };
    handleEMChange = (e) => {
        e.preventDefault()
        this.setState({ email: e.target.value, error: '' })
    }
    handlePSChange = (e) => {
        e.preventDefault()
        this.setState({ password: e.target.value, error: '' })
    }
    handleReturnData = (data) => {
        return this.props.handleLoginName(data)
    }
    onSubmit = () => {
        const { email, password } = this.state
        if (email === '' || password === '')
            return this.setState({ errorMsg: 'Please enter email id and password' })
        loginUser(email, password).then((data) => {
            this.setState({ errorMsg: "" })
            this.handleClose();
        }).catch(e => { this.setState({ errorMsg: 'Unable to Login!' }) })
    }
    render() {
        const { open, path } = this.props;
        const { email, password, hidePassword, errorMsg } = this.state;
        return (
            <React.Fragment>
        {localStorage.getItem('jwtToken') && open && path? 
            this.redirectProfile(path) : (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">User Login</DialogTitle>
                <DialogContent>
                    {(errorMsg !== '') ? (<div style={{ color: 'red' }}>{errorMsg}</div>) : ''}
                    <TextField
                        id="username"
                        variant="outlined"
                        placeholder="Username"
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={this.handleEMChange.bind(this)}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        id='password'
                        variant="outlined"
                        placeholder="Password"
                        label="Password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={this.handlePSChange.bind(this)}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                  <IconButton onClick={e => this.setState({hidePassword: !hidePassword})}>
                                {hidePassword? <Visibility />: <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        inputProps={hidePassword?({
                            type: 'password'
                        }): {type: 'text'}}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <center>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            style={{ margin: 10, padding: "5px 60px" }}
                            onClick={e => { this.onSubmit() }}
                        >LOGIN</Button>
                        <Button
                            variant="contained"
                            disableElevation
                            style={{ margin: 10, padding: "5px 60px" }}
                            onClick={e => {
                                this.handleClose()
                            }}
                        >CANCEL</Button><br />

                        <Link to='/Registration' onClick={e => this.handleClose()}>New User? Create an account</Link>
                    </center>
                </DialogContent>
            </Dialog>)}
            </React.Fragment>
                        );
    }
}

export default withRouter(withStyles(useStyles)(Login));
