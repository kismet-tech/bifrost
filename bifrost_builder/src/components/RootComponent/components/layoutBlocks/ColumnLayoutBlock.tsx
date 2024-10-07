import { ColumnsLayoutBlockConfiguration } from "@/models/configuration";

export interface ColumnLayoutBlockProps {
  columnsLayoutBlockConfiguration: ColumnsLayoutBlockConfiguration;
}

export function ColumnLayoutBlock({
  columnsLayoutBlockConfiguration,
}: ColumnLayoutBlockProps) {
  return <div>{columnsLayoutBlockConfiguration.blockType}</div>;
}
