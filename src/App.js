import React from "react";
import Home from "./components/Home/Home.react.js";
import "./App.scss";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import AuthContext from "./components/context/auth-context";
import SnapshotState from "jest-snapshot/build/State";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubScribeFromAuth = auth.onAuthStateChanged(async user => {
      const userRef = await createUserProfileDocument(user);
      if (userRef) {
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubScribeFromAuth();
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.currentUser}>
        <Home />
      </AuthContext.Provider>
    );
  }
}

export default App;
