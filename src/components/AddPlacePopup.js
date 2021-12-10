import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormAndValidation from "../utils/FormValidator.js";

const AddPlacePopup = ({ isSending, isOpen, onClose, onAddPlaceSubmit }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({ name: "", link: "" });
  }, [isOpen, resetForm, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlaceSubmit(values);
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
        type={isOpen ? "text" : "reset"}
        placeholder="Title"
        className={`popup__input  ? "popup__input_type_error" : ""}`}
        value={values.name || ""}
        onChange={handleChange}
      />
      <span id="title-input-error" className={`popup__input-error ${errors.name ? "popup__input-error_active" : ""}`}>
        {errors.name}
      </span>

      <input
        id="link-input"
        required
        name="link"
        type={isOpen ? "url" : "reset"}
        placeholder="Image link"
        className={`popup__input  ? "popup__input_type_error" : ""}`}
        value={values.link || ""}
        onChange={handleChange}
      />
      <span id="title-input-error" className={`popup__input-error ${errors.link ? "popup__input-error_active" : ""}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
