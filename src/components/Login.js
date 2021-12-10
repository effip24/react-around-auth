import { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import useFormAndValidation from "../utils/FormValidator.js";

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.email && values.password) {
      onLogin(values.email, values.password);
    }

    return;
  };

  return (
    <section className="authenticate">
      <div className="authenticate__from-container">
        <form name="login" action="#" className="authenticate__form" onSubmit={handleSubmit}>
          <div className="authenticate__title-container">
            <h3 className="authenticate__title">Log in</h3>
            <div className="authenticate__input-container">
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className={`authenticate__input ${errors.email ? "authenticate__input_type_error" : ""}`}
                value={values.email || ""}
                onChange={handleChange}
              ></input>
              <span className={`authenticate__input-error ${errors.email ? "authenticate__input-error_active" : ""}`}>
                {errors.email}
              </span>

              <input
                required
                minLength="6"
                maxLength="30"
                name="password"
                type="password"
                placeholder="password"
                className={`authenticate__input ${errors.password ? "authenticate__input_type_error" : ""}`}
                value={values.password || ""}
                onChange={handleChange}
              ></input>
              <span
                className={`authenticate__input-error ${errors.password ? "authenticate__input-error_active" : ""}`}
              >
                {errors.password}
              </span>
            </div>
          </div>
          <div className="authenticate__submit-container">
            <button className={`authenticate__submit ${!isValid ? "authenticate__submit_inactive" : ""}`} type="submit">
              Log in
            </button>
            <Link className="authenticate__link" to="/signup">
              Not a member yet? Sign up here!
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
export default withRouter(Login);
