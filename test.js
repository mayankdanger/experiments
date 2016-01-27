str='<html clr ="sad sds" p="ada afs fafs" gg="da-da">';
var attrRegex=/[\w]+\s*\=\s*"[^"]+"/g;
jsonObj = "{";
//console.log(jsonObj);
var pairs=str.match(attrRegex);
for(var i in pairs){
	pairs[i] = pairs[i].replace(/([\w]+)\s*\=\s*("[^"]+")/g,'"$1":$2');
	if(i!=0)
		jsonObj += ",";
	jsonObj += pairs[i];
}
jsonObj += "}";
var jsonObj = JSON.parse(jsonObj);
console.log(jsonObj);



