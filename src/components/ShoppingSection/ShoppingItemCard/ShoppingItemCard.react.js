import React, { useState } from "react";
import { Card, ListGroup, Button } from "bootstrapComponents";
import ShoppingItemModal from "../ShoppingItemModal/ShoppingItemModal.react";
import MoveItemModal from "../MoveItemModal/MoveItemModal.react";

const ShoppingItemCard = ({
  sectionName,
  sectionItems,
  removeItem,
  updateItem,
  moveItem,
  stores
}) => {
  return (
    <Card className="shopping-section__card u-pad-2">
      <Card.Title>{sectionName}</Card.Title>
      <Card.Body>
        <ListGroup>
          {sectionItems.map(item => (
            <Item
              item={item}
              removeItem={removeItem}
              updateItem={updateItem}
              moveItem={moveItem}
              stores={stores}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

const Item = ({ item, removeItem, updateItem, moveItem, stores }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  return (
    <ListGroup.Item className="section__list-item">
      {item.name} - {item.quantity}{" "}
      <div>
        <Button variant="light" onClick={() => removeItem(item.id)}>
          <i class="far fa-trash-alt"></i>
        </Button>
        <Button
          className="u-mar-l_2"
          variant="light"
          onClick={() => setShowModal(!showModal)}
        >
          <i class="far fa-edit"></i>
        </Button>
        <Button
          className="u-mar-l_2"
          variant="light"
          onClick={() => setShowMoveModal(!showMoveModal)}
        >
          Move
        </Button>
      </div>
      {showModal && (
        <ShoppingItemModal
          toggleModal={() => setShowModal(!showModal)}
          item={item}
          onSubmit={updateItem}
          stores={stores}
          isUpdating
        />
      )}
      {showMoveModal && (
        <MoveItemModal
          toggleModal={() => setShowMoveModal(!showMoveModal)}
          item={item}
          onSubmit={moveItem}
        />
      )}
    </ListGroup.Item>
  );
};

export default ShoppingItemCard;
