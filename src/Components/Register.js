import React, { useState } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Điều hướng tới trang đăng nhập
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.register(formData);
      alert("Đăng ký thành công");
      console.log(response);
      navigate("/login"); // Điều hướng tới trang đăng nhập
    } catch (error) {
      alert("Đăng ký không thành công");
      console.error("Đăng ký không thành công:", error.message);
    }
  };


 
  

  return (
    

    <div id="login-container" className="container"> 
    <header>Register Form</header>
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <input mtype="text" name="username" placeholder="Username" onChange={handleChange} />
        
        <label>Username</label>
      </div>
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
        <button  type="submit">REGISTER</button>
      </div>
    </form>
    {/* <div className="auth">Or</div> */}
    <div className="links">
      <div className="facebook">
        <i className="fab fa-facebook-square" onClick={handleLoginClick}><span>LOGIN</span></i>
      </div>
      {/* <div className="google">
        <i className="fab fa-google-plus-square"><span>Google</span></i>
      </div> */}
    </div>
  </div>

    
  );
};

export default RegisterForm;