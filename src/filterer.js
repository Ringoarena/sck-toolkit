const fs = require('fs')
const XLSX = require('xlsx')

const fbmembers = require('../input/fbmembers.json')
const iomembers = []

const workbook = XLSX.readFile('./input/ExportedPersons.xlsx')
const sheets = workbook.SheetNames;
for (let i = 0; i < sheets.length; i++) {
  const temp = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[i]])
  temp.forEach((res) => {
    iomembers.push({ name: `${res.Förnamn} ${res.Efternamn}`, miscInfo: res['Övrig medlemsinfo'] })
  })
}

const fbmFoundInIO = []
const fbmNotFoundInIO = []
fbmembers.forEach((fbm) => {
  const foundInIo = Boolean(iomembers.find((iom) => {
    let nameOrAliasMatched = false
    const nameMatches = iom.name.toLowerCase() === fbm.name.toLowerCase()
    if (nameMatches) {
      nameOrAliasMatched = true
    }
    const aliasMatches = iom.miscInfo.toLowerCase().includes(fbm.name.toLocaleLowerCase())
    if (aliasMatches) {
      nameOrAliasMatched = true
    }
    return nameOrAliasMatched
  }))
  if (foundInIo) {
    fbmFoundInIO.push(fbm)
  } else {
    fbmNotFoundInIO.push(fbm)
  }
})

console.log('iomembers length: ', iomembers.length)
console.log('fbmembers length: ', fbmembers.length)
console.log('fbm found in io: ', fbmFoundInIO.length)
console.log('fbm not found in io: ', fbmNotFoundInIO.length)

fs.writeFileSync('output/FBmembers_not_found_in_iIO.json', JSON.stringify(fbmNotFoundInIO, null, 2))
fs.writeFileSync('output/FBmembers_found_in_iIO.json', JSON.stringify(fbmFoundInIO, null, 2))

