import { Redirect, Route, Switch } from 'react-router-dom'
import Auth from "../views/Auth"
import { useSelector } from 'react-redux';
import Posts from '../views/Posts';
import NotFound from '../views/NotFound';
import Post from '../views/Post';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/posts" />
      </Route>
      <Route path="/auth" component={Auth} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute path="/posts/:postID" component={Post} />
      <Route component={NotFound} />
    </Switch>)
}

export default Routes