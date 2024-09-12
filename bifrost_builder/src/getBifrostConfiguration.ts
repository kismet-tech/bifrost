import { getBifrostConfigurationFormBlocks } from "./components/KismetForm/getBifrostConfigurationFormBlocks";
import {
  BifrostConfiguration,
  FormBlockConfiguration,
} from "./components/KismetForm/models";

export const getBifrostConfiguration = (): BifrostConfiguration => {
  const formBlocks: FormBlockConfiguration[] =
    getBifrostConfigurationFormBlocks();

  return {
    formBlocks,
  };
};
