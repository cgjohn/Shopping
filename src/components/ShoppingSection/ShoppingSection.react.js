import React, { Component } from "react";
import { Button } from "../../bootstrapComponents";
import { db } from "../../firebase/firebase.utils.js";
import AuthContext from "../context/auth-context";

import ShoppingItemCard from "../ShoppingSection/ShoppingItemCard/ShoppingItemCard.react";
import ShoppingItemModal from "./ShoppingItemModal/ShoppingItemModal.react";

import "../section.scss";

export default class ShoppingSection extends Component {
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
      this.getSections("shopping");
    }
  }

  handleMoveItem = item => {
    console.log("move = ", item, "user = ", this.context.id);
    db.collection("users")
      .doc(this.context.id)
      .collection("items")
      .doc(item.id)
      .update({
        expiration: item.expiration,
        area: item.area,
        category: "pantry"
      });
  };

  handleAddItem = (e, item, category) => {
    db.collection("users")
      .doc(this.context.id)
      .collection("items")
      .add({ ...item, category: this.props.category });
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

  handleUpdateItem = (e, item) => {
    db.collection("users")
      .doc(this.context.id)
      .collection("items")
      .doc(item.id)
      .update({
        name: item.name,
        store: item.store,
        quantity: item.quantity
      });
  };

  getSections = category => {
    return db
      .collection("users")
      .doc(this.context.id)
      .collection("items")
      .where("category", "==", "shopping")
      .onSnapshot(snapshot => {
        const sections = new Map();
        snapshot.forEach((doc, i) => {
          const item = { ...doc.data(), id: doc.id };
          if (sections[item.store]) {
            sections[item.store].push(item);
          } else {
            sections[item.store] = [item];
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
    const stores = Object.keys(sections);
    return (
      <div style={{ background: this.props.color }} className="section">
        <h2 className="section__title">{this.props.category}</h2>
        <Button variant="outline-primary" onClick={this.toggleModal}>
          Add Item
        </Button>
        <div className="section__card-container">
          {stores.map(sectionName => (
            <ShoppingItemCard
              sectionName={sectionName}
              sectionItems={sections[sectionName]}
              removeItem={this.handleDeleteItem}
              updateItem={this.handleUpdateItem}
              moveItem={this.handleMoveItem}
              stores={stores}
            />
          ))}
        </div>
        {showModal && (
          <ShoppingItemModal
            toggleModal={this.toggleModal}
            stores={stores}
            item={itemState}
            onSubmit={this.handleAddItem}
          />
        )}
      </div>
    );
  }
}
