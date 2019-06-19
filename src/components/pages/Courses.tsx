import * as React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Courses as CoursesT } from "./types/Courses";

import FormDialog from "../Modal";

const q = gql`
  query Courses {
    courses {
      name
      gradeLevel
    }
  }
`;

class CoursesQuery extends Query<CoursesT, null> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  })
);

export const Courses = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <FormDialog />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Grade Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <CoursesQuery query={q}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return data.courses.map(({ name, gradeLevel }) => (
                <TableRow key={name}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {gradeLevel}
                  </TableCell>
                </TableRow>
              ));
            }}
          </CoursesQuery>
        </TableBody>
      </Table>
    </Paper>
  );
};
