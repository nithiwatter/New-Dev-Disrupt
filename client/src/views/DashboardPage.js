import React, { Component } from "react";
import { CircularProgress, withStyles } from "@material-ui/core";

import ProjectContract from "../contracts/Project.json";
import firebaseUtils from "../firebase/firebaseUtils";
import EthereumContext from "../ethereum/ethereumContext";
import { getProjects } from "../ethereum/ethereumUtils";
import Display from "../components/dashboardGrid/Display";

const styles = (theme) => ({
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
});

class DashboardPage extends Component {
  static contextType = EthereumContext;
  state = { projects: [], loading: true };

  async componentDidMount() {
    const { web3, crowdfundInstance } = this.context;
    const { projects } = await getProjects(crowdfundInstance);
    // sync all projects together (a hack)
    await firebaseUtils.batchUpdate(projects, web3, ProjectContract.abi);
    const {
      projects: firebaseProjects,
    } = await firebaseUtils.getProjectsFromFirestore();

    this.setState({ projects: firebaseProjects, loading: false });
  }

  render() {
    const { projects, loading } = this.state;
    const { classes } = this.props;

    if (loading)
      return (
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
      );
    return (
      <div>
        <Display projects={projects} />
      </div>
    );
  }
}

export default withStyles(styles)(DashboardPage);
