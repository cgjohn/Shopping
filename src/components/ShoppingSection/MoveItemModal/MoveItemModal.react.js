import React, { useState, useContext } from "react";
import { Modal, Button } from "bootstrapComponents";
import { DatePicker } from "react-rainbow-components";
import { db } from "firebase/firebase.utils.js";
import AuthContext from "components/context/auth-context";

const ShoppingItemModal = ({ toggleModal, item, onSubmit }) => {
  const auth = useContext(AuthContext);

  const [itemState, setItemState] = useState({
    ...item,
    expiration: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(itemState);
    toggleModal();
  };

  return (
    <Modal centered animation="false" show onHide={toggleModal}>
      <form onSubmit={e => handleSubmit(e)}>
        <DatePicker
          id="expiration-datePicker"
          value={itemState.expiration}
          onChange={value => setItemState({ ...itemState, expiration: value })}
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
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default ShoppingItemModal;
