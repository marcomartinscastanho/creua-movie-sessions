import { GoogleSpreadsheet } from "google-spreadsheet";

export type DirectorRow = {
  name: string;
  country: string;
  period: string;
  decade: number;
};

export const getSheetData = async (): Promise<DirectorRow[]> => {
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
  const headerPeriod = headers[4];
  const headerDecade = headers[5];

  return sheet.getRows().then((rows) =>
    rows.map((row) => ({
      name: row.get(headerName),
      country: row.get(headerCountry),
      period: row.get(headerPeriod),
      decade: row.get(headerDecade),
    }))
  );
};
