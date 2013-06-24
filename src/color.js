(function colorjs(global){
	var fromName = function(val){
	
	};
	
	//create Color - HEX to RGBA
	var fromHEX = function(val){
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
	
	//create Color - RGB/RGBA to valid RGBA
	var fromRGBA = function(val){
		var rgba = {};
		
		//check for valid color values (0 - 255)
		// set to 0 if invalid
		rgba["r"] = (val.r && val.r >= 0 && val.r <= 255) ? val.r : 0;
		rgba["g"] = (val.g && val.g >= 0 && val.g <= 255) ? val.g : 0;
		rgba["b"] = (val.b && val.b >= 0 && val.b <= 255) ? val.b : 0;
		rgba["a"] = (val.a && val.a >= 0 && val.a <= 1) ? val.a : 1;
		
		return rgba;
	}
	
	//Color constructor
	var Color = function(rgba){
		this.RGBA = rgba;
	}
	
	/* converters */
	Color.prototype.HEX = function(set){
		if (set) 
		
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
	
	/* operations */
	Color.prototype.lighter = function(percent){
	
	}
	
	Color.prototype.darker = function(percent){
		
	}
	
	/* color schemes */
	Color.prototype.triad = function(color){
		return ["color 1", "color 2", "color 3"];
	}
	
	//creator function -- check types
	var creator = function(val){
		var rgba = {};
		
		if (typeof val === "string") rgba = fromHEX(val);
		else if (typeof val === "object") rgba = fromRGBA(val);
		else rgba = null;
		
		//TODO: error check (rgba.r && rgba.g && rgba.b && rgba.a)
		return new Color(rgba);
	}
	
	//simple creator
	var ColorLib = function(val){
		return creator(val);
	}
	
	ColorLib.fromHEX = creator;
	ColorLib.fromRGB = creator;
	ColorLib.fromRGBA = creator;
	
	ColorLib.fromCMYK = function(val){
		//TODO: CMYK creator
	}
	
	ColorLib.fromArray = function(val){
		return creator({r:val[0], g:val[1], b:val[2], a:val[3]});
	}
	
	ColorLib.fromRaw = function(r,g,b,a){
		return creator({r:r, g:g, b:b, a:a});
	}
	
	window.c = ColorLib;
})(this);