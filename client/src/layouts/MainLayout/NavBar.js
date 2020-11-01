import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  InputBase,
  fade,
  makeStyles,
} from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import AuthContext from "../../auth/context";
import { firebase } from "../../firebase/config";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  itemsContainer: {
    display: "flex",
    alignItems: "center",
  },
  exploreIcon: {
    marginRight: theme.spacing(2),
  },
  addIcon: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavBar(props) {
  const { handleClickOpen } = props;
  const classes = useStyles();
  const { user, setUser } = React.useContext(AuthContext);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  const userAvatar = (user) => {
    if (!user.profilePictureURL) {
      return (
        <Avatar className={classes.avatar}>
          {user.displayName[0].toUpperCase()}
        </Avatar>
      );
    }
    return <Avatar alt="" src={user.profilePictureURL} />;
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.itemsContainer}>
            <IconButton
              edge="start"
              className={classes.exploreIcon}
              color="inherit"
            >
              <ExploreIcon />
            </IconButton>
            <Typography variant="h6">Start a project</Typography>
            <IconButton
              color="inherit"
              className={classes.addIcon}
              onClick={handleClickOpen}
            >
              <AddIcon />
            </IconButton>
          </div>

          <Typography variant="h6" className={classes.title} align="center">
            Crypto-Kickstarter
          </Typography>

          <div className={classes.itemsContainer}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            {user ? (
              userAvatar(user)
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
            {user && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
