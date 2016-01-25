var fs=require('fs')
var tags=fs.readFileSync("tags.json")
tags=JSON.parse(tags)/* Ex. 'tags.tag_name' gives replacement string for tag_name */
var ifile=fs.readFileSync("input.html")

var table=[]

function parseTag(str){
	var repStr="";
	k=str.split(/ +| *=+ */ );
	var tag_name=k[0]
	var jsonstr="{"
	for(var i=1;i<k.length;i++){
		if(i%2){
			k[i]='"'+k[i]+'"'+":"
		}
		else{
			if(i!=(k.length-1))
				k[i]+=','
		}
		jsonstr+=k[i]
	}
	jsonstr+="}"
	tag=JSON.parse(jsonstr);
	if(tags.hasOwnProperty(tag_name)){
		repStr+=tags[tag_name][""]
		var tag={"font":"getfont()","background":"getImg()","src":"gadjahs/adjha"}//htmltojson(str);
		/*for( var attr in tag){
			if(tags[tag_name].hasOwnProperty(attr)){
				repStr+=tags[tag_name][attr];
			}
		}*/
		if(tag.hasOwnProperty("src")){
			table.push({[tag_name]:tag["src"]})
		}
		if(tag.hasOwnProperty("link")){
			table.push({[tag_name]:tag["link"]})
		}
		if(tag.hasOwnProperty("href")){
			table.push({[tag_name]:tag["href"]})
		}
	}
	return repStr
}

function getTag(strp){
	var startIndex = strp.indexOf("<");
	if(startIndex != -1){
		var strRet = "";
		if(startIndex>0){
			strRet = strp.substr(0,startIndex-1);
		}
		var endIndex = strp.indexOf(">");

		var tagStr = strp.substring(startIndex+1,endIndex);
		tagStr = parseTag(tagStr);

		strRet = strRet + tagStr + getTag(strp.substr(endIndex+1));

		return strRet;
	}
	return strp;
}

console.log(getTag(ifile.toString()));
//console.log(table);