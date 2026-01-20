
function initialize() {
	preload("topImgPc", "./img/top/top_pc_s.png", "./img/top/top_pc.png");
	preload("topImgSp", "./img/top/top_sp_s.png", "./img/top/top_sp.png");
}

function preload(elemId, preSrc, src) {

   	document.getElementById(elemId).onload = function() {
    	document.getElementById(elemId).onload = null;
        document.getElementById(elemId).src = src;
    }
    document.getElementById(elemId).src = preSrc;
}
