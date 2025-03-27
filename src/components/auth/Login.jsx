import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router";

const BASE_URL = "https://ca01dcff658fb43f.mokky.dev/auth";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/main");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Box sx={{ padding: 4, width: 400, boxShadow: 3, bgcolor: "white", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            {...register("email", { required: "Required Field" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", { required: "Password required", minLength: 6 })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          
          <Button onClick={() => navigate("/sign-up")} fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
