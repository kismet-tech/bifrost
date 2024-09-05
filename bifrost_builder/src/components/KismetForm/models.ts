export enum FormFieldType {
  TEXT = "TEXT",
  SELECT = "SELECT",
  TEXT_AREA = "TEXT_AREA",
}

export interface BaseFormFieldConfiguration {
  formFieldType: FormFieldType;
}

export interface TextFormFieldConfiguration extends BaseFormFieldConfiguration {
  formFieldType: FormFieldType.TEXT;

  label: string;
  name: string;
  placeholder: string;
  inputType: React.HTMLInputTypeAttribute;
}

export interface TextAreaFormFieldConfiguration
  extends BaseFormFieldConfiguration {
  formFieldType: FormFieldType.TEXT_AREA;

  label: string;
  name: string;
  placeholder: string;
}

export interface SelectFormFieldConfigurationOption {
  label: string;
  name: string;
}

export interface SelectFormFieldConfiguration
  extends BaseFormFieldConfiguration {
  formFieldType: FormFieldType.SELECT;

  label: string;
  name: string;
  options: SelectFormFieldConfigurationOption[];
}

export type FormFieldConfiguration =
  | TextFormFieldConfiguration
  | TextAreaFormFieldConfiguration
  | SelectFormFieldConfiguration;
