import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";

const BASE_URL = "https://ca01dcff658fb43f.mokky.dev";

const AuthForm = ({ role = "user" }) => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const endpoint = role === "vendor" ? "/register" : "/register";
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (response) {
        localStorage.setItem("token", response.token);
        navigate("/main");
      } else {
        alert(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Box sx={{ padding: 4, width: 400, boxShadow: 3, bgcolor: "white", borderRadius: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          {role === "vendor" ? "Register as Vendor" : "Register as User"}
        </Typography>

        <TextField
          fullWidth
          label="Name"
          type="text"
          {...register("username", { required: "Please enter your name" })}
          error={!!errors.username}
          helperText={errors.username?.message}
          sx={{ mb: 2 }}
        />

        {role === "vendor" && (
          <TextField
            fullWidth
            label="Store Name"
            type="text"
            {...register("storename", { required: "Please enter your Store Name" })}
            error={!!errors.storename}
            helperText={errors.storename?.message}
            sx={{ mb: 2 }}
          />
        )}

       { role === "vendor" && (
         <TextField
         fullWidth
         label="Phone Number"
         type="tel"
         {...register("number", {
           required: "Please enter your phone number",
           pattern: {
             value: /^[+]?[0-9\s\-()]{7,20}$/,
             message: "Invalid phone number format",
           },
         })}
         error={!!errors.number}
         helperText={errors.number?.message}
         sx={{ mb: 2 }}
       />
       )

       }

        <TextField
          fullWidth
          type="email"
          label="Email"
          {...register("email", {
            pattern: { value: /@/gi, message: "Invalid email format" },
            required: "Email is required",
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum length is 6" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === getValues("password") || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {role === "vendor" ? "Register Vendor" : "Register User"}
        </Button>

        <Button onClick={() => navigate(role === "vendor" ? "/sign-up" : "/vendor")} fullWidth color="primary">
          {role === "vendor" ? "Register as User" : "Register as Vendor"}
        </Button>

        <DevTool control={control} />
      </Box>
    </Container>
  );
};

export default AuthForm;
