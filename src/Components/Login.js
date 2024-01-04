// import axios from "axios";
import React, { useState } from "react";
import '../App.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../Styles/Formlogin.css'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu đăng nhập đến server
      // console.log('API_URL:', api.API_URL);
      // const response = await axios.post("/api/login", formData);
      const response = await api.login( formData);

      alert("Đăng nhập thành công!!!");

      // Xử lý phản hồi từ server (đăng nhập thành công, lỗi, ...)
      console.log(response.data);
      navigate("/home");
    } catch (error) { 
      console.error("Đăng nhập không thành công:", error.message);
      alert("Đăng nhập không thành công!!!");
    }
  };
  const handleRegisterClick = () => {
    navigate("/register"); // Điều hướng tới trang RegisterForm
  };

  return (
   


    <div id="login-container" className="container"> 
      <header>Login Form</header>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          
          <label>Email</label>
        </div>
        <div className="input-field">
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          
          {/* <span className="show">SHOW</span> */}
          <label>Password</label>
        </div>
        <div className="button">
          <div className="inner"></div>
          <button type="submit">LOGIN</button>
        </div>
      </form>
      {/* <div className="auth">
          Or <button className="facebook" type="button" onClick={handleRegisterClick}>Register</button>
        </div> */}
       

      <div className="links">
        <div className="facebook">
          <i className="fab fa-facebook-square" onClick={handleRegisterClick}><span>REGISTER</span></i>
        </div>
        {/* <div className="google">
          <i className="fab fa-google-plus-square"><span>Google</span></i>
        </div> */}
      </div>
    </div>

 
  );
};

export default LoginForm;