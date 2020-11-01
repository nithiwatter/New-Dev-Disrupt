import React from "react";
import { makeStyles } from "@material-ui/core";

import NavBar from "./NavBar";
import FullScreenDialog from "../../components/dialog/FulllScreenDialog";
import CreateProjectStepper from "../../components/dialog/createProjectStepper/CreateProjectStepper";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function MainLayout(props) {
  const { children } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavBar handleClickOpen={handleClickOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <FullScreenDialog
        open={open}
        handleClose={handleClose}
        title="Start your journey here"
      >
        <CreateProjectStepper />
      </FullScreenDialog>
    </div>
  );
}
