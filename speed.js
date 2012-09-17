var playerArray	= new Array(4);//手持ちカードを入力する
var comArray	= new Array(4);
var P_HaveArray	= new Array(26);
var C_HaveArray	= new Array(26);
var P_kindArray	= new Array(4);
var C_kindArray	= new Array(4);
var countArray	= new Array(52);//既出カードの記憶
var PlaceArray	= new Array(2);
var r			= Math.floor(Math.random()*52) + 1;
var kind		= -1;
var n			= 0;
var OutFlag	= true;
var P_n			= 4;
var C_n			= 4;

function StartInit(){
	init();
	n	= 0;
	for(i=0;i<26;i++){
		P_HaveArray[i]	= [Number(r),kind];
		countArray[n]	= r;
		n++;
		r	= check();
		C_HaveArray[i]	= [Number(r),kind];
		countArray[n]	= r;
		n++;
		r	= check();
	}
	for(i=0;i<4;i++){
		playerArray[i]	= P_HaveArray[i][0];
		P_kindArray[i]	= P_HaveArray[i][1];
		document.getElementById("P_"+i).src	= "img/" + SelectKind(P_kindArray[i]) + playerArray[i] + ".gif";
		comArray[i]		= C_HaveArray[i][0];
		C_kindArray[i]	= C_HaveArray[i][1];;
		document.getElementById("C_"+i).src	= "img/" + SelectKind(C_kindArray[i]) + comArray[i] + ".gif";
	}
}
function Ready(){
	PutCheck();
	if(OutFlag && (P_n < 26 && C_n < 26)){
		PlaceArray[0]	= P_HaveArray[P_n][0];
		document.getElementById("O_0").src	= "img/" + SelectKind(P_HaveArray[P_n][1]) + PlaceArray[0] + ".gif";
		P_n++;
		PlaceArray[1]	= C_HaveArray[C_n][0];
		document.getElementById("O_1").src	= "img/" + SelectKind(C_HaveArray[C_n][1]) + PlaceArray[1] + ".gif";
		C_n++;
	}else if(P_n >= 26 || C_n >= 26){
		Result();
	}
}
function PutCheck(){
	for(i=0;i<4;i++){
		var P_Sub1	= Math.abs(playerArray[i]-PlaceArray[0]);
		var C_Sub1	= Math.abs(comArray[i]-PlaceArray[0]);
		var P_Sub2	= Math.abs(playerArray[i]-PlaceArray[1]);
		var C_Sub2	= Math.abs(comArray[i]-PlaceArray[1]);
		if(P_Sub1==1 || P_Sub2==1 || P_Sub1==12 || P_Sub2==12 || C_Sub1==1 || C_Sub2==1 || C_Sub1==12 || C_Sub2==12){
			OutFlag	= false;
			break;
		}else{
			OutFlag	= true;
		}
	}
}
function Put(PC,P_x,P_Array,KindArray,HaveArray,boo,PC_n){//O_x:どちらの場か0,1　O_y:場の何枚目か0:52 P_x:手持ちの右から何番目か0:3 P_Array:手持ちの配列playerArray,comArray
	for(i=0;i<2;i++){
		if(Math.abs(P_Array[P_x]-PlaceArray[i])==1 || Math.abs(P_Array[P_x]-PlaceArray[i])==12){
			PlaceArray[i]		= P_Array[P_x];
			document.getElementById("O_"+i).src	= "img/" + SelectKind(KindArray[P_x]) + PlaceArray[i] + ".gif";
			if(PC_n<26){
				P_Array[P_x]	= HaveArray[PC_n][0];
				KindArray[P_x]	= HaveArray[PC_n][1];
				if(boo){P_n++;}
				else{C_n++;}
				document.getElementById(PC+"_"+P_x).src	= "img/" + SelectKind(KindArray[P_x]) + P_Array[P_x] + ".gif";
			}else{
				P_Array[P_x]	= 100;
				document.getElementById(PC+"_"+P_x).src	= "img/uk0.gif";
			}
		}
	}
}	
function ComPut(){
	setTimeout("ComPut()",500);
	var Ran	= Math.floor(Math.random()*4);
	Put("C",Ran,comArray,C_kindArray,C_HaveArray,false,C_n);
}
function Result(){
	var P_NUM	= 0;
	var C_NUM	= 0;
	for(i=0;i<4;i++){
		if(playerArray[i] > 0 && playerArray[i] < 14){
			P_NUM++;
		}
		if(comArray[i] > 0 && comArray[i] < 14){
			C_NUM++;
		}
	}
	if(P_NUM < C_NUM){
		document.getElementById("Result").innerHTML="You are WINNER!";
	}else if(P_NUM == C_NUM){
		document.getElementById("Result").innerHTML="It's DRAW!";
	}else{
		document.getElementById("Result").innerHTML="I'm WINNER!";
	}
}

function init(){
	P_n			= 4;
	C_n			= 4;
	for(k=0;k<countArray.length;k++){
		countArray[k]	= 0;
	}
	for(k=0;k<PlaceArray.length;k++){
		PlaceArray[k]	= -100;
		document.getElementById("O_"+k).src	= "img/uk0.gif";
	}
	for(k=0;k<playerArray.length;k++){
		playerArray[k]	= 100;
		comArray[k]	= 100;
		document.getElementById("P_"+k).src	= "img/uk"+(4-k)+".gif";
		document.getElementById("C_"+k).src	= "img/uk"+(k+1)+".gif";
	}
	document.getElementById("message").innerHTML	= "E n j o y  S P E E D !";
	document.getElementById("message").style.left	= 80;
	document.getElementById("Result").innerHTML		= "Result";
}
function check(){
	var Ran = Math.floor(Math.random()*52) + 1;
	for(k=0;k<countArray.length;k++){
		if(Ran==countArray[k]){
			Ran	= Math.floor(Math.random()*52) + 1;
			k	= 0;
		}
	}
	return Ran;
}
function Number(x){
	if(0<x && x<14){
		kind	= 0;
		return x;
	}else if(13<x && x<27){
		kind	= 1;
		return x-13;
	}else if(26<x && x<40){
		kind	= 2;
		return x-26;
	}else{
		kind	= 3;
		return x-39;
	}
}
function SelectKind(x){
	if(x==0){
		return "d";
	}else if(x==1){
		return "c";
	}else if(x==2){
		return "h";
	}else{
		return "s";
	}
}

function message(){
	setTimeout("message()",300);
	var obj			= document.getElementById("message");
	var Msg			= obj.innerHTML;
	obj.innerHTML	= Msg.substring(1,Msg.length) + Msg.substring(0,1);
}