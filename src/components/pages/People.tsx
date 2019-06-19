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
import { People as PeopleT } from "./types/People";

export interface PeopleProps {
  compiler: string;
  framework: string;
}

const q = gql`
  query People {
    people {
      firstName
      lastName
    }
  }
`;

class PeopleQuery extends Query<PeopleT, null> {}

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

export const People = (props: PeopleProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <PeopleQuery query={q}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return data.people.map(({ firstName, lastName }) => (
                <TableRow key={firstName}>
                  <TableCell component="th" scope="row">
                    {firstName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {lastName}
                  </TableCell>
                </TableRow>
              ));
            }}
          </PeopleQuery>
        </TableBody>
      </Table>
    </Paper>
  );
};

// export const People = (props: PeopleProps) => (
//   <PeopleQuery query={q}>
//     {({ loading, error, data }) => {
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error :(</p>;

//       return data.people.map(({ firstName, lastName }) => (
//         <div key={firstName}>
//           <p>
//             {firstName}: {lastName}
//           </p>
//         </div>
//       ));
//     }}
//   </PeopleQuery>
// );
