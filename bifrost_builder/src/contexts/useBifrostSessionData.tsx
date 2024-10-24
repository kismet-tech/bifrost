import { useContext } from "react";
import { BifrostSessionDataContext } from "./BifrostSessionDataProvider";

export const useBifrostSessionData = () => {
  return useContext(BifrostSessionDataContext);
};
