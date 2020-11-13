import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getUser } from '../actions/UserOperations'
import { withRouter } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper } from '@material-ui/core';
import Login from '../Login/Login';

const useStyles = (theme) => ({
    mainContent: {
        padding: 10
    }
})

class Game extends React.Component {
    state = {
        data: "",
        open: false,
        dataArray: []
    }

    getData () {
        getUser().then(data => {
            if (data.error)                
                {   localStorage.removeItem('jwtToken')
                    return this.setState({dataArray: [], open:true});
        }
            return this.setState({ open: false, dataArray: data });
        })
            .catch(e => {
                console.log(e)
                return this.setState({ data: "Did not get data" })
            })
    }

    componentDidMount() {
        if (localStorage.getItem('jwtToken'))
            this.getData()
        else this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false });        
        if (localStorage.getItem('jwtToken'))
        return this.getData();
    }

    render() {
        const { classes } = this.props;
        const { open, dataArray } = this.state;
        return (
            <center className="App">
                <Paper style={{width: "70%", alignItems: 'center'}}>
                {dataArray && <TableContainer>
                    <Table aria-label="players-info">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No.</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>E-mail id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataArray.map((player, i) => (
                            <TableRow>
                                <TableCell>{i+1}</TableCell>
                                <TableCell>{player.firstName}</TableCell>
                                <TableCell>{player.lastName}</TableCell>                                
                                <TableCell>{player.email}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                }
                </Paper>
                <Login open={open} onClose={this.handleClose} />
            </center >
        )
    }
}

export default withRouter(withStyles(useStyles)(Game));
