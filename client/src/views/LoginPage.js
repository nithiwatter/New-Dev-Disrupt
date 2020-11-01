import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import AuthContext from "../auth/context";
import { firebase } from "../firebase/config";
import firebaseUtils from "../firebase/firebaseUtils";

const styles = () => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class LogInPage extends Component {
  static contextType = AuthContext;

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    const { setUser } = this.context;
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        // handle first entering the page (when the user is still null)
        if (!user) return;
        // check if the user exists in firestore
        const existingUser = await firebaseUtils.getUserFromFirestore(user.uid);
        if (!existingUser) {
          const { uid, email, displayName, phoneNumber, photoURL } = user;

          const userData = {
            uid,
            email,
            displayName,
            phoneNumber,
            photoURL,
          };

          const firestoreUser = await firebaseUtils.addUserToFirestore(
            userData
          );
          setUser(firestoreUser);
        } else {
          setUser(existingUser);
        }
      });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LogInPage);
