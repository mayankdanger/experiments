var fs=require('fs')
var list=fs.readFileSync("replace.json")
var replace=JSON.parse(list)/* Ex. 'replace.tag' gives replacement string for tag */
console.log(replace.br)