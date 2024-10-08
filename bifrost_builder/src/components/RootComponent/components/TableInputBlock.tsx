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
  configuration: { columns },
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
  const renderedColumnHeaders = columns.map(
    (column: InputTableLayoutBlockColumnConfiguration) => {
      return <TableHead>{column.columnHeader.columnHeaderText}</TableHead>;
    }
  );

  console.log("formData");
  console.log(JSON.stringify(formData, null, 4));

  const tableRows = [1].map((_, rowIndex: number) => {
    const renderedTableCells = columns.map(
      (column: InputTableLayoutBlockColumnConfiguration) => {
        return (
          <TableCell>
            <UIBlock
              configuration={column.inputCell}
              keyPath={[...keyPath, rowIndex]}
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

    return <TableRow>{renderedTableCells}</TableRow>;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>{renderedColumnHeaders}</TableRow>
      </TableHeader>
      <TableBody>{tableRows}</TableBody>
    </Table>
  );
}
