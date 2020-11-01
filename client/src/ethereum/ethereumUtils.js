const getProjects = (crowdfundInstance) => {
  return new Promise((resolve) => {
    crowdfundInstance.methods
      .returnAllProjects()
      .call()
      .then((projects) => {
        resolve({ projects });
      });
  });
};

const createProject = (crowdfundInstance, account, projectData) => {
  return new Promise((resolve) => {
    const {
      projectTitle,
      projectDescription,
      projectCategory,
      projectGoal,
      projectDuration,
    } = projectData;

    crowdfundInstance.methods
      .startProject(
        projectTitle,
        projectDescription,
        projectCategory,
        projectDuration,
        projectGoal
      )
      .send({
        from: account,
      })
      .then(async (res) => {
        console.log("Creating project successfully!");
        const {
          contractAddress,
          projectStarter,
        } = res.events.ProjectStarted.returnValues;
        // this will be used as a key for the firebase firestore project instance
        resolve({ contractAddress, projectStarter });
      })
      .catch(() => resolve({ error: "Please authorize the transaction!" }));
  });
};

export { createProject, getProjects };
