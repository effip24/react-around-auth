import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import validator from "../utils/FormValidator.js";

const EditProfilePopup = ({ isSending, isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameValidation, setNameValidation] = useState({});
  const [descriptionValidation, setDescriptionValidation] = useState({});
  const [submitButtonActive, setSubmitButtonActive] = useState(false);

  useEffect(() => {
    setName(currentUser.name ? currentUser.name : "");
    setDescription(currentUser.about ? currentUser.about : "");
    setNameValidation({ hasError: false, showError: false, errorMessage: "" });
    setDescriptionValidation({ hasError: false, showError: false, errorMessage: "" });
    setSubmitButtonActive(false);
  }, [isOpen, currentUser.name, currentUser.about]);

  useEffect(() => {
    setSubmitButtonActive(nameValidation.hasError || descriptionValidation.hasError ? false : true);
  }, [nameValidation.hasError, descriptionValidation.hasError, name, description]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameValidation(validator(nameValidation, e.target));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionValidation(validator(descriptionValidation, e.target));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit"
      title="Edit profile"
      submit={isSending ? "Saving..." : "Save"}
      onClose={onClose}
      isOpen={isOpen}
      submitButtonState={submitButtonActive ? "" : "popup__submit_inactive"}
    >
      <input
        id="name-input"
        required
        minLength="2"
        maxLength="40"
        value={name}
        name="name"
        type="text"
        placeholder="name"
        className={`popup__input ${nameValidation.showError ? "popup__input_type_error" : ""}`}
        onChange={handleNameChange}
      />
      <span
        id="name-input-error"
        className={`popup__input-error ${nameValidation.showError ? "popup__input-error_active" : ""}`}
      >
        {nameValidation.errorMessage}
      </span>
      <input
        id="occupation-input"
        required
        minLength="2"
        maxLength="200"
        value={description}
        name="occupation"
        type="text"
        placeholder="About me"
        className={`popup__input ${descriptionValidation.showError ? "popup__input_type_error" : ""}`}
        onChange={handleDescriptionChange}
      />
      <span
        id="title-input-error"
        className={`popup__input-error ${descriptionValidation.showError ? "popup__input-error_active" : ""}`}
      >
        {descriptionValidation.errorMessage}
      </span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
