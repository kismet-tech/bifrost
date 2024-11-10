import { ExpandableCardSelectorUIBlockConfiguration } from "@/models/configuration";
import { useEffect, useState } from "react";
import { ExpandableSelectionCard } from "@/components/ui/expandable-selection-card";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

interface ExpandableCardSelectorUIBlockProps {
  configuration: ExpandableCardSelectorUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function ExpandableCardSelectorUIBlock({
  configuration: { label, options, formQuestionId },
  registerBifrostFormInput,
}: ExpandableCardSelectorUIBlockProps) {
  const [localSelectedCardName, setLocalSelectedCardName] = useState("");

  const {
    maybeGetQuestionWithResponseByFormQuestionId,
    setResponseToQuestion,
  } = useBifrostFormState();

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId,
    });

  const maybeQuestionResponse: string =
    (maybeQuestionWithResponse?.response as string) || "";

  useEffect(() => {
    if (maybeQuestionResponse) {
      setLocalSelectedCardName(maybeQuestionResponse);
    } else {
      setLocalSelectedCardName("");
    }
  }, [maybeQuestionResponse]);

  const onChangeLocalValue = (cardName: string) => (checked: boolean) => {
    if (checked) {
      setLocalSelectedCardName(cardName);
      setResponseToQuestion({
        questionWithResponse: {
          formQuestionId,
          responseType: QuestionResponseType.STRING,
          response: cardName,
        },
      });
    }
    registerBifrostFormInput();
  };

  const labelId = `kismet_${formQuestionId}`;

  return (
    <FormField>
      <FormLabel id={labelId}>{label}</FormLabel>
      <div
        role="group"
        aria-describedby={labelId}
        className="flex flex-wrap gap-4"
      >
        {options.map((option) => (
          <ExpandableSelectionCard
            key={option.name}
            imageSrc={option.imageSrc}
            name={option.name}
            description={option.description}
            checked={option.name === localSelectedCardName}
            onChange={onChangeLocalValue(option.name)}
          />
        ))}
      </div>
    </FormField>
  );
}
