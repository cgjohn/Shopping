import React, { Component } from "react";
import ShoppingSection from "../ShoppingSection/ShoppingSection.react";
import PantrySection from "components/PantrySection/PantrySection.react";
import { Button } from "evergreen-ui";
import { signInWithGoogle, signOut } from "../../firebase/firebase.utils";
import AuthContext from "../context/auth-context";

import "./home.scss";

// const data = {
//   shopping: {
//     title: "Shopping List",
//     color: "#ff5e5b",
//     lists: [
//       {
//         name: "Target",
//         items: [
//           {
//             name: "Ranch"
//           }
//         ]
//       },
//       {
//         name: "Trader Joe's",
//         items: [
//           {
//             name: "Taco Seasoning"
//           },
//           {
//             name: "90/10 beef"
//           },
//           {
//             name: "Corn tortillas"
//           },
//           {
//             name: "Guac"
//           }
//         ]
//       }
//     ]
//   }
// groceries: {
//   title: "Groceries",
//   color: "#00cecb",
//   lists: [
//     {
//       name: "Pantry",
//       items: [
//         {
//           name: "Ranch"
//         }
//       ]
//     },
//     {
//       name: "Fridge",
//       items: [
//         {
//           name: "Taco Seasoning"
//         },
//         {
//           name: "90/10 beef"
//         },
//         {
//           name: "Corn tortillas"
//         },
//         {
//           name: "Guac"
//         }
//       ]
//     }
//   ]
// },
// recipes: {
//   title: "Recipes",
//   color: "#ffed66"
// }
// };

export default class Home extends Component {
  static contextType = AuthContext;

  render() {
    const currentUser = this.context;
    const loggedIn = Boolean(currentUser);
    if (!loggedIn) {
      return <Button onClick={signInWithGoogle}>Sign In</Button>;
    }
    return (
      <div id="btsp" className="home">
        <div className="header">
          {!!currentUser && currentUser.displayName}
          <Button onClick={signOut}>Sign Out</Button>
        </div>
        <div className="sections">
          <ShoppingSection category="shopping" color="#ff5e5b" />
          <PantrySection category="pantry" color="#00cecb" />
        </div>
      </div>
    );
  }
}
