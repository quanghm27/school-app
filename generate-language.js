let fs = require('fs')
let GoogleSpreadsheet = require('google-spreadsheet')
let async = require('async')

// spreadsheet key is the long id in the sheets URL
let sheet = new GoogleSpreadsheet('1C8EbufvSbHqjU33Y_HzIxFTJ236IWstxkLcuCIs9dPc')

async.series(
  [
    function setAuth(step) {
      // see notes below for authentication instructions!
      let creds = require('./myschool-textkey')
      sheet.useServiceAccountAuth(creds, step)
    },
    function workingWithRows(step) {
      // google provides some query options
      sheet.getRows(1, { offset: 1 }, function(_, rows) {
        const objKr = {}
        const objEn = {}
        const objVi = {}

        rows.forEach(row => {
          if (row.id === null || typeof row.id === 'undefined') {
            return
          }

          objKr[row.id] = row.ko.replace('�', '')
          objEn[row.id] = row.en.replace('�', '')
          objVi[row.id] = row.viconfirmed.replace('�', '')
        })

        fs.writeFile('./translation/ko.json', JSON.stringify(objKr), 'utf8', () => {
          console.log('OK KR')
        })

        fs.writeFile('./translation/en.json', JSON.stringify(objEn), 'utf8', () => {
          console.log('OK EN')
        })

        fs.writeFile('./translation/vi.json', JSON.stringify(objVi), 'utf8', () => {
          console.log('OK VI')
        })
      })
    },
  ],
  function(err) {
    if (err) {
      console.log('Error: ' + err)
    }
  },
)
