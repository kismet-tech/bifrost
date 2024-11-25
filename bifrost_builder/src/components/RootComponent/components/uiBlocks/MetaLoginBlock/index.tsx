// src/LoginButton.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "facebook", // Specify the Facebook connection here
      },
    });
  };

  return <button onClick={handleLogin}>Login with Facebook</button>;
};

export default LoginButton;
