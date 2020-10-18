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
  checkItem,
  addItem,
  stores
}) => {
  const [showContent, setShowContent] = useState(true);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const showContentIcon = showContent ? (
    <i class="fas fa-chevron-up" />
  ) : (
    <i class="fas fa-chevron-down" />
  );
  return (
    <Card className="section__card u-pad-2">
      <Card.Title className="flex flex-justify_space-between">
        {sectionName}
        <button
          className="icon-button"
          onClick={() => setShowContent(!showContent)}
        >
          {showContentIcon}
        </button>
      </Card.Title>
      {showContent && (
        <Card.Body>
          <ListGroup>
            {sectionItems.map(item => (
              <Item
                item={item}
                removeItem={removeItem}
                updateItem={updateItem}
                moveItem={moveItem}
                checkItem={checkItem}
                stores={stores}
              />
            ))}
            <ListGroup.Item className="section__list-item--no-border">
              <button className="icon-button--large u-mar-auto">
                <i
                  onClick={() => setShowAddItemModal(true)}
                  class="fas fa-plus"
                />
              </button>
            </ListGroup.Item>
          </ListGroup>
          {showAddItemModal && (
            <ShoppingItemModal
              toggleModal={() => setShowAddItemModal(false)}
              item={{ store: sectionName, quantity: 1 }}
              onSubmit={addItem}
            />
          )}
        </Card.Body>
      )}
    </Card>
  );
};

const Item = ({
  item,
  removeItem,
  updateItem,
  moveItem,
  stores,
  checkItem
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const itemClasses = `section__list-item ${item.checked &&
    "section__list-item--checked"}`;
  return (
    <ListGroup.Item className={itemClasses}>
      {item.name} - {item.quantity}{" "}
      <div>
        <Button variant="light" onClick={() => removeItem(item.id)}>
          <i class="far fa-trash-alt" />
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
          onClick={() => checkItem(item.id, !item.checked)}
        >
          <i class={`fas fa-${item.checked ? "times" : "check"}`} />
        </Button>
        {/* <Button
          className="u-mar-l_2"
          variant="light"
          onClick={() => setShowMoveModal(!showMoveModal)}
        >
          Move
        </Button> */}
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
