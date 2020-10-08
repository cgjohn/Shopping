import React, { Component } from "react";
import { Button, Card, ListGroup } from "../../bootstrapComponents";
import { db } from "../../firebase/firebase.utils.js";
import AuthContext from "../context/auth-context";

import PantryItemCard from "./PantryItemCard/PantryItemCard.react";
import PantryItemModal from "./PantryItemModal/PantryItemModal.react";

import "../section.scss";

export default class PantrySection extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      storeFilter: "",
      sections: undefined,
      showModal: false,
      itemState: {
        name: "",
        quantity: 1,
        store: ""
      }
    };
  }

  componentDidMount() {
    if (!this.state.sections) {
      this.getSections();
    }
  }

  handleAddItem = (e, item) => {
    console.log("adding item = ", item);
    db.collection("users")
      .doc(this.context.id)
      .collection("items")
      .add({ ...item, category: "pantry" });
    this.setState(state => ({
      itemState: {
        name: "",
        quantity: 1,
        store: ""
      }
    }));
  };

  handleDeleteItem = id => {
    db.collection("users")
      .doc(this.context.id)
      .collection("items")
      .doc(id)
      .delete()
      .catch(err => {
        console.warn("socmething went wrong, ", err);
      });
  };

  handleUpdateItem = item => {
    db.collection("users")
      .doc(this.context.id)
      .collection("items")
      .doc(item.id)
      .update({
        ...item
      });
  };

  getSections = () => {
    return db
      .collection("users")
      .doc(this.context.id)
      .collection("items")
      .where("category", "==", "pantry")
      .onSnapshot(snapshot => {
        const sections = new Map();
        snapshot.forEach((doc, i) => {
          console.log(doc.data());
          const itemExpiration = doc.data().expiration
            ? doc.data().expiration.toDate()
            : "";
          const item = {
            ...doc.data(),
            id: doc.id,
            expiration: itemExpiration
          };
          const normalizedStorage = item.storage.toLowerCase();
          if (sections[normalizedStorage]) {
            sections[normalizedStorage].push(item);
          } else {
            sections[normalizedStorage] = [item];
          }
        });
        this.setState({ sections: sections });
      });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal
    }));
  };

  render() {
    const { sections, itemState, showModal } = this.state;

    if (!this.context) {
      return <div>loading...</div>;
    }

    if (!sections) {
      return <div>loading items...</div>;
    }
    return (
      <div style={{ background: this.props.color }} className="section">
        <h2 className="section__title">{this.props.category}</h2>
        <Button variant="outline-primary" onClick={this.toggleModal}>
          Add Item
        </Button>
        <div className="section__card-container">
          {Object.keys(sections).map(sectionName => (
            <PantryItemCard
              sectionName={sectionName}
              sectionItems={sections[sectionName]}
              removeItem={this.handleDeleteItem}
              updateItem={this.handleUpdateItem}
            />
          ))}
        </div>
        {showModal && (
          <PantryItemModal
            toggleModal={this.toggleModal}
            item={itemState}
            onSubmit={this.handleAddItem}
          />
        )}
      </div>
    );
  }
}
