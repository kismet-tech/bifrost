import { TextInputUIBlockConfiguration } from "@/models/configuration";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FormField } from "../../styles/FormField";
import { FormLabel } from "../../styles/FormLabel";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { FormQuestionResponseType } from "@/models/formQuestions/questionWithResponse";

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
  const [isValid, setIsValid] = useState<boolean>(true);
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

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (inputType === "email") {
      const isValidEmail = validateEmail(value);
      setIsValid(isValidEmail);
    }

    setResponseToQuestion({
      questionWithResponse: {
        formQuestionId: formQuestionId,
        responseType: FormQuestionResponseType.STRING,
        response: value,
      },
    });

    setLocalValue(value);
    registerBifrostFormInput();
  };

  const handlePhoneValueChange = (values: any) => {
    const { value } = values;
    let digitsOnly = value.replace(/\D/g, "");

    // Remove leading '1' if present
    if (digitsOnly.startsWith("1")) {
      digitsOnly = digitsOnly.substring(1);
    }

    // Format the digits into (###)-###-####
    let formattedNumber = digitsOnly;
    if (digitsOnly.length > 0) {
      formattedNumber = digitsOnly.replace(
        /(\d{0,3})(\d{0,3})(\d{0,4})/,
        (
          _match: string,
          p1: string | undefined,
          p2: string | undefined,
          p3: string | undefined
        ) => {
          let result = "";
          if (p1) result += `(${p1}`;
          if (p1 && p1.length === 3) result += `)`;
          if (p2) result += `-${p2}`;
          if (p3) result += `-${p3}`;
          return result;
        }
      );
    }

    const isValidPhone = digitsOnly.length === 10;

    setIsValid(isValidPhone);

    setResponseToQuestion({
      questionWithResponse: {
        formQuestionId: formQuestionId,
        responseType: FormQuestionResponseType.STRING,
        response: formattedNumber,
      },
    });

    setLocalValue(formattedNumber);
    registerBifrostFormInput();
  };

  return (
    <FormField>
      <FormLabel htmlFor={`form_text_input_ui_block_${formQuestionId}`}>
        {label}
      </FormLabel>
      {inputType === "tel" ? (
        <>
          <Input
            onChange={(e) => {
              handlePhoneValueChange({ value: e.target.value });
            }}
            value={localValue}
            id={`form_text_input_ui_block_${formQuestionId}`}
            placeholder={placeholder}
            autoComplete={autocomplete}
          />
          {!isValid && localValue.length > 0 && (
            <small style={{ color: "red" }}>
              Please enter a valid phone number
            </small>
          )}
        </>
      ) : (
        <>
          <Input
            onChange={handleOnChange}
            type={inputType}
            id={`form_text_input_ui_block_${formQuestionId}`}
            placeholder={placeholder}
            autoComplete={autocomplete}
            value={localValue}
          />
          {inputType === "email" && !isValid && (
            <small style={{ color: "red" }}>
              Please enter a valid email address
            </small>
          )}
        </>
      )}
    </FormField>
  );
}
