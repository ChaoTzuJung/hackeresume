import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from '../../store';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/auth';
import { clearCurrentProfile } from '../../actions/profile';

import Navbar from '../../layouts/Navbar';
import Landing from '../../layouts/Landing';
import Footer from '../../layouts/Footer';

import Register from '../Register';
import Login from '../Login';
import Dashboard from '../Dashboard';
import PrivateRoute from '../Private'; // 防止為登入就進入dashboard
import CreateProfile from '../CreateProfile';
import EditProfile from '../EditProfile';
import AddExperience from '../AddExperience';
import AddEducation from '../AddEducation';
import Profiles from '../Profiles';
import Profile from '../Profile';
import Posts from '../Posts';
import Comment from '../Comment';
import NotFound from '../NotFound';

import './App.css';

// 為了讓換頁或重整都有保存登入資料，而且當直接開啟首頁不用再登入，因為token還沒過期
// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and explanation
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenicated
  store.dispatch(setCurrentUser(decoded));

  // Check for expire token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login (來自原生js的處理，手動地址跳轉)
    window.location.href = '/login';
  }
}
// Private Route 都要被 Switch 包著？ 解決 一些奇怪的 Redirct issue
// 其中 Switch 表示只會顯示第一個符合條件的 PrivateRoute 組件喔！
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <section className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            {/* 重要: 當route 有 id時 */}
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/comment/:id" component={Comment} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;