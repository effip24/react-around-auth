import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormAndValidation from "../utils/FormValidator.js";

const AddPlacePopup = ({ isSending, isOpen, onClose, onAddPlaceSubmit }) => {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  const handleTitleChange = (e) => {
    setCardName(e.target.value);
    handleChange(e);
  };

  const handleLinkChange = (e) => {
    setCardLink(e.target.value);
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlaceSubmit({
      name: cardName,
      link: cardLink,
    });
  };

  return (
    <PopupWithForm
      name="add"
      title="New place"
      submit={isSending ? "Saving..." : "Save"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitButtonState={isValid ? "" : "popup__submit_inactive"}
    >
      <input
        id="title-input"
        required
        minLength="1"
        maxLength="30"
        name="name"
        value={cardName}
        type={isOpen ? "text" : "reset"}
        placeholder="Title"
        className={`popup__input  ? "popup__input_type_error" : ""}`}
        onChange={handleTitleChange}
      />
      <span id="title-input-error" className={`popup__input-error ${errors.name ? "popup__input-error_active" : ""}`}>
        {errors.name}
      </span>

      <input
        id="link-input"
        required
        name="link"
        value={cardLink}
        type={isOpen ? "url" : "reset"}
        placeholder="Image link"
        className={`popup__input  ? "popup__input_type_error" : ""}`}
        onChange={handleLinkChange}
      />
      <span id="title-input-error" className={`popup__input-error ${errors.link ? "popup__input-error_active" : ""}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
