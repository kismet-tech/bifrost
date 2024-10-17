import { ScreenNavigatorUIBlockConditionPath } from "@/models/configuration";
import { BifrostFormData } from "@/models/configuration/formData";
import { doesFormDataMatchOnKeyPathCondition } from "@/utilities/formData/doesConditionBlockMatchOnCondition";

interface MaybeGetFirstMatchedScreenNavigatorPathProps {
  paths: ScreenNavigatorUIBlockConditionPath[];
  formData: BifrostFormData;
}

export const maybeGetFirstMatchedScreenNavigatorPath = ({
  paths,
  formData,
}: MaybeGetFirstMatchedScreenNavigatorPathProps):
  | ScreenNavigatorUIBlockConditionPath
  | undefined => {
  let matchedPath: ScreenNavigatorUIBlockConditionPath | undefined;

  paths.forEach((path: ScreenNavigatorUIBlockConditionPath) => {
    const doesMatch: boolean = doesFormDataMatchOnKeyPathCondition({
      condition: path.condition,
      formData,
    });

    if (!matchedPath && doesMatch) {
      matchedPath = path;
    }
  });

  return matchedPath;
};
