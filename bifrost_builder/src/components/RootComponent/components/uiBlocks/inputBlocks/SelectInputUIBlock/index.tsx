import { SelectInputUIBlockConfiguration } from "@/models/configuration";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { FormQuestionResponseType } from "@/models/formQuestions/questionWithResponse";

interface SelectInputUIBlockProps {
  configuration: SelectInputUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function SelectInputUIBlock({
  configuration: { label, options, formQuestionId },
  registerBifrostFormInput,
}: SelectInputUIBlockProps) {
  const {
    setResponseToQuestion,
    maybeGetQuestionWithResponseByFormQuestionId,
  } = useBifrostFormState();

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId,
    });

  const maybeQuestionResponse: string =
    (maybeQuestionWithResponse?.response as string) || "";

  const handleOnChange = (value: string) => {
    setResponseToQuestion({
      questionWithResponse: {
        formQuestionId: formQuestionId,
        responseType: FormQuestionResponseType.STRING,
        response: value,
      },
    });

    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${formQuestionId}`}>{label}</FormLabel>
      <Select
        value={maybeQuestionResponse}
        onValueChange={handleOnChange}
        name={formQuestionId}
      >
        <SelectTrigger id={`form_${formQuestionId}`}>
          <SelectValue placeholder="Contact me by..." />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, keyValue: name }) => (
            <SelectItem key={name} value={name}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
