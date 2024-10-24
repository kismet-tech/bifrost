import {
  BifrostSessionData,
  BifrostSessionDataKey,
  BifrostSessionDataValue,
} from "@/models/configuration/bifrostSessionData";
import { createContext, MutableRefObject, ReactNode, useRef } from "react";

interface BifrostSessionDataContextValue {
  mutateBifrostSessionData: ({
    key,
    value,
  }: {
    key: BifrostSessionDataKey;
    value: BifrostSessionDataValue;
  }) => void;
  getBifrostSessionDataAtKey: ({
    key,
  }: {
    key: BifrostSessionDataKey;
  }) => BifrostSessionData;
}

export const BifrostSessionDataContext = createContext(
  {} as BifrostSessionDataContextValue
);

interface BifrostSessionDataProviderProps {
  children: ReactNode;
}

export const BifrostSessionDataProvider = ({
  children,
}: BifrostSessionDataProviderProps) => {
  const bifrostSessionData: MutableRefObject<BifrostSessionData> = useRef({});

  const mutateBifrostSessionData: ({
    key,
    value,
  }: {
    key: BifrostSessionDataKey;
    value: BifrostSessionDataValue;
  }) => void = ({
    key,
    value,
  }: {
    key: BifrostSessionDataKey;
    value: BifrostSessionDataValue;
  }): void => {
    bifrostSessionData.current[key] = value;

    return;
  };

  const getBifrostSessionDataAtKey: ({
    key,
  }: {
    key: BifrostSessionDataKey;
  }) => BifrostSessionData = ({ key }: { key: BifrostSessionDataKey }) => {
    return bifrostSessionData.current[key];
  };

  return (
    <BifrostSessionDataContext.Provider
      value={{ mutateBifrostSessionData, getBifrostSessionDataAtKey }}
    >
      {children}
    </BifrostSessionDataContext.Provider>
  );
};
