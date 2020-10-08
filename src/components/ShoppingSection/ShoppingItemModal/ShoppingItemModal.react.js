import React, { useState, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import { Modal, Button } from "bootstrapComponents";

import "./form-modal.scss";

const ShoppingItemModal = ({
  showModal,
  toggleModal,
  item,
  onSubmit,
  stores
}) => {
  const [itemState, setItemState] = useState(item);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e, itemState);
    toggleModal();
  };

  const selectOptions = stores.reduce((acc, store) => {
    acc.push({ value: store, label: store });
    return acc;
  }, []);

  return (
    <Modal centered animation="false" show onHide={toggleModal}>
      <form className="form-modal" onSubmit={e => handleSubmit(e)}>
        <label>
          Item Name:
          <input
            className="full-width"
            value={itemState.name || ""}
            onChange={e => setItemState({ ...itemState, name: e.target.value })}
            type="text"
            required
          />
        </label>
        <label>
          Store:
          <CreatableSelect
            isClearable
            className="full-width"
            placeholder="Type to create a new store"
            onChange={newValue =>
              setItemState({ ...itemState, store: newValue.value || "" })
            }
            options={selectOptions}
          />
        </label>
        <label>
          Quantity:
          <input
            className="full-width"
            value={itemState.quantity}
            onChange={e =>
              setItemState({ ...itemState, quantity: e.target.value })
            }
            type="number"
          />
        </label>
        <div>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button className="u-mar-l_2" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ShoppingItemModal;
