import PropTypes from "prop-types";
import React, { useRef } from "react";
import { control, invalid } from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { id, valid, label, type, value, onChange, onBlur } = props;
  const inputRef = useRef();

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <div className={`${control} ${valid === false ? invalid : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default Input;
