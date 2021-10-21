import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Comic from '../features/comics/Comic';
import ComicsList from '../features/comics/ComicsList';
import Navbar from './Navbar';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/comics" component={ComicsList}/>
          <Route exac path="/comics/:comicId" component={Comic}/>
          <Redirect to="/comics"/>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
