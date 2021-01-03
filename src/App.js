import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch } from 'react-router-dom';
import HatsPage from './pages/hatspage/hatspage.component';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: userAuth });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        console.log('---- componentDidMount, userRef', userRef);
        userRef.onSnapshot(snapShot => {
          console.log('---- componentDidMount, snapShot', snapShot.data());

          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, ()=>{
            console.log('---- componentDidMount, this.state', this.state);
          });

        });
      }

      this.setState({currentUser: userAuth}); // userAuth is null
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/hats" component={HatsPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
