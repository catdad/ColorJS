(function colorjs(global){
	console.log(global);
	
	//Color constructor
	var Color = function(rgba){
		this.RGBA = rgba;
	}
	
	Color.prototype.HEX = function(){
		var hex = "";
		
		var pad = function(n){ while(n.length < 2) {n = '0'+n;} return n; }
		var toHEX = function(n){ return pad(n.toString(16)); };
		
		hex += toHEX(this.RGBA.r);
		hex += toHEX(this.RGBA.g);
		hex += toHEX(this.RGBA.b);
		
		return hex;
	}
	
	Color.prototype.HSV = function(){
	
	}
	
	Color.prototype.CMYK = function(){
	
	}
	
	Color.prototype.lighter = function(percent){
	
	}
	
	Color.prototype.darker = function(percent){
		
	}
	
	Color.prototype.triad = function(color){
		return ["color 1", "color 2", "color 3"];
	}
	
	var creator = function(val){
		var rgba = {};
		
		if (typeof val === "string") rgba = fromHEX(val);
		else if (typeof val === "array") rgba = fromArray(val);
		else if (typeof val === "object") rgba = fromRGBA(val);
		else rgba = null;
		
		return new Color(rgba);
	}
	
	//simple creator
	var ColorLib = function(val){
		return creator(val);
	}
	
	//create Color from HEX
	var fromHEX = function(val, color){
		val = String(val).replace(/[^0-9a-f]/gi, "");
		if (val.length < 6) {
			val = val[0]+val[0]+val[1]+val[1]+val[2]+val[2];
		}
		
		var toDecimal = function(str){
			return parseInt(str,16);
		}
		
		var r = toDecimal(val.substring(0,2));
		var g = toDecimal(val.substring(2,4));
		var b = toDecimal(val.substring(4,6));
		
		return {r:r,g:g,b:b,a:1};
	}
	
	//create Color from RGB or RGBA
	var fromRGBA = function(val, color){
		color.RGBA = val;
		if (!val.a) val.a = 1;
	}
	
	ColorLib.prototype.create = function(val){
		return creator(val);
	}
	
	window.c = ColorLib;
})(this);