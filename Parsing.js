/*
	<html>     	-> null
	<br>    	-> \n
	<p>    		-> \n
	<img> 		-> store in seperate array
	hyperlink	-> store in seperate array
*/

var str = "<p> Lo hogayi jugaad </p> hbkas <br> sadkjasd <p> khbkafs </p> ";

function parseTheString(strp){

	strp = tagParse(strp,"<p>","\n");
	strp = tagParse(strp,"</p>","");
	strp = tagParse(strp,"<br>","\n");

	return strp;
}

function tagParse(strp,tag,Replacement){


	var Str = strp.split(tag);
	var strRet = Str[0];

	//console.log(StartStr);

	for(var i=1 ; i<Str.length ; i++){
		//console.log(Str[i]);
		strRet = strRet + Replacement + Str[i];
		//console.log(strRet);
	}

	return strRet;
}

console.log(parseTheString(str));