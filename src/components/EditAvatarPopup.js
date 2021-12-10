import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormAndValidation from "../utils/FormValidator.js";

const EditAvatarPopup = ({ isSending, isOpen, onClose, onUpdateAvatar }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({ link: "" });
  }, [isOpen, resetForm, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.link,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      submit={isSending ? "Saving..." : "Save"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitButtonState={isValid ? "" : "popup__submit_inactive"}
    >
      <input
        id="url-input"
        required
        name="link"
        type={isOpen ? "url" : "reset"}
        placeholder="Image link"
        className={`popup__input ${errors.link ? "popup__input_type_error" : ""}`}
        value={values.link || ""}
        onChange={handleChange}
      />
      <span id="name-input-error" className={`popup__input-error  ${errors.link ? "popup__input-error_active" : ""}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
