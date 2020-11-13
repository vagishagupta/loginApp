import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, TextField, InputAdornment } from '@material-ui/core';
import { createUser } from '../actions/UserOperations'
import Login from './Login';
import SnackBar from '../Toolbox/Snackbar'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withRouter } from 'react-router-dom'; 
const useStyles = (theme) => ({
    registration: {
    }
})

class Registration extends React.Component {
    state = {
        open: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        hidePassword: true,
        message: "",
        errorMsg: "",
        openLogin: false
    }
    componentDidMount () {
        if (localStorage.getItem('jwtToken'))
            this.props.history.push('/welcome')
    }
    handleClickOpen = (msg) => {
        this.setState({ open: true, message: msg, openLogin: true })
    };
    handleClose = () => {
        this.setState({ open: false })
    }
    handleLoginClose = () => {
        this.setState({ openLogin: false })
    }
    Onsubmit(e) {
        const { firstName, lastName, email, password } = this.state
        if (firstName === '' || lastName === '' || email === '' || password === '')
            return this.setState({ errorMsg: 'Please enter all the details' })
        createUser(firstName, lastName, email, password).then(data => {
            this.handleClickOpen('User created successfully!');
            return this.setState({ firstName: "", lastName: "", email: "", password: "" });
        }).catch(e => this.setState({ errorMsg: "Unable to create user!" }))
    }
    handleFNChange(e) {
        e.preventDefault()
        this.setState({ firstName: e.target.value })
    }
    handleLNChange(e) {
        e.preventDefault()
        this.setState({ lastName: e.target.value })
    }
    handleEMChange(e) {
        e.preventDefault()
        this.setState({ email: e.target.value })
    }
    handlePSChange(e) {
        e.preventDefault()
        this.setState({ password: e.target.value })
    }
    render() {
        const { classes } = this.props
        const { open, firstName, lastName, email, password, hidePassword, message, errorMsg, openLogin } = this.state
        return (
            <center className={classes.registration}>
                <h3>Create your account</h3>
                {(errorMsg !== '') ? (<div style={{ color: 'red' }}>{errorMsg}</div>) : ''}
                <TextField
                    variant="outlined"
                    type="text"
                    placeholder="First Name"
                    label="First Name"
                    margin="normal"
                    value={firstName}
                    style={{ margin: 10, width: "19%" }}
                    onChange={this.handleFNChange.bind(this)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    placeholder="Last Name"
                    label="Last Name"
                    margin="normal"
                    value={lastName}
                    style={{ margin: 10, width: "19%" }}
                    onChange={this.handleLNChange.bind(this)}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <br />
                <TextField
                    variant="outlined"
                    placeholder="E-mail id"
                    label="E-mail id"
                    margin="normal"
                    value={email}
                    style={{ width: "40%" }}
                    onChange={this.handleEMChange.bind(this)}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <br />
                <TextField
                    variant="outlined"
                    placeholder="Password"
                    label="Password"
                    margin="normal"
                    value={password}
                    style={{ width: "40%" }}
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

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        style={{ margin: 10, padding: "10px 60px" }}
                        onClick={e => this.Onsubmit(e)}
                    >SIGN UP</Button>
                    <Button
                        variant="contained"
                        disableElevation
                        style={{ margin: 10, padding: "10px 60px" }}
                    >CANCEL</Button>
                </div>
                <SnackBar open={open} onClose={this.handleClose} message={message} />
                <Login open={openLogin} onClose={this.handleLoginClose} path='/welcome' />
            </center>
        )
    }
}
export default withRouter(withStyles(useStyles)(Registration));