import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";

/**
 * Gets cell values from a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The sheet range.
 * @return {obj} spreadsheet information
 */
export const getValues = async (spreadsheetId: string, range: string) => {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const service = google.sheets({ version: "v4", auth });
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const numRows = result.data.values ? result.data.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
};
