const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const appointments = [];
const subscribers = [];

// API endpoint cho việc đặt lịch hẹn
app.post('/api/appointments', (req, res) => {
  const {
    patientName,
    patientNumber,
    patientGender,
    appointmentTime,
    preferredMode,
  } = req.body;

  // Kiểm tra xác thực dữ liệu ở đây nếu cần
  if (!patientName || !patientNumber || !patientGender || !appointmentTime || !preferredMode) {
    res.status(400).json({ error: 'Dữ liệu không hợp lệ cho cuộc hẹn' });
    return;
  }

  const newAppointment = {
    patientName,
    patientNumber,
    patientGender,
    appointmentTime,
    preferredMode,
  };

  appointments.push(newAppointment);

  // Trả về thông báo thành công hoặc thông tin bổ sung nếu cần
  res.status(201).json({ message: 'Cuộc hẹn đã được đặt thành công', appointment: newAppointment });
  
});
  

// API endpoint cho việc đăng ký vào danh sách thông báo (newsletter)
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  console.log('Dữ liệu: ', req.body);

  // Kiểm tra tính hợp lệ của địa chỉ email
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    res.status(400).json({ error: 'Email không hợp lệ' });
    return;
  }

  // Kiểm tra xem email đã tồn tại trong danh sách đăng ký hay chưa
  if (subscribers.includes(email)) {
    res.status(400).json({ error: 'Email đã được đăng ký trước đó' });
    return;
  }

  // Xử lý logic đăng ký vào danh sách thông báo ở đây
  subscribers.push(email);

  // Trả về thông báo thành công và thông tin email đã đăng ký
  res.status(200).json({ message: 'Đã đăng ký nhận bản tin!', email });
  console.log('Email đã đăng ký: ', email);
});
// -------------------------------
mongoose.connect("mongodb+srv://congduc:congduccongduccongduc@cluster0.ao5djod.mongodb.net/cuoi_ky?retryWrites=true&w=majority", {
  useNewUrlParser: true, // Remove this line
  useUnifiedTopology: true, // Remove this line

 
});
console.log("connect to MONGODB...")


const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    // Kiểm tra người dùng đã tồn tại hay không
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công' });
    console.log('Người dùng mới đã đăng ký:', newUser);
  } catch (error) {
    console.error('Đăng ký không thành công:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('login: ',req.body)

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }
    

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // So sánh mật khẩu
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    res.status(200).json({ message: 'Đăng nhập thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
