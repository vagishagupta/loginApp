import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
    mainContent: {
        padding: 100
    }
})

class About extends React.Component {
    state = {
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="App">

                <div className={classes.mainContent}>
                    This application allows users to registeer as new users, login into their accounts and logout from it. The logged in user will receive an  authentication token with which they can access other users information under Game info tab. If the user is not logged in or if his authentication token has expired, the login popup will appear and ask the user to login again.
                {this.dataDisplay}
                </div>
            </div>
        )
    }
}

export default withStyles(useStyles)(About);
