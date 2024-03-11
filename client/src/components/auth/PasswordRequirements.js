import React from "react";
import './password_requirements.css'

const PasswordRequirements = ({
  isLowerCase,
  isUpperCase,
  isSpecialChar,
  isNumber,
  isValidLength,
  position
}) => {
  return (
    <span
      className={`callout ${position} ${
        isLowerCase && isUpperCase && isSpecialChar && isNumber && isValidLength
          ? "success"
          : ""
      }`}
    >
      <p className="callout-header">Your password should contain:</p>
      <ul className="list">
        <li className={`list-item lowercase ${isLowerCase ? "success" : ""}`}>
          A Lowercase letter (a)
        </li>
        <li className={`list-item uppercase ${isUpperCase ? "success" : ""}`}>
          An Uppercase letter (A)
        </li>
        <li className={`list-item specialChar ${isSpecialChar ? "success" : ""}`}>
          A special character (!@#)
        </li>
        <li className={`list-item number ${isNumber ? "success" : ""}`}>
          A number (1)
        </li>
        <li className={`list-item validLength ${isValidLength ? "success" : ""}`}>
          8 characters minimum
        </li>
      </ul>
    </span>
  );
};

export default PasswordRequirements;
