var fs=require('fs')
var tags=fs.readFileSync("tags.json")
tags=JSON.parse(tags)/* Ex. 'tags.tag_name' gives replacement string for tag_name */
var ifile=fs.readFileSync("input.html")
st='  button type="button" class="btn btn-info"';

function tagToJson(str){
	str=str.trim();
}

function parseTag(str){
	var repStr="";
	var tag=tagToJson(str);
	var tag_name=tag[0];
	var tags=tag[1];
	if(tags.hasOwnProperty(tag_name)){
		repStr+=tags[tag_name][""]
		for( var attr in tag){
			if(tags[tag_name].hasOwnProperty(attr)){
				repStr+=tags[tag_name][attr];
			}
		}
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
console.log(parseTag(st));*/

function getTag(str){
	var tagRegex = /<\/?[^>]*>+/g;
	var tmpArray;
	var tagsFound=[];
	/*execute regex search on string. search starts from postion lastIndex(read only prop of regex)*/
	
	while ((tmpArray = (tagRegex.exec(str)) !== null) {
		tagsFound.push(tmpArray[0]);
	}
		return tagsFound;
}
console.log(getTag(ifile.toString()));
//console.log(table);
