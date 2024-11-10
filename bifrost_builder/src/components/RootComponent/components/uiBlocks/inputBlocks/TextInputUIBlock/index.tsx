import { TextInputUIBlockConfiguration } from "@/models/configuration";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

interface TextInputUIBlockProps {
  configuration: TextInputUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function TextInputUIBlock({
  configuration: {
    label,
    inputType,
    placeholder,
    autocomplete,
    formQuestionId,
  },
  registerBifrostFormInput,
}: TextInputUIBlockProps) {
  const [localValue, setLocalValue] = useState<string>("");
  const {
    setResponseToQuestion,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId: formQuestionId,
    });

  const maybeQuestionResponse: string =
    (maybeQuestionWithResponse?.response as string) || "";

  useEffect(() => {
    if (maybeQuestionResponse) {
      setLocalValue(maybeQuestionResponse);
    } else {
      setLocalValue("");
    }
  }, [maybeQuestionResponse]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setResponseToQuestion({
      questionWithResponse: {
        formQuestionId: formQuestionId,
        responseType: QuestionResponseType.STRING,
        response: value,
      },
    });

    setLocalValue(value);
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_text_input_ui_block_${formQuestionId}`}>
        {label}
      </FormLabel>
      <Input
        onChange={handleOnChange}
        type={inputType}
        id={`form_text_input_ui_block_${formQuestionId}`}
        placeholder={placeholder}
        autoComplete={autocomplete}
        value={localValue}
      />
    </FormField>
  );
}
