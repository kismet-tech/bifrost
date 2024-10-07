import { UIBlockConfiguration, UIBlockType } from "@/models/configuration";
import { HeaderUIBlock } from "./HeaderUIBlock";
import { BifrostFormData } from "@/models/configuration/formData";
import { SubheaderUIBlock } from "./SubheaderUIBlock";

export interface UIBlockProps {
  configuration: UIBlockConfiguration;
  formData: BifrostFormData;
}

export function UIBlock({ configuration, formData }: UIBlockProps) {
  if (configuration.uiBlockType === UIBlockType.HEADER) {
    return <HeaderUIBlock configuration={configuration} formData={formData} />;
  } else if (configuration.uiBlockType === UIBlockType.SUBHEADER) {
    return (
      <SubheaderUIBlock configuration={configuration} formData={formData} />
    );
  }
}
