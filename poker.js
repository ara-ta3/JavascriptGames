var countArray	= new Array(10);//既出カードの記憶
var KindArray	= new Array(5);
var playerArray	= new Array(5);//手持ちカードを入力する
var FlagArray	= new Array(5);
var BufferArray	= new Array(5);
var r			= Math.floor(Math.random()*52) + 1;
var i,n;
var Score		= 1000;
var bet			= 100;
var StartFlag	= true;
function getScore(){
	var obj		= document.getElementById("Point");
	bet 		= obj.value;
	if(Score < 0 || isNaN(bet) || bet==0){
		StartFlag	= false;
	}else{
		Score		= Score - bet;
		document.getElementById("score").innerHTML = "You have "+Score+" POINTS !<br>Bet Your POINTS and Click Start Button !";
	}
}
function StartInit(){
	if(StartFlag){
		init();
		document.getElementById("change").style.visibility	= "visible";
		document.getElementById("stay").style.visibility	= "visible";
		document.getElementById("explain").style.visibility	= "visible";
		document.getElementById("Result").innerHTML="Result";
		for(i=0;i<5;i++){
			playerArray[i]	= Number(r);
			countArray[n]	= r;
			KindArray[i]	= kind;
			document.getElementById("P_" +i).src	= "img/" + SelectKind(kind) + playerArray[i] + ".gif";
			n++;
			r	= check();
		}
	}else{
		alert("You don't have enough POINTS ! or don't type your Bet !");
	}
}
function Result(){
	var FlashFlag	= false;
	var BufferArray	= new Array(5);
	if(KindArray[0]==KindArray[1] && KindArray[0] == KindArray[2] && KindArray[0] == KindArray[3] && KindArray[0] == KindArray[4]){
		FlashFlag	= true;
	}
	for(i=0;i<BufferArray.length;i++){
		BufferArray[i]	= playerArray[i];
	}
	BufferArray.sort(function(a, b){
		return (parseInt(a) > parseInt(b)) ? 1 : -1;
	});
	var Four		= BufferArray[2];
	var Three		= BufferArray[2];
	var FullHouse_1	= BufferArray[0];
	var FullHouse_2	= BufferArray[4];
	var Two_1		= BufferArray[1];
	var Two_2		= BufferArray[3];
	if(BufferArray[0]==1 && BufferArray[1]==10 && BufferArray[2]==11 && BufferArray[3]==12 && BufferArray[4]==13){
		alert("Royal Straight Flush！！！！");
		document.getElementById("Result").innerHTML="Royal Straight Flush！！！！<br>You Get 100 Times Score!";
		bet = bet * 100;
	}else if(StraightCheck(BufferArray) && FlashFlag){
		alert("Straight Flush！！！");
		document.getElementById("Result").innerHTML="Straight Flush！！！<br>You Get 50 Times Score!";
		bet = bet * 50;
	}else if(BufferArray[1]==Four && BufferArray[3]==Four && (BufferArray[0]==Four || BufferArray[4]==Four)){
		alert("4 of a KIND！！");
		document.getElementById("Result").innerHTML="4 of a KIND！！<br>You Get 20 Times Score!";
		bet = bet * 20;
	}else if(BufferArray[1]==FullHouse_1 && BufferArray[3]==FullHouse_2 && (FullHouse_1 - Four)*(FullHouse_2 - Four)==0){
		alert("Full House！！");
		document.getElementById("Result").innerHTML="Full House！！<br>You Get 7 Times Score!";
		bet = bet * 7;
	}else if(FlashFlag){
		alert("Flush！！" );
		document.getElementById("Result").innerHTML="Flush！！<br>You Get 5 Times Score!";
		bet = bet * 5;
	}else if(StraightCheck(BufferArray)){
		alert("Straight！！");
		document.getElementById("Result").innerHTML="Straight！！<br>You Get 4 Times Score!";
		bet = bet * 4;
	}else if((BufferArray[1]==Three && (BufferArray[0]==Three || BufferArray[3]==Three)) ||(BufferArray[3]==Three && BufferArray[4]==Three)){
		alert("3 of a KIND！");
		document.getElementById("Result").innerHTML="3 of a KIND！<br>You Get 3 Times Score!";
		bet = bet * 3;
	}else if((Two_1==BufferArray[0] || Two_1 == BufferArray[2]) && (Two_2==BufferArray[2] || Two_2==BufferArray[4])){
		alert("2 PAIRS");
		document.getElementById("Result").innerHTML="2 PAIRS<br>You Get 2 Times Score!";
		bet = bet * 2;
	}else{
		alert("NOTHING （´、ゝ｀）");
		document.getElementById("Result").innerHTML="NOTHING<br>Oh No !（´、ゝ｀）";
		bet = 0;
	}
	Score = Score + bet;
	document.getElementById("score").innerHTML = "You have "+Score+" POINTS !<br>Bet Your POINTS and Click Start Button !";
}
function StraightCheck(array){
	var Sub = new Array(4);
	for(i=0;i<Sub.length;i++){
		Sub[i]	= array[i+1] - array[i];
	}
	if(Sub[0]*Sub[1]*Sub[2]*Sub[3] == 1){
		return true;
	}else{
		return false;
	}
}
function Return(Id,num){
	if(FlagArray[num]){
		BufferArray[num]				= document.getElementById(Id).src;
		document.getElementById(Id).src	= "img/uk0.gif";
		FlagArray[num]					= !FlagArray[num];
	}else{
		document.getElementById(Id).src	= BufferArray[num];
		FlagArray[num]					= !FlagArray[num];
	}
}
function change(){
	for(a=0;a<FlagArray.length;a++){
		if(!FlagArray[a]){
			playerArray[a]	= Number(r);
			countArray[n]	= r;
			KindArray[a]	= kind;
			document.getElementById("P_" +a).src	= "img/" + SelectKind(kind) + playerArray[a] + ".gif";
			n++;
			r	= check();
			FlagArray[a]	= !FlagArray[a];
		}
	}
	document.getElementById("change").style.visibility	= "hidden";
	document.getElementById("stay").style.visibility	= "hidden";
	document.getElementById("explain").style.visibility	= "hidden";
	Result();
}
function stay(){
	document.getElementById("change").style.visibility	= "hidden";
	document.getElementById("stay").style.visibility	= "hidden";
	document.getElementById("explain").style.visibility	= "hidden";
	Result();
}
	
function init(){
	for(k=0;k<countArray.length;k++){
		countArray[k]	= 0;
	}
	for(k=0;k<FlagArray.length;k++){
		FlagArray[k]	= true;
	}
	n=0;
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
	}else if(39<x && x<53){
		kind	= 3;
		return x-39;
	}else{
		kind	= 4;
		return x-52;
	}
}
function SelectKind(x){
	if(x==0){
		return "d";
	}else if(x==1){
		return "c";
	}else if(x==2){
		return "h";
	}else if(x==3){
		return "s";
	}else{
		return "j";
	}
}
function message(){
	setTimeout("message()",300);
	var obj			= document.getElementById("message");
	var Msg			= obj.innerHTML;
	obj.innerHTML	= Msg.substring(1,Msg.length) + Msg.substring(0,1);
}