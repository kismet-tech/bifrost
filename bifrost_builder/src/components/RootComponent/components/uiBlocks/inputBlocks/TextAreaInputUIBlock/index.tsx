import { TextAreaInputUIBlockConfiguration } from "@/models/configuration";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import {
  QuestionResponseType,
  QuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";

interface TextAreaInputUIBlockProps {
  configuration: TextAreaInputUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function TextAreaInputUIBlock({
  configuration: { placeholder, label, formQuestionId },
  registerBifrostFormInput,
}: TextAreaInputUIBlockProps) {
  const [localValue, setLocalValue] = useState<string>("");

  const {
    setResponseToQuestion,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const maybeQuestionWithResponse: QuestionWithResponse | undefined =
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

  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
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
      <FormLabel htmlFor={`form_text_area_input_ui_block_${formQuestionId}`}>
        {label}
      </FormLabel>
      <Textarea
        onChange={handleOnChange}
        id={`form_text_area_input_ui_block_${formQuestionId}`}
        placeholder={placeholder}
        value={localValue}
      />
    </FormField>
  );
}
