import React from "react";
import { useFormikContext } from "formik";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function SubmitButton(props) {
  const classes = useStyles();
  const { handleSubmit } = useFormikContext();
  const { activeStep, steps, handleNext, disabled } = props;

  const onClick = () => {
    if (activeStep !== steps.length - 1) {
      return handleNext();
    } else {
      return handleSubmit();
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      className={classes.button}
    >
      {activeStep === steps.length - 1 ? "Finish" : "Next"}
    </Button>
  );
}
