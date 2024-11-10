import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleGroupUIBlockConfiguration } from "@/models/configuration";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

interface ToggleGroupUIBlockProps {
  configuration: ToggleGroupUIBlockConfiguration;
  registerBifrostFormInput: () => Promise<void>;
}

export function ToggleGroupUIBlock({
  configuration: { label, options, formQuestionId: questionId },
  registerBifrostFormInput,
}: ToggleGroupUIBlockProps) {
  const {
    setResponseToQuestion,
    maybeGetQuestionWithResponseByFormQuestionId,
    deleteResponseToQuestion,
  } = useBifrostFormState();

  const maybeQuestionWithResponse =
    maybeGetQuestionWithResponseByFormQuestionId({
      formQuestionId: questionId,
    });

  const maybeQuestionResponse: string =
    (maybeQuestionWithResponse?.response as string) || "";

  const handleOnChange = (value: string) => {
    if (value === "") {
      deleteResponseToQuestion({
        formQuestionId: questionId,
      });
    } else {
      setResponseToQuestion({
        questionWithResponse: {
          formQuestionId: questionId,
          responseType: QuestionResponseType.STRING,
          response: value,
        },
      });
    }

    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_${questionId}`}>{label}</FormLabel>
      <ToggleGroup
        type="single"
        variant="outline"
        value={maybeQuestionResponse}
        onValueChange={handleOnChange}
        className="flex w-full space-x-4 py-2"
      >
        {options.map(({ label, keyValue }) => (
          <ToggleGroupItem key={keyValue} value={keyValue}>
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FormField>
  );
}
