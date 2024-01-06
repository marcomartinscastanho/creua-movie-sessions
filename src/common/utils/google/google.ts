import { GoogleSpreadsheet } from "google-spreadsheet";

type Director = {
  name: string;
  country: string;
  decade: number;
};

export const getSheetData = async (): Promise<Director[]> => {
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

  if (!SPREADSHEET_ID) {
    throw Error("REACT_APP_SPREADSHEET_ID env variable not set");
  }

  if (!GOOGLE_SHEETS_API_KEY) {
    throw Error("REACT_APP_GOOGLE_SHEETS_API_KEY env variable not set");
  }

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, { apiKey: GOOGLE_SHEETS_API_KEY });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadHeaderRow();
  const headers = sheet.headerValues;
  const headerName = headers[0];
  const headerCountry = headers[3];
  const headerDecade = headers[5];

  return sheet.getRows().then((rows) =>
    rows.map((row) => ({
      name: row.get(headerName),
      country: row.get(headerCountry),
      decade: row.get(headerDecade),
    }))
  );
};
