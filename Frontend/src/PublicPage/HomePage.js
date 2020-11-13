import React, { useState } from 'react';
import Login from '../Login/Login';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    mainContent: {
        color: "white"
    },
    buttons: {
      padding: "20px",
      width:"60%", 
      fontSize: 16, 
      backgroundColor: "#eedde3"
    }
}))

function HomePage() {
  const history = useHistory();
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  }
  return (
<center className={classes.mainContent}>
  <h1 >Welcome to User Login and Authentication POC!</h1>
  <Grid container style={{width:"80%", margin: 80}}>
    <Grid item xs={12} md = {6}>
      <Button
      variant="contained"
      className={classes.buttons}
      onClick={e => handleClickOpen()}
      >
        LOGIN
      </Button>
    </Grid>
    <Grid item xs={12} md = {6}>
      <Button
      variant="contained"
      className={classes.buttons}
      onClick={e => history.push('/Registration')}
      >
        REGISTER
      </Button>
    </Grid>
  </Grid>  
  <Login open={open} onClose={handleClose} path='/welcome' />
</center>
  )} 

  export default HomePage