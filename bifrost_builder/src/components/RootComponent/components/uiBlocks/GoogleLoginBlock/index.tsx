// src/components/LoginButton.tsx

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const GoogleLoginButton: React.FC = () => {
  const { loginWithPopup } = useAuth0();

  const onLogin = () => {
    loginWithPopup({
      authorizationParams: {
        connection: "google-oauth2", // Specifies Google as the connection
      },
    });
  };

  return <button onClick={onLogin}>Log In with Google</button>;
};

export default GoogleLoginButton;
