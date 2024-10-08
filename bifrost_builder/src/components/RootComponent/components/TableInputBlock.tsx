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
  BifrostFormDataValue,
  BifrostKeyPath,
} from "@/models/configuration/formData";
import { UIBlock } from "./uiBlocks/UIBlock";
import { Button } from "@/components/ui/button";
import { getValueFromBifrostFormDataByKeyPath } from "@/utilities/formData/getValueFromBifrostFormDataByKeyPath";

interface TableInputBlockProps {
  configuration: InputTableLayoutBlockConfiguration;
  keyPath: BifrostKeyPath;
  formData: BifrostFormData;
  hotelId: string;
  bifrostTravelerId: string;
  handleSetFormData: ({
    keyPath,
    keyValue,
  }: {
    keyPath: BifrostKeyPath;
    keyValue: BifrostFormDataValue;
  }) => void;
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => void;
}

export function TableInputBlock({
  configuration: { keyName, columns },
  keyPath,
  formData,
  hotelId,
  bifrostTravelerId,
  handleSetFormData,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: TableInputBlockProps) {
  const tableData = getValueFromBifrostFormDataByKeyPath({
    formData,
    keyPath: [...keyPath, keyName],
  }) || [{}];

  const handleAddRow: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    handleSetFormData({
      keyPath: [...keyPath, keyName, tableData.length],
      keyValue: {},
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

  const tableRows = tableData.map((_, rowIndex: number) => {
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
              handleSetFormData={handleSetFormData}
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
