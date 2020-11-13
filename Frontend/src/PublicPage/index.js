import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  navBar: {
    padding: "10px",
    display: "inline-block"
  },
  navOptions: {
    color: "white",
    padding: "10px",
    display: "inline-block",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",    
    "&:hover": {
      backgroundColor: "#dbf0f9",
      opacity: 0.9,
      color: "white"
    }
  },
  sticky: {
    textAlign: "center",
    position: "sticky",
    margin: 0,
  },
  profile: {
    verticalAlign: "middle",
    paddingLeft: 20
  },
}))

function Home() {
  const classes = useStyles();

  return (
    <div>
      <ul className={classes.sticky}>
        <Link to='/'><li className={classes.navOptions}>Home</li></Link>
        <Link to='/about'><li className={classes.navOptions}>About Us</li></Link>
        <Link to='/gameinfo'><li className={classes.navOptions}>Game Info</li></Link>
        <Link to='/welcome'><li className={`${classes.navOptions} ${classes.profile}`}><AccountCircleIcon /></li></Link>
      </ul>
    </div>
  )
}

export default Home;