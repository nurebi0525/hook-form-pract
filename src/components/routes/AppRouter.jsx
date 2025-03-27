import { Navigate, Route, Routes } from "react-router";
import LoginForm from "../auth/Login";
import AuthLayout from "../layout/AuthLayout";
import AuthForm from "../auth/Authform";
import { Main } from "../Main";
import { protect } from "../utils/protect"; 

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="sign-in" />} />
        <Route path="sign-up" element={<AuthForm role="user" />} />
        <Route path="vendor" element={<AuthForm role="vendor" />} />
        <Route path="sign-in" element={<LoginForm />} />

        <Route path="main" element={protect(<Main />)} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
