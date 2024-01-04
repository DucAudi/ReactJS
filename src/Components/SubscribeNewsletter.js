import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SubscribeNewsletter() {
  const [inputEmail, setInputEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEmailInput = (event) => {
    setInputEmail(event.target.value);
  };

  const handleBookAppointmentClick = async () => {
    if (!isButtonDisabled) {
      try {
        const response = await axios.post("http://localhost:3001/api/subscribe", {
          email: inputEmail,
        });

        console.log(response.data.message);

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          onOpen: () => {
            setIsButtonDisabled(true);
            setInputEmail("");
          },
          onClose: () => setIsButtonDisabled(false),
        });
      } catch (error) {
        console.error("Lỗi khi đăng ký:", error);

        if (error.response && error.response.status === 400) {
          // Xử lý đặc biệt cho lỗi 400 (Bad Request)
          const errorMessage = error.response.data.error || "Địa chỉ email đã tồn tại";
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER,
            onOpen: () => setIsButtonDisabled(true),
            onClose: () => setIsButtonDisabled(false),
          });
        } else {
          // Xử lý các lỗi khác
          const errorMessage = error.response ? error.response.data.error : "Đã xảy ra lỗi";
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER,
            onOpen: () => setIsButtonDisabled(true),
            onClose: () => setIsButtonDisabled(false),
          });
        }
      }
    }
  };

  return (
    <div className="ft-info-p2">
      <p className="ft-input-title">Đăng ký nhận bản tin của chúng tôi *</p>
      <input
        type="text"
        inputMode="email"
        className="ft-input"
        placeholder="Nhập địa chỉ email của bạn"
        name="email"
        value={inputEmail}
        onChange={handleEmailInput}
        autoComplete="true"
        required
      />
      <button
        className="text-appointment-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleBookAppointmentClick}
      >
        Đăng ký
      </button>

      <ToastContainer autoClose={4000} limit={1} closeButton={false} locale="vi" />
    </div>
  );
}

export default SubscribeNewsletter;
