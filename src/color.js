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
		var R = ( this.RGBA.r / 255 ); //RGB from 0 to 255
		var G = ( this.RGBA.g / 255 );
		var B = ( this.RGBA.b / 255 );
		
		var var_Min = ColorLib.min( [R, G, B] ); //Min. value of RGB
		var var_Max = ColorLib.max( [R, G, B] ); //Max. value of RGB
		var del_Max = var_Max - var_Min; //Delta RGB value 

		var V = var_Max, H, S;

		if ( del_Max == 0 ) //This is a gray, no chroma...
		{
		   H = 0; //HSV results from 0 to 1
		   S = 0;
		}
		else //Chromatic data...
		{
		   S = del_Max / var_Max;

		   var del_R = ( ( ( var_Max - R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
		   var del_G = ( ( ( var_Max - G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
		   var del_B = ( ( ( var_Max - B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

		   if      ( R == var_Max ) H = del_B - del_G;
		   else if ( G == var_Max ) H = ( 1 / 3 ) + del_R - del_B;
		   else if ( B == var_Max ) H = ( 2 / 3 ) + del_G - del_R;

		   if ( H < 0 ) H += 1;
		   if ( H > 1 ) H -= 1;
		}
		
		return {h: H, s: S, v: V};
	}
	
	Color.prototype.HSL = function(){
		var var_R = ( this.RGBA.r / 255 ); //RGB from 0 to 255
		var var_G = ( this.RGBA.g / 255 );
		var var_B = ( this.RGBA.b / 255 );

		var var_Min = ColorLib.min( [var_R, var_G, var_B] ); //Min. value of RGB
		var var_Max = ColorLib.max( [var_R, var_G, var_B] ); //Max. value of RGB
		var del_Max = var_Max - var_Min; //Delta RGB value
		
		var H, S, L;
		
		L = ( var_Max + var_Min ) / 2;

		if ( del_Max === 0 ) //This is a gray, no chroma...
		{
		   H = 0; //HSL results from 0 to 1
		   S = 0;
		}
		else //Chromatic data...
		{
		   if ( L < 0.5 ) S = del_Max / ( var_Max + var_Min );
		   else           S = del_Max / ( 2 - var_Max - var_Min );

		   var del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
		   var del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
		   var del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

		   if      ( var_R === var_Max ) H = del_B - del_G;
		   else if ( var_G === var_Max ) H = ( 1 / 3 ) + del_R - del_B;
		   else if ( var_B === var_Max ) H = ( 2 / 3 ) + del_G - del_R;

		   if ( H < 0 ) H += 1;
		   if ( H > 1 ) H -= 1;
		}

		return {h:H,s:S,l:L};
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
	
	ColorLib.fromHSV = function(h,s,v){
		var rgb = {};
		
		if ( s === 0 ) //HSV from 0 to 1
		{
		   rgb["r"] = v * 255;
		   rgb["g"] = v * 255;
		   rgb["b"] = v * 255;
		}
		else
		{
		   var var_h = h * 6;
		   if ( var_h === 6 ) var_h = 0; //H must be < 1
		   var var_i = parseInt( var_h ); //Or ... var_i = floor( var_h )
		   var var_1 = v * ( 1 - s );
		   var var_2 = v * ( 1 - s * ( var_h - var_i ) );
		   var var_3 = v * ( 1 - s * ( 1 - ( var_h - var_i ) ) );

		   if      ( var_i == 0 ) { var_r = v     ; var_g = var_3 ; var_b = var_1 }
		   else if ( var_i == 1 ) { var_r = var_2 ; var_g = v     ; var_b = var_1 }
		   else if ( var_i == 2 ) { var_r = var_1 ; var_g = v     ; var_b = var_3 }
		   else if ( var_i == 3 ) { var_r = var_1 ; var_g = var_2 ; var_b = v     }
		   else if ( var_i == 4 ) { var_r = var_3 ; var_g = var_1 ; var_b = v     }
		   else                   { var_r = v     ; var_g = var_1 ; var_b = var_2 }

		   rgb["r"] = Math.round(var_r * 255); //RGB results from 0 to 255
		   rgb["g"] = Math.round(var_g * 255);
		   rgb["b"] = Math.round(var_b * 255); 
		}
		
		return creator(rgb);
	}
	
	ColorLib.fromHSL = function(H, S, L){
		//Function Hue_2_RGB
		var hueToRGB = function( v1, v2, vH ){
		   if ( vH < 0 ) vH += 1;
		   if ( vH > 1 ) vH -= 1;
		   
		   if ( ( 6 * vH ) < 1 ) return ( v1 + ( v2 - v1 ) * 6 * vH );
		   if ( ( 2 * vH ) < 1 ) return ( v2 );
		   if ( ( 3 * vH ) < 2 ) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 );
		   return v1;
		}
		
		var var_1, var_2;
		
		if ( S === 0 ) //HSL from 0 to 1
		{
		   var R = L * 255                      //RGB results from 0 to 255
		   var G = L * 255
		   var B = L * 255
		}
		else
		{
		   if ( L < 0.5 ) var_2 = L * ( 1 + S )
		   else           var_2 = ( L + S ) - ( S * L )

		   var_1 = 2 * L - var_2

		   R = 255 * hueToRGB( var_1, var_2, H + ( 1 / 3 ) ) 
		   G = 255 * hueToRGB( var_1, var_2, H )
		   B = 255 * hueToRGB( var_1, var_2, H - ( 1 / 3 ) )
		}
		
		var rgb = {
			r: Math.round(R),
			g: Math.round(G),
			b: Math.round(B)
		}
		
		return creator(rgb);
	}
	
	/* lib helpers */
	ColorLib.min = function(arr){
		var m = arr[0];
		for (var i in arr){
			if (arr[i] < m) m = arr[i];
		}
		
		return m;
	}
	ColorLib.max = function(arr){
		var m = arr[0];
		for (var i in arr){
			if (arr[i] > m) m = arr[i];
		}
		
		return m;
	}
	
	//attach to global scope
	//TODO: test for Node, Require, etc.
	global.c = ColorLib;
})(this);