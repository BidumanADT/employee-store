const XLSX = require("xlsx")
const fs = require("fs")
const path = require("path")

const convertExcelToJson = () => {
  // Load excel file
  const workbook = XLSX.readFile(
    "../src/data/dynamicstore_product_catalog_20231116.xlsx"
  )

  // Data is on sheet1
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  // Convert to JSON
  const data = XLSX.utils.sheet_to_json(sheet)

  // Write JSON to file
  const outputPath = path.join(__dirname, "data/inventory.json")
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
}

convertExcelToJson()
