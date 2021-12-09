import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormAndValidation from "../utils/FormValidator.js";

const EditAvatarPopup = ({ isSending, isOpen, onClose, onUpdateAvatar }) => {
  const [avatar, setAvatar] = useState("");
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    setAvatar("");
    resetForm();
  }, [isOpen, resetForm]);

  const handleLinkChange = (e) => {
    setAvatar(e.target.value);
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar,
    });
    setAvatar("");
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
        onChange={handleLinkChange}
      />
      <span id="name-input-error" className={`popup__input-error  ${errors.link ? "popup__input-error_active" : ""}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
