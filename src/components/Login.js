import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";


const Login = (props) => {
  const [passShow, setPassShow] = useState(false);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.auth.authtoken);
      localStorage.setItem("role", json.auth.role);
      // console.log(json.auth.role);
      props.showAlert("Logged in Successfully", "success");
      //   toast.success("congratulaton",{
      //     position:"top-center"
      //   });
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div class="form_data">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form_input">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="form_input">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  className="form-control"
                  value={credentials.password}
                  onChange={onChange}
                  name="password"
                  id="password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            {/* <p class="text-end">
            <NavLink to="/password-reset">Forgot Password</NavLink>{" "}
          </p> */}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p>
            Don't have an Account? <NavLink to="/signup">Sign Up</NavLink>{" "}
          </p>
          <p style={{ color: "black", fontWeight: "bold" }}>
            Forgot Password <NavLink to="/password-reset">Click Here</NavLink>{" "}
          </p>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;
