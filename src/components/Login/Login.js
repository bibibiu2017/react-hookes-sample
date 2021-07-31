import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import AuthContext from "../../state/context/Auth/auth-context";
import Button from "../UI/Button/Button";

import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const Login = () => {
  const ctx = useContext(AuthContext);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    null,
    emailInitializer
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    null,
    passwordInitializer
  );

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(passwordIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "EMAIL_CHANGE", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASS_CHANGE", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASS_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) ctx.onLogin(emailState.value, passwordState.value);
    if (!emailIsValid) {
      console.log(usernameRef);
      usernameRef.current.focus();
      return;
    }
    if (!passwordIsValid) {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={usernameRef}
          type="email"
          id="email"
          label={"E-Mail"}
          valid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordRef}
          type="password"
          id="password"
          label={"Password"}
          valid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

const emailReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_CHANGE":
      return {
        value: action.value,
        isValid: action.value.includes("@"),
      };
    case "EMAIL_BLUR":
      return { ...state, isValid: state.value.includes("@") };
    default:
      return {
        value: "",
        isValid: false,
      };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "PASS_CHANGE":
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    case "PASS_BLUR":
      return {
        ...state,
        isValid: state.value.trim().length > 6,
      };
    default:
      return {
        value: "",
        isValid: false,
      };
  }
};

const emailInitializer = () => ({
  value: "",
  isValid: null,
});

const passwordInitializer = () => ({
  value: "",
  isValid: null,
});

export default Login;
