import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputTableLayoutBlockColumnConfiguration,
  InputTableLayoutBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import {
  BifrostFormData,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { Button } from "@/components/ui/button";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";
import { UIBlock } from "../../uiBlocks/UIBlock";
import { mutateFormDataAtKeyPath } from "@/utilities/formData/mutateFormDataAtKeyPath";

interface InputTableLayoutBlockProps {
  configuration: InputTableLayoutBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  setFormData: (
    previousFormData: React.SetStateAction<BifrostFormData>
  ) => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function InputTableLayoutBlock({
  configuration: { keyName, columns },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  setFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: InputTableLayoutBlockProps) {
  const tableData = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: [...keyPath, keyName],
  }) || [{}];

  const handleAddRow: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    mutateFormDataAtKeyPath({
      keyPath: [...keyPath, keyName, tableData.length],
      keyValue: {},
      setFormData,
    });
  };

  const renderedColumnHeaders = columns.map(
    (column: InputTableLayoutBlockColumnConfiguration, columnIndex) => {
      return (
        <TableHead key={columnIndex}>
          {column.columnHeader.columnHeaderText}
        </TableHead>
      );
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableRows = tableData.map((_: any, rowIndex: number) => {
    const renderedTableCells = columns.map(
      (
        column: InputTableLayoutBlockColumnConfiguration,
        columnIndex: number
      ) => {
        return (
          <TableCell key={`${rowIndex}_${columnIndex}`}>
            <UIBlock
              configuration={column.inputCell}
              keyPath={[...keyPath, keyName, rowIndex]}
              formData={formData}
              hotelId={hotelId}
              bifrostTravelerId={bifrostTravelerId}
              setFormData={setFormData}
              handleSubmitFormData={handleSubmitFormData}
              pushScreenConfigurationStack={pushScreenConfigurationStack}
              popRightscreenConfigurationStack={
                popRightscreenConfigurationStack
              }
              registerBifrostFormInput={registerBifrostFormInput}
            />
          </TableCell>
        );
      }
    );

    return <TableRow key={`${rowIndex}`}>{renderedTableCells}</TableRow>;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>{renderedColumnHeaders}</TableRow>
        </TableHeader>
        <TableBody>{tableRows}</TableBody>
      </Table>
      <Button onClick={handleAddRow}>Add Row</Button>
    </>
  );
}