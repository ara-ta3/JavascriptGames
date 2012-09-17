var playerArray	= new Array(12);//手持ちカードを入力する
var comArray	= new Array(12);
var comKind		= new Array(12);
var countArray	= new Array(24);//既出カードの記憶
var i,j,n,SUM_P,SUM_C,flag1,flag2,kind;
var r			= Math.floor(Math.random()*52) + 1;

function message(){
	setTimeout("message()",300);
	var obj			= document.getElementById("message");
	var Msg			= obj.innerHTML;
	obj.innerHTML	= Msg.substring(1,Msg.length) + Msg.substring(0,1);
}

function init(){
	flag1 		= false;
	flag2		= false;
	kind		= -1;
	for(k=0;k<countArray.length;k++){
		countArray[k]	= 0;
	}
	for(k=2;k<12;k++){
		document.getElementById("P_" + k).style.visibility	= "hidden";
		document.getElementById("C_" + k).style.visibility	= "hidden";
	}
	document.getElementById("message").innerHTML	= "E n j o y  B l a c k  J a c k !";
	document.getElementById("message").style.left	= 35;
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
function ExSum(){
	document.getElementById("SUM_P").innerHTML = "SUM : " + SUM_P;
	document.getElementById("SUM_C").innerHTML = "SUM : " + SUM_C;
}
function StartInit(){
	init();
	n	= 0;
	i	= 2;
	j	= 2;
	playerArray[0]	= Number(r);
	countArray[n]	= r;
	document.getElementById("P_0").src	= "img/" + SelectKind(kind) + playerArray[0] + ".gif";
	n++;
	r	= check();
	comArray[0]		= Number(r);
	comKind[0]		= kind;
	countArray[n]	= r;
	document.getElementById("C_0").src	= "img/uk0.gif";
	n++;
	r	= check();
	playerArray[1]	= Number(r);
	countArray[n]	= r;
	document.getElementById("P_1").src	= "img/" + SelectKind(kind) + playerArray[1] + ".gif";
	n++;
	r	= check();
	comArray[1]		= Number(r);
	comKind[1]		= kind;
	countArray[n]	= r;
	document.getElementById("C_1").src	= "img/" + SelectKind(kind) + comArray[1] + ".gif";
	n++;
	r	= check();
	document.getElementById("draw").style.visibility="visible";
	document.getElementById("stay").style.visibility="visible";
	SUM_P			= sum(playerArray,2);
	SUM_C			= sum(comArray,2);
	ExSum();
}
function sum(Array,num){
	var SUM=0;
	for(k=0;k<num;k++){
		if(Array[k]>10){
			SUM+=10;
		}else{
			SUM+=Array[k];
		}
	}
	return SUM;
}
function draw(){
	var RANDOM		= Math.random();
	if(SUM_P>21){
		flag1=true;
	}
	if(SUM_C>21){
		flag2=true;
	}
	if(!flag1){
		playerArray[i]	= Number(r);
		countArray[n]	= r;
		document.getElementById("P_" + i).src	= "img/" + SelectKind(kind) + playerArray[i] + ".gif";
		document.getElementById("P_" + i).style.visibility	= "visible";
		n++;
		i++;
		r	= check();
		SUM_P			= sum(playerArray,i);
	}else{
		alert("21 OVER !");
	}
	if(!flag2){
		if(SUM_C<14){//14以下ならもう一枚
			comArray[j]		= Number(r);
			comKind[j]		= kind;
			countArray[n]	= r;
			document.getElementById("C_" + j).style.visibility	= "visible";
			n++;
			j++;
			r	= check();
			SUM_C			= sum(comArray,j);
		}else if(SUM_C<18){//18未満なら0.7の確率でもう一枚
			if(RANDOM < 0.5){
				flag2	= true;
			}else{
				comArray[j]		= Number(r);
				comKind[j]		= kind;
				countArray[n]	= r;
				document.getElementById("C_" + j).style.visibility	= "visible";
				n++;
				j++;
				r	= check();
				SUM_C			= sum(comArray,j);
			}
		}else if(SUM_C!=21){//18以上なら0.9の確率で終了
			if(RANDOM<0.9){
				flag2	= true;
			}else{
				comArray[j]		= Number(r);
				comKind[j]		= kind;
				countArray[n]	= r;
				document.getElementById("C_" + j).style.visibility	= "visible";
				n++;
				j++;
				r	= check();
				SUM_C			= sum(comArray,j);
			}
		}else{//21なら終了
			flag2		= true;
		}
	}
	ExSum();
	if(SUM_P>21){
		alert("21 OVER ! YOU LOSE (´、ゝ｀)");
		document.getElementById("draw").style.visibility= "hidden";
		document.getElementById("stay").style.visibility= "hidden";
		document.getElementById("message").innerHTML	= "G A M E O V E R !";
		document.getElementById("message").style.left	= 100;
		document.getElementById("Result").innerHTML="Y o u → "+SUM_P+"<br>I'm WINNER!";
	}
}
function stay(){//合計値出して、その値によって分類
	document.getElementById("draw").style.visibility="hidden";
	document.getElementById("stay").style.visibility="hidden";
	while(!flag2){
		var RANDOM		= Math.random();
		if(SUM_C>21){
			flag2=true;
		}
		if(SUM_C<15){//14以下ならもう一枚
			comArray[j]		= Number(r);
			comKind[j]		= kind;
			countArray[n]	= r;
			document.getElementById("C_" + j).style.visibility	= "visible";
			n++;
			j++;
			r	= check();
			SUM_C			= sum(comArray,j);
		}else if(SUM_C<18){//18未満なら0.3の確率でもう一枚
			if(RANDOM < 0.7){
				flag2	= true;
			}else{
				comArray[j]		= Number(r);
				comKind[j]		= kind;
				countArray[n]	= r;
				document.getElementById("C_" + j).style.visibility	= "visible";
				n++;
				j++;
				r	= check();
				SUM_C			= sum(comArray,j);
			}
		}else if(SUM_C!=21){//18以上なら0.9の確率で終了
			if(RANDOM<0.9){
				flag2	= true;
			}else{
				comArray[j]		= Number(r);
				comKind[j]		= kind;
				countArray[n]	= r;
				document.getElementById("C_" + j).style.visibility	= "visible";
				n++;
				j++;
				r	= check();
				SUM_C			= sum(comArray,j);
			}
		}else{//21なら終了
			flag2		= true;
		}
		ExSum();
	}
	Result();
}
function Result(){
	for(k=0;k<=j;k++){
		document.getElementById("C_" + k).src	= "img/" + SelectKind(comKind[k]) + comArray[k] + ".gif";
	}
	if(SUM_P > 21 && SUM_C > 21){
		document.getElementById("Result").innerHTML="Y o u → "+SUM_P+" : M e → "+SUM_C+"<br>It's DRAW!";
	}else if(SUM_P > SUM_C | SUM_C > 21){
		document.getElementById("Result").innerHTML="Y o u → "+SUM_P+" : M e → "+SUM_C+"<br>You are WINNER!";
	}else if(SUM_P < SUM_C){
		document.getElementById("Result").innerHTML="Y o u → "+SUM_P+" : M e → "+SUM_C+"<br>I'm WINNER!";
	}else{
		document.getElementById("Result").innerHTML="Y o u → "+SUM_P+" : M e → "+SUM_C+"<br>It's DRAW!";
	}
}
