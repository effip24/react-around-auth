import React from "react";
import PopupWithForm from "./PopupWithForm.js";

const DeletePlacePopup = ({ isSending, isOpen, onClose, onDeletePlace }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onDeletePlace({});
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="delete"
      type="popup__form_type_delete"
      title="Are you sure?"
      submit={isSending ? "Deleting..." : "Yes"}
      onClose={onClose}
      isOpen={isOpen}
    ></PopupWithForm>
  );
};
export default DeletePlacePopup;
