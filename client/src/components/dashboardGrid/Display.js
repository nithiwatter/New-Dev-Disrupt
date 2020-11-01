import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Display(props) {
  const classes = useStyles();
  const { projects } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item key={project.id} lg={4} md={6} xs={12}>
            <ProjectCard project={project}></ProjectCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
