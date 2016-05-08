/*
tags contain the tags as json object: tags->tag_name->attribute
ifile is the given html file converted to string
*/
var fs=require('fs');
var list=fs.readFileSync("tags.json");
var tags=JSON.parse(list);/* Ex. 'replace.tag' gives replacement string for tag */
var ifile=fs.readFileSync("input.html");

function getTag(strp){

	var startIndex = strp.indexOf("<");
	if(startIndex != -1){
		var strRet = "";
		if(startIndex>0){
			strRet = strp.substr(0,startIndex);
		}
		var endIndex = strp.indexOf(">");

		var tagStr = strp.substring(startIndex+1,endIndex);
		tagStr = parseTag(tagStr);

		strRet = strRet + tagStr + getTag(strp.substr(endIndex+1));

		return strRet;
	}
	return strp;
}
/*
parseTag() parses the given html tag. calculates and return repStr i.e. replacement to be
made by going through each attribute and finding its replacement in tags.json (now tags object)
*/
function parseTag(str){
	var repStr="";
	var tag=tagToJson(str);
	var tag_name=""// to find first word in str
	var table=[];
	var tagRegex = /\s*[\w]+/g;
	tag_name = str.match(tagRegex)[0];

	tagToJsonObj(str,tag_name);

	if(tags.hasOwnProperty(tag_name)){
		repStr+=tags[tag_name][""];
		for( var attr in tag){
			if(tags[tag_name].hasOwnProperty(attr)){
				repStr+=tags[tag_name][attr];
			}
		}
		/*
			if tag has any img,link or href record it in corrosponding table. for future refrence.
		*/
		if(tag.hasOwnProperty("src")){
			table.push({[tag_name]:tag["src"]});
		}
		if(tag.hasOwnProperty("link")){
			table.push({[tag_name]:tag["link"]});
		}
		if(tag.hasOwnProperty("href")){
			table.push({[tag_name]:tag["href"]});
		}
	}
	return repStr;
}
/*
converts given tag EX:<body face="arial" color="red" class="container col-md-12"> to json:
{
	"face":"arial",
	"color":"red",
	"class":"container col-md-12"
}
if no attribute found returns empty json {}
*/
function tagToJsonObj(str,tag_name){

	var attrRegex=/[\w]+\s*\=\s*"[^"]+"/g;
	jsonObj = "{\""+tag_name+"\":{";
	//console.log(jsonObj);
	var pairs=str.match(attrRegex);
	for(var i in pairs){
		pairs[i] = pairs[i].replace(/([\w]+)\s*\=\s*("[^"]+")/g,'"$1":$2');
		if(i!=0)
			jsonObj += ",";
		jsonObj += pairs[i];
	}
	jsonObj += "}}";
	jsonObj = JSON.parse(jsonObj);
	console.log(jsonObj);
}

function tagToJson(str){
	str=str.trim();
	return str;
}

console.log(getTag(tagToJson(ifile.toString())));// calling for parsing