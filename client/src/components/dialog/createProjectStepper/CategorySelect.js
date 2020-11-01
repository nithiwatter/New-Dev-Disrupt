import React from "react";
import { Field } from "formik";
import {
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { Select } from "formik-material-ui";

const useStyles = makeStyles(() => ({
  mySelect: {
    minWidth: 300,
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));

const categories = [
  "Art",
  "Comics",
  "Crafts",
  "Dance",
  "Design",
  "Fashion",
  "Film & Video",
  "Food",
  "Games",
  "Journalism",
  "Music",
  "Photography",
  "Publishing",
  "Technology",
  "Theater",
];

export default function CategorySelect() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControl>
        <InputLabel htmlFor="category-simple">Project Category</InputLabel>
        <Field
          component={Select}
          name="projectCategory"
          inputProps={{
            id: "category-simple",
          }}
          className={classes.mySelect}
        >
          {categories.map((category) => (
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
    </div>
  );
}
