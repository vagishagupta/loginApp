import React from 'react';
import { getProfile, logoutUser } from '../actions/UserOperations'
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Login from '../Login/Login';

const useStyles = (theme) => ({
    mainContent: {
        position: "absolute",
        top: "15%",
        left: "20%",
        position: "absolute",
        width: "50%",
    }
})
class Welcome extends React.Component {
    state = {
        open: false,
        errorMsg: '',
        email: '',
        firstName: '',
        lastName: '',
        loggedState: false
    }

    getData() {
        if (localStorage.getItem('jwtToken')) {
            getProfile().then(data => {
                if (data.error) {
                    localStorage.removeItem('jwtToken')
                    return this.setState({ errorMsg: 'You are logged out. Pls login to continue.', loggedState: false, open: true });
                }
                return this.setState({ firstName: data.firstName, lastName: data.lastName, email: data.email, loggedState: true })
            }).catch(e => (e))
        }
    }
    componentDidMount() {
        if (localStorage.getItem('jwtToken')) {
            this.getData()
        }
        else if (!localStorage.getItem('jwtToken'))
            this.setState({ errorMsg: 'Please login', open: true })
    }

    logout() {
        if (localStorage.getItem('jwtToken')) {
            logoutUser().then(data => {
                localStorage.removeItem('jwtToken')
                this.setState({ loggedState: false, errorMsg: 'Please login to view your profile' })
                alert('You have been logged out')
                this.props.history.push('/')
            }).catch(e => console.log(e))
        }
    }

    handleClose = () => {
        this.setState({ open: false });
        if (localStorage.getItem('jwtToken'))
            return this.getData();
    }
    render() {
        const { classes } = this.props;
        const { firstName, lastName, email, errorMsg, loggedState, open } = this.state;
        return (
            <div className={classes.mainContent}>
                {loggedState && <div className={classes.mainContent}>
                    <h2>Welcome {firstName}!</h2>
                    <h3>My Profile</h3>
                    <Grid container>
                        <Grid item xs={6}>
                            Name
                        </Grid>
                        <Grid item xs={6}>
                            <span>{lastName}, {firstName}</span>
                        </Grid>
                        <Grid item xs={6}>
                            E-mail id
                        </Grid>
                        <Grid item xs={6}>
                            {email}
                        </Grid>
                    </Grid>
                    <Button variant="contained"
                        color='Primary'
                        style={{ margin: 20, padding: "8px 60px" }}
                        onClick={e => {
                            this.logout()
                        }}
                    >LOGOUT</Button>
                </div>}
                {errorMsg && !loggedState && <div>{errorMsg}</div>}
                <Login open={open} onClose={this.handleClose} />
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(Welcome));
