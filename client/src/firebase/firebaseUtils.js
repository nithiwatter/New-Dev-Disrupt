import { firebase } from "./config";

const usersRef = firebase.firestore().collection("users");
const projectsRef = firebase.firestore().collection("projects");

const getUserFromFirestore = (uid) => {
  return new Promise((resolve) => {
    usersRef
      .doc(uid)
      .get()
      .then((document) => {
        if (!document.exists) {
          resolve(null);
        }

        const user = document.data();
        resolve(user);
      });
  });
};

const addUserToFirestore = (userData) => {
  const { uid, displayName, email, phoneNumber, photoURL } = userData;

  return new Promise((resolve) => {
    const user = {
      id: uid,
      email: email || "",
      displayName: displayName || "",
      phone: phoneNumber || "",
      profilePictureURL: photoURL || "",
      userID: uid,
    };

    // save this user to the firestore collection
    usersRef
      .doc(uid)
      .set(user)
      .then(() => {
        resolve(user);
      });
  });
};

const addProjectToFirestore = (contractAddress, projectData) => {
  return new Promise(async (resolve) => {
    await projectsRef.doc(contractAddress).set(projectData);
    projectsRef
      .doc(contractAddress)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve({ project: doc.data() });
        }
      });
  });
};

const getProjectsFromFirestore = () => {
  return new Promise((resolve) => {
    projectsRef.get().then((querySnapshot) => {
      const projects = [];
      querySnapshot.forEach(function (doc) {
        projects.push({ id: doc.id, ...doc.data() });
      });
      resolve({ projects });
    });
  });
};

const batchUpdate = (projects, web3, abi) => {
  return new Promise(async (resolve) => {
    for (const project of projects) {
      const projectInstance = new web3.eth.Contract(abi, project);
      const projectData = await projectInstance.methods.getDetails().call();
      console.log(projectData);
      // const doc = await projectsRef.doc(project).get();
      // if (doc.exist) {
      //   await projectsRef.doc(project).update({
      //     projectGoal: web3.utils.fromWei(projectData.goalAmount, "ether"),
      //     currentAmount: web3.utils.fromWei(projectData.currentAmount, "ether"),
      //   });
      // }
    }
    resolve("done");
  });
};

const updateAmount = (project, amount, goal) => {
  if (amount > goal) {
    projectsRef.doc(project).update({ state: "Successful" });
  }
  projectsRef.doc(project).update({ currentAmount: amount });
};

const firebaseUtils = {
  addUserToFirestore,
  getUserFromFirestore,
  addProjectToFirestore,
  getProjectsFromFirestore,
  batchUpdate,
  updateAmount,
};

export default firebaseUtils;
