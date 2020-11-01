import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  LinearProgress,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { format } from "date-fns";
import ProjectContract from "../../contracts/Project.json";
import EthereumContext from "../../ethereum/ethereumContext";
import firebaseUtils from "../../firebase/firebaseUtils";

const useStyles = makeStyles((theme) => ({
  label: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: theme.spacing(1),
    borderRadius: 4,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  funding: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  amount: {
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
  input: {
    textAlign: "right",
  },
  media: {
    height: 150,
    width: "100%",
  },
  projectDescription: {
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 4,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

export default function ProjectCard(props) {
  const classes = useStyles();
  const [amount, setAmount] = React.useState(0);
  const { web3, account } = React.useContext(EthereumContext);
  const { project } = props;

  const contribute = () => {
    const projectInstance = new web3.eth.Contract(
      ProjectContract.abi,
      project.id
    );

    projectInstance.methods
      .contribute()
      .send({
        from: account,
        value: web3.utils.toWei(amount.toString(), "ether"),
      })
      .then((res) => {
        const newTotal = web3.utils.fromWei(
          res.events.FundingReceived.returnValues.currentTotal,
          "ether"
        );
        firebaseUtils.updateAmount(project.id, newTotal, project.projectGoal);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia>
          <img className={classes.media} src="./idea.svg" alt=""></img>
        </CardMedia>
        <CardContent>
          <div className={classes.titleContainer}>
            <Typography variant="h4" component="h2">
              {project.projectTitle}
            </Typography>
            <div className={classes.label}>{project.state}</div>
            <div className={classes.label}>{project.projectCategory}</div>
          </div>

          <div className={classes.funding}>
            <div style={{ flex: 1 }}>
              {project.state === "Fundraising" && (
                <LinearProgress
                  variant="determinate"
                  value={(project.currentAmount / project.projectGoal) * 100}
                />
              )}
            </div>

            <Typography variant="subtitle2" className={classes.amount}>
              {project.currentAmount} / {project.projectGoal}
            </Typography>
          </div>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Project Deadline:{" "}
            {format(project.projectEndDate.toDate(), "MM/dd/yyyy")}
          </Typography>
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            Project Starter
          </Typography>
          <Typography variant="subtitle2">{project.projectStarter}</Typography>
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            Contract Address
          </Typography>
          <Typography variant="subtitle2">{project.id}</Typography>
          <div className={classes.projectDescription}>
            <Typography variant="body2" color="textSecondary" component="p">
              {project.projectDescription}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      {account.toLowerCase() !== project.projectStarter.toLowerCase() && (
        <CardActions>
          <TextField
            variant="outlined"
            label="in Ether"
            size="small"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginLeft: "auto" }}
          />
          <Button size="small" color="primary" onClick={contribute}>
            Contribute
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
