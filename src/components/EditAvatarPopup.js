import React, { useEffect, useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
import validator from "../utils/FormValidator.js";

const EditAvatarPopup = ({ isSending, isOpen, onClose, onUpdateAvatar }) => {
  const avatar = useRef(null);
  const [avatarValidation, setAvatarValidation] = useState({});
  const [submitButtonActive, setSubmitButtonActive] = useState(false);

  useEffect(() => {
    avatar.current.value = "";
    setAvatarValidation({ hasError: false, showError: false, errorMessage: "" });
    setSubmitButtonActive(false);
  }, [isOpen]);

  const handleChange = (e) => {
    setAvatarValidation(() => {
      setSubmitButtonActive(avatarValidation.hasError ? false : true);
      return validator(avatarValidation, e.target);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
    avatar.current.value = "";
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      submit={isSending ? "Saving..." : "Save"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonActive ? "" : "popup__submit_inactive"}
    >
      <input
        id="url-input"
        required
        name="link"
        type={isOpen ? "url" : "reset"}
        placeholder="Image link"
        className={`popup__input ${avatarValidation.showError ? "popup__input_type_error" : ""}`}
        ref={avatar}
        onChange={handleChange}
      />
      <span
        id="name-input-error"
        className={`popup__input-error ${avatarValidation.showError ? "popup__input-error_active" : ""}`}
      >
        {avatarValidation.errorMessage}
      </span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
