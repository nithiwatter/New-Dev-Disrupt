import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import AuthContext from "./auth/context";
import EthereumContext from "./ethereum/ethereumContext";
import theme from "./theme";
import Routes from "./Routes";
import Notifier from "./components/notifier/Notifier";
import LoadingPage from "./views/LoadingPage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isReady: false,
      web3: null,
      account: null,
      crowdfundInstance: null,
    };
    this.setUser = this.setUser.bind(this);
    this.setIsReady = this.setIsReady.bind(this);
    this.setWeb3 = this.setWeb3.bind(this);
    this.setAccount = this.setAccount.bind(this);
    this.setCrowdfundInstance = this.setCrowdfundInstance.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }

  setIsReady(isReady) {
    this.setState({ isReady });
  }

  setWeb3(web3) {
    this.setState({ web3 });
  }

  setAccount(account) {
    this.setState({ account });
  }

  setCrowdfundInstance(crowdfundInstance) {
    this.setState({ crowdfundInstance });
  }

  render() {
    const { user, isReady, web3, account, crowdfundInstance } = this.state;

    return (
      <div>
        <AuthContext.Provider value={{ user, setUser: this.setUser }}>
          <EthereumContext.Provider
            value={{ web3, account, crowdfundInstance }}
          >
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {isReady ? (
                  <Router>
                    <Routes />
                  </Router>
                ) : (
                  <LoadingPage
                    setUser={this.setUser}
                    setIsReady={this.setIsReady}
                    setWeb3={this.setWeb3}
                    setAccount={this.setAccount}
                    setCrowdfundInstance={this.setCrowdfundInstance}
                  />
                )}
              </MuiPickersUtilsProvider>
              <Notifier />
            </ThemeProvider>
          </EthereumContext.Provider>
        </AuthContext.Provider>
      </div>
    );
  }
}
