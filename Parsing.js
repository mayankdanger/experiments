var fs=require('fs')
var list=fs.readFileSync("replace.json")
var replace=JSON.parse(list)/* Ex. 'replace.tag' gives replacement string for tag */
var ifile=fs.readFileSync("input.html")

function parseTheString(strp){
	for (var tag in replace) {
    	strp = tagParse(strp,tag,replace[tag]);
	}
	return strp;
}

function tagParse(strp,tag,Replacement){
	var Str = strp.split(tag);
	var strRet = Str[0];
	for(var i=1 ; i<Str.length ; i++){
		var temp = Str[i].indexOf(">");
		var fstr = Str[i].substr(temp+1);
		strRet = strRet + Replacement + fstr;
	}
	return strRet;
}
console.log(parseTheString(ifile.toString()));