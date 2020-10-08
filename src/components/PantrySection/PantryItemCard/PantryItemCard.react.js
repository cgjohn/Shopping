import React, { useState } from "react";
import { Card, ListGroup, Button } from "bootstrapComponents";
import PantryItemModal from "../PantryItemModal/PantryItemModal.react";

import "./pantry-item-card.scss";

const PantryItemCard = ({
  sectionName,
  sectionItems,
  removeItem,
  updateItem
}) => {
  return (
    <Card className="section__card u-pad-2">
      <Card.Title>{sectionName}</Card.Title>
      <Card.Body>
        <ListGroup>
          {sectionItems.map(item => (
            <Item item={item} removeItem={removeItem} updateItem={updateItem} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

const Item = ({ item, removeItem, updateItem }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const expirationString = item.expiration
    ? ` - ${item.expiration.toLocaleDateString("en-US").toString()}`
    : null;
  return (
    <ListGroup.Item className="section__list-item">
      <div className="flex flex-align-end">
        {item.name} {expirationString} -- qty: {item.quantity}
        <div className="quantity-btns">
          <Button
            variant="light"
            onClick={() => updateItem({ ...item, quantity: item.quantity + 1 })}
            className="quantity-btn"
          >
            <i class="icon-up fas fa-sort-up"></i>
          </Button>
          <Button
            className="quantity-btn"
            variant="light"
            onClick={() => updateItem({ ...item, quantity: item.quantity - 1 })}
          >
            <i class="icon-down fas fa-sort-down"></i>
          </Button>
        </div>
      </div>
      <div>
        <Button variant="light" onClick={() => removeItem(item.id)}>
          <i class="far fa-trash-alt"></i>
        </Button>
        <Button className="u-mar-l_2" variant="light" onClick={toggleModal}>
          <i class="far fa-edit"></i>
        </Button>
      </div>
      {showModal && (
        <PantryItemModal
          toggleModal={toggleModal}
          item={item}
          onSubmit={updateItem}
        />
      )}
    </ListGroup.Item>
  );
};

export default PantryItemCard;
