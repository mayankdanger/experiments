str='<html clr ="sad sds" p="ada afs fafs" gg="da-da">';
var attrRegex=/[\w]+\s*\=\s*"[^"]+"/g;

var pairs=str.match(attrRegex);
console.log(str.replace(/([\w]+)\s*\=\s*("[^"]+")/g,'"$1":$2,'));


