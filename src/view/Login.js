import { Button, Input } from "antd";
import { useState } from "react";
import AdminController from "../controller/AdminController";
import { useNavigate } from "react-router-dom";
import { Admin } from "../model/Admin";
import "./Login.css";

const adminController = new AdminController();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const handleLogin = async () => {
    const admin = new Admin();
    admin.setUsername(username);
    admin.setPassword(password);

    const user = await adminController.checkLogin(admin);

    if (user != null) {
      navigation("/", {
        state: {
          fullName: user.getFullName(),
          id: user.getId(),
        },
      });
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <p className="login-label">Tài khoản:</p>
        <Input
          placeholder="Nhập tài khoản"
          onChange={(e) => setUsername(e.target.value)}
        />

        <p className="login-label">Mật khẩu:</p>
        <Input.Password
          placeholder="Nhập mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="primary"
          onClick={handleLogin}
          className="login-button"
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}
