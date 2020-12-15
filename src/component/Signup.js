import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Typography,
  CardContent,
  CardActions,
  Card,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import validator from "validator";

import { usersignup } from "../actionCreator/usersignup";
import ActionButton from "./ActionButton";
import InputField from "./InputField";
import CustomBackdrop from "./CustomBackdrop";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const fieldConfiguration = {
  Name: { type: "text", label: "Name", autofocus: true },
  Email: { type: "text", label: "Email", autofocus: false },
  Password: { type: "password", label: "Password", autofocus: false },
  ConfirmPassword: {
    type: "password",
    label: "Confirm Password",
    autofocus: false,
  },
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      errors: {},
      open: false,
      loading: false,
    };
  }

  getStyle() {
    return {
      root: {
        maxWidth: 345,
        margin: "auto",
      },
    };
  }

  componentDidMount() {
    if (this.props.validToken) {
      this.props.history.push("/home");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.validToken) {
      this.props.history.push("/home");
    } else if (this.props.errors && this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors, open: true, loading: false });
    }
  }

  validate = (e) => {
    const errors = this.state.errors;
    const name = e.target.name;
    const value = e.target.value.trim();
    if (validator.isEmpty(value)) {
      errors[name] = `${name} cannot be blank`;
    } else if (validator.equals(name, "Email") && !validator.isEmail(value)) {
      errors[name] = `${name} is not valid`;
    } else if (
      validator.equals(name, "ConfirmPassword") &&
      !validator.equals(value, this.state.Password)
    ) {
      errors[name] = `Password and ${name} should be same`;
    } else {
      delete errors[name];
    }

    this.setState({ errors, open: Object.keys(errors).length ? true : false });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false, errors: {} });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const values = {
      name: this.state.Name,
      email: this.state.Email,
      password: this.state.Password,
      confirmPassword: this.state.ConfirmPassword,
    };
    this.props.usersignup(values, this.props.history);
  };

  handleReset = () => {
    this.setState({
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      errors: {},
      open: false,
    });
  };

  render() {
    return (
      <Card style={this.getStyle().root}>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            {_.map(this.state.errors, (value) => (
              <li key={value}>{value}</li>
            ))}
          </Alert>
        </Snackbar>
        <form onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="primary"
            >
              Sign Up
            </Typography>
            {_.map(fieldConfiguration, (value, key) => (
              <InputField
                key={key}
                label={value.label}
                error={this.state.errors[key]}
                value={this.state[key]}
                onChange={this.handleChange}
                name={key}
                required={true}
                onBlur={this.validate}
                type={value.type}
                maxLength={30}
                autofocus={value.autofocus}
              />
            ))}
          </CardContent>
          <CardActions>
            <ActionButton
              color="primary"
              value="Submit"
              type="submit"
              disabled={Object.keys(this.state.errors).length ? true : false}
            />
            <ActionButton
              color="secondary"
              value="Reset"
              onClick={this.handleReset}
            />
          </CardActions>
        </form>
        <CustomBackdrop open={this.state.loading} />
      </Card>
    );
  }
}

Signup.propTypes = {
  usersignup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  validToken: state.security.validToken,
  errors: state.todoList.signupError,
});

export default connect(mapStateToProps, { usersignup })(Signup);
