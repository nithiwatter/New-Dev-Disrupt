import React, { Component } from "react";
import { CircularProgress, withStyles } from "@material-ui/core";

import CrowdfundingFactoryContract from "../contracts/CrowdfundingFactory.json";
import getWeb3 from "../getWeb3";
import { firebase } from "../firebase/config";
import firebaseUtils from "../firebase/firebaseUtils";
import { openSnackbarExternal } from "../components/notifier/Notifier";

const styles = () => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class LoadingPage extends Component {
  componentDidMount() {
    const {
      setUser,
      setIsReady,
      setWeb3,
      setAccount,
      setCrowdfundInstance,
    } = this.props;
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (response) => {
        if (response) {
          const { uid } = response;
          // access our firestore to get additional information regarding this user
          const user = await firebaseUtils.getUserFromFirestore(uid);
          setUser(user);
        }
        // get web3 and metamask account
        const { web3, account, error } = await getWeb3();
        if (web3) {
          setWeb3(web3);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork =
            CrowdfundingFactoryContract.networks[networkId];
          const crowdfundInstance = new web3.eth.Contract(
            CrowdfundingFactoryContract.abi,
            deployedNetwork && deployedNetwork.address
          );
          setCrowdfundInstance(crowdfundInstance);
        }
        if (account) setAccount(account);
        if (error) openSnackbarExternal({ message: error, severity: "error" });
        setIsReady(true);
      });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <CircularProgress color="primary" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingPage);
