import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useFormAndValidation from "../utils/FormValidator.js";

const EditProfilePopup = ({ isSending, isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    setName(currentUser.name ? currentUser.name : "");
    setDescription(currentUser.about ? currentUser.about : "");
    resetForm();
  }, [isOpen, currentUser.name, currentUser.about, resetForm]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    handleChange(e);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    handleChange(e);
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
      submitButtonState={isValid ? "" : "popup__submit_inactive"}
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
        className={`popup__input ${errors.name ? "popup__input_type_error" : ""}`}
        onChange={handleNameChange}
      />
      <span id="name-input-error" className={`popup__input-error ${errors.name ? "popup__input-error_active" : ""}`}>
        {errors.name}
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
        className={`popup__input ${errors.occupation ? "popup__input_type_error" : ""}`}
        onChange={handleDescriptionChange}
      />
      <span
        id="title-input-error"
        className={`popup__input-error ${errors.occupation ? "popup__input-error_active" : ""}`}
      >
        {errors.occupation}
      </span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
