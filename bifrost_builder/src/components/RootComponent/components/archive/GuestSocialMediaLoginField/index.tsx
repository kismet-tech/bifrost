import styled from "styled-components";
import { GuestSocialMediaLoginFieldConfiguration } from "../../../models";
import { FacebookLoginButton } from "./FacebookLoginButton/FacebookLoginButton";

export const FormHeaderWraper = styled.div`
  font-size: 2rem;
`;

interface GuestSocialMediaLoginFieldProps {
  configuration: GuestSocialMediaLoginFieldConfiguration;
}

export function GuestSocialMediaLoginField({
  configuration: { includeFacebook },
}: GuestSocialMediaLoginFieldProps) {
  return <div>{includeFacebook ? <FacebookLoginButton /> : ""}</div>;
}
