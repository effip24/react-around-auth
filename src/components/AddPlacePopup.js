import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import validator from "../utils/FormValidator.js";

const AddPlacePopup = ({ isSending, isOpen, onClose, onAddPlaceSubmit }) => {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");
  const [nameValidation, setNameValidation] = useState({});
  const [linkValidation, setLinkValidation] = useState({});
  const [submitButtonActive, setSubmitButtonActive] = useState(false);

  useEffect(() => {
    setCardName("");
    setCardLink("");
    setNameValidation({ hasError: true, showError: false, errorMessage: "" });
    setLinkValidation({ hasError: true, showError: false, errorMessage: "" });
    setSubmitButtonActive(false);
  }, [isOpen]);

  useEffect(() => {
    setSubmitButtonActive(nameValidation.hasError || linkValidation.hasError ? false : true);
  }, [nameValidation.hasError, linkValidation.hasError]);

  const handleTitleChange = (e) => {
    setCardName(e.target.value);
    setNameValidation(validator(nameValidation, e.target));
  };

  const handleLinkChange = (e) => {
    setCardLink(e.target.value);
    setLinkValidation(validator(linkValidation, e.target));
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
      submitButtonState={submitButtonActive ? "" : "popup__submit_inactive"}
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
        className={`popup__input ${nameValidation.showError ? "popup__input_type_error" : ""}`}
        onChange={handleTitleChange}
      />
      <span
        id="title-input-error"
        className={`popup__input-error ${nameValidation.showError ? "popup__input-error_active" : ""}`}
      >
        {nameValidation.errorMessage}
      </span>

      <input
        id="link-input"
        required
        name="link"
        value={cardLink}
        type={isOpen ? "url" : "reset"}
        placeholder="Image link"
        className={`popup__input ${linkValidation.showError ? "popup__input_type_error" : ""}`}
        onChange={handleLinkChange}
      />
      <span
        id="title-input-error"
        className={`popup__input-error ${linkValidation.showError ? "popup__input-error_active" : ""}`}
      >
        {linkValidation.errorMessage}
      </span>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
