var color	= ["#FF0000","#FF8000","#FFFF00","#00FF00","#00FFFF","#0000FF","#8000FF"];
var n		= Math.floor(Math.random()*7)+1;
function message(){
	setTimeout("message()",500);
	for(i=1;i<6;i++){
		document.getElementById("message_"+i).style.color	= color[n];
		n		= Math.floor(Math.random()*7);
	}
}