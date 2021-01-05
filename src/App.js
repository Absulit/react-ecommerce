import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import HatsPage from './pages/hatspage/hatspage.component';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  /*constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }*/

  /*
  // setState example with state and props in anonymous function
  handleClick = () => {
    this.setState((state, props) => {
      console.log(state, props);
      return { meaningOfLife: state.meaningOfLife + props.increment }
    }, () => console.log(this.state.meaningOfLife));

  }
  */
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: userAuth });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        console.log('---- componentDidMount, userRef', userRef);
        userRef.onSnapshot(snapShot => {
          console.log('---- componentDidMount, snapShot', snapShot.data());

          /*this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {
            console.log('---- componentDidMount, this.state', this.state);
          });*/

          //this.props.setCurrentUser({
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });

        });
      }

      //this.setState({ currentUser: userAuth }); // userAuth is null
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log('---- App.js, this.props.currentUser', this.props.currentUser);
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/hats" component={HatsPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    currentUser: state.user.currentUser
  }
)

const mapDispatchToProps = (dispatch) => {
  return (
    {
      setCurrentUser: (user) => dispatch(setCurrentUser(user))
    }
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
