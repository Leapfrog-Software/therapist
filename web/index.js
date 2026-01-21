
function initialize() {
	preload("topImgPc", "./img/top/top_pc_s.png?20260121", "./img/top/top_pc.png?20260121");
	preload("topImgSp", "./img/top/top_sp_s.png?20260121", "./img/top/top_sp.png?20260121");
}

function preload(elemId, preSrc, src) {

   	document.getElementById(elemId).onload = function() {
    	document.getElementById(elemId).onload = null;
        document.getElementById(elemId).src = src;
    }
    document.getElementById(elemId).src = preSrc;
}
