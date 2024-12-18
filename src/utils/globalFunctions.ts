import { utils, writeFile } from 'xlsx';

export function exportToExcel(data: any, fileName: string) {
  const excelHeader = ['ID', 'Nazwa', 'Wartość'];
  // Add an ID column with auto-generated numbers
  const dataWithId = data.map((row: any, index: number) => ({
    ID: index + 1,
    ...row
  }));
  const worksheet = utils.json_to_sheet(dataWithId);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, `${fileName}`);
  utils.sheet_add_aoa(worksheet, [excelHeader], { origin: 'A1' });

  // Calculate the maximum width for each column
  const maxLengths = excelHeader.map((header, index) => {
    return Math.max(header.length, ...dataWithId.map((row: any) => row[Object.keys(row)[index]].toString().length));
  });

  // Set the column width in the worksheet
  worksheet['!cols'] = maxLengths.map((length) => ({ wch: length }));
  writeFile(workbook, `${fileName}.xlsx`, { compression: true });
}
