import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  background-color: #4267b2; /* Facebook blue */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem; /* Increase the border-radius for more rounded corners */
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: barlow-regular, "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const SvgIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const facebookSvgPath = `M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z`;

export function FacebookLoginButton() {
  const handleFacebookLogin = () => {
    // Logic for Facebook login goes here
    console.log("Facebook login clicked");
  };

  return (
    <Button onClick={handleFacebookLogin} aria-label="Login with Facebook">
      <SvgIcon
        fill="#FFFFFF" /* Set the SVG color to white */
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Facebook"
      >
        <path d={facebookSvgPath} />
      </SvgIcon>
      Login with Facebook
    </Button>
  );
}
