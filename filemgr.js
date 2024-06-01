const fs = require("fs/promises");

async function ReadData() {
  try {
    // Make sure the file exists
    const data = await fs.readFile("listdata.json", "utf8");
    // Convert the buffer to a JSON object and return it
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or there's another error, log it and return an empty array
    console.error("Error reading file:", error);
    return [];
  }
}

async function WriteData(dataOut) {
  try {
    // Write the file with JSON stringified data
    await fs.writeFile("listdata.json", JSON.stringify(dataOut, null, 2));
  } catch (error) {
    // Log any errors during the writing process
    console.error("Error writing file:", error);
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
