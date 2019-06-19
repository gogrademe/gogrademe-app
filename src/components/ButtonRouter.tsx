import * as React from "react";
import { Route } from "react-router";
import { Link, LinkProps, NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link innerRef={ref as any} {...props} />
);

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
const CollisionLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "innerRef" | "to">
>((props, ref) => (
  <NavLink
    innerRef={ref as any}
    activeClassName="selected"
    to="/people"
    {...props}
  />
));

function ButtonRouter({
  exact,
  label,
  icon,
  to
}: {
  exact?: boolean;
  label: string;
  icon?: JSX.Element;
  to: string;
}) {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => (
        <ListItem
          button
          selected={match !== null}
          component={AdapterLink}
          to={to}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={label} />
        </ListItem>
      )}
    />
  );
}

export default ButtonRouter;

// function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
//     return (
//       <Route
//         path={to}
//         exact={activeOnlyWhenExact}
//         children={({ match }) => (
//           <div className={match ? "active" : ""}>
//             {match ? "> " : ""}
//             <Link to={to}>{label}</Link>
//           </div>
//         )}
//       />
//     );
//   }
