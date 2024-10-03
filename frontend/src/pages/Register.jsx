import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    DNO: "",
    electricitymeterid: "",
    electricitymeterreading: "",
    gasmeterid: "",
    gasmeterreading: "",
    smartmeter: "",
  });

  const {
    email,
    password,
    password2,
    DNO,
    electricitymeterid,
    electricitymeterreading,
    gasmeterid,
    gasmeterreading,
    smartmeter,
  } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSub = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        email,
        password,
        DNO,
        electricitymeterid,
        electricitymeterreading,
        gasmeterid,
        gasmeterreading,
        smartmeter,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="form">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSub={onSub}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="DNO"
              name="DNO"
              value={DNO}
              placeholder="Enter your DNO"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="electricitymeterid"
              name="electricitymeterid"
              value={electricitymeterid}
              placeholder="Enter your electricity meter id"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="electricitymeterreading"
              name="electricitymeterreading"
              value={electricitymeterreading}
              placeholder="Enter your electricity meter reading"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="gasmeterid"
              name="gasmeterid"
              value={gasmeterid}
              placeholder="Enter your gas meter id"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="gasmeterreading"
              name="gasmeterreading"
              value={gasmeterreading}
              placeholder="Enter your gas meter reading"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="smartmeter"
              name="smartmeter"
              value={smartmeter}
              placeholder="Enter your smart meter id"
              onChange={onChange}
            />
          </div>
          <input type="sub " className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1"></p>
      </section>
    </>
  );
}

export default Register;
