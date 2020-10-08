import React, { useState } from "react";
import { Modal, Button } from "bootstrapComponents";
import { DatePicker } from "react-rainbow-components";

const PantryItemModal = ({
  showModal,
  toggleModal,
  item,
  onSubmit,
  isCreateMode = true
}) => {
  const [itemState, setItemState] = useState({
    ...item,
    expiration: new Date()
  });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e, itemState);
    toggleModal();
  };

  return (
    <Modal centered animation="false" show onHide={toggleModal}>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          Item Name:
          <input
            value={itemState.name || ""}
            onChange={e => setItemState({ ...itemState, name: e.target.value })}
            type="text"
            required
          />
        </label>
        <DatePicker
          id="expiration-datePicker"
          value={itemState.expiration}
          onChange={value => setItemState({ ...itemState, expiration: value })}
          minDate={new Date()}
          label="Expiration Date"
        />
        <label>
          Storage Area:
          <input
            value={itemState.storage || ""}
            onChange={e =>
              setItemState({ ...itemState, storage: e.target.value })
            }
            type="text"
            required
          />
        </label>
        <label>
          Quantity:
          <input
            value={itemState.quantity}
            onChange={e =>
              setItemState({ ...itemState, quantity: e.target.value })
            }
            type="number"
          />
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default PantryItemModal;
