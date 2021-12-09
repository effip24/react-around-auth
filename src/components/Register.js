import { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onRegister(email, password);
    }
    return;
  };

  return (
    <section className="authenticate">
      <div className="authenticate__from-container">
        <form name="login" action="#" className="authenticate__form" onSubmit={handleSubmit}>
          <div className="authenticate__title-container">
            <h3 className="authenticate__title">Sign up</h3>
            <div className="authenticate__input-container">
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="authenticate__input"
                onChange={handleEmailChange}
              ></input>
              <input
                required
                name="password"
                type="password"
                placeholder="password"
                className="authenticate__input"
                onChange={handlePasswordChange}
              ></input>
            </div>
          </div>
          <div className="authenticate__submit-container">
            <button className="authenticate__submit" type="submit">
              Sign up
            </button>
            <Link className="authenticate__link" to="/signin">
              Already a member? Log in here!
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
export default withRouter(Register);
