import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Regex'ler
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  function validateEmail(value) {
    if (!emailRegex.test(value)) {
      return "Geçerli bir email giriniz.";
    }
    return "";
  }

  function validatePassword(value) {
    if (!strongPasswordRegex.test(value)) {
      return "Şifre en az 6 karakter olmalı ve sayı + harf içermelidir.";
    }
    return "";
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
    }));
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
    }));
  }

  const isFormValid =
    emailRegex.test(email) &&
    strongPasswordRegex.test(password) &&
    checked;

  function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid) {
      navigate("/success");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          data-testid="email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          data-testid="password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            data-testid="checkbox"
          />{" "}
          Şartları kabul ediyorum
        </label>

        <button
          type="submit"
          disabled={!isFormValid}
          data-testid="submit-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}
