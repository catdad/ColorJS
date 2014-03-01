(function colorjs(global){
	//var fromName = function(val){
	
	//};
	
	//Color constructor
	var Color = function(rgba){
		this.RGBA = rgba;
	}
	
	/* converters */
	Color.prototype.RGB = function(set){
		//create new color
		if (set){
			this.RGBA = ColorLib.fromRGB(set).RGBA;
			return this;
		}
		
		var newRGB = {}
		newRGB.r = this.RGBA.r;
		newRGB.g = this.RGBA.g;
		newRGB.b = this.RGBA.b;
		
		return newRGB;
	}
	
	Color.prototype.HEX = function(set){
		//create new color
		if (set){
			this.RGBA = ColorLib.fromHEX(set).RGBA;
			return this;
		}
		
		var hex = "";
		
		var pad = function(n){ while(n.length < 2) {n = '0'+n;} return n; }
		var toHEX = function(n){ return pad(n.toString(16)); };
		
		hex += toHEX(this.RGBA.r);
		hex += toHEX(this.RGBA.g);
		hex += toHEX(this.RGBA.b);
		
		return hex;
	}
	
	Color.prototype.CSS = function(set){
		if (set){
			this.RGBA = ColorLib.fromHEX(set).RGBA;
			return this;
		}
		
		return "#" + this.HEX();
	}
	
	Color.prototype.HSV = function(set){
		if (set){
			this.RGBA = ColorLib.fromHSV(set).RGBA;
			return this;
		}
	
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
		
		//convert H decimal to degrees
		H = Math.round(H * 360); // 0 <= H <= 360
		
		//round values (.xx)
		S = Number(S.toFixed(2));
		V = Number(V.toFixed(2));
		
		return {h: H, s: S, v: V};
	}
	
	Color.prototype.HSL = function(set){
		if (set){
			this.RGBA = ColorLib.fromHSL(set).RGBA;
			return this;
		}
		
		var var_R = (this.RGBA.r/255); //RGB from 0 to 255
		var var_G = (this.RGBA.g/255);
		var var_B = (this.RGBA.b/255);

		var var_Min = ColorLib.min( [var_R, var_G, var_B] ); //Min. value of RGB
		var var_Max = ColorLib.max( [var_R, var_G, var_B] ); //Max. value of RGB
		var del_Max = var_Max - var_Min; //Delta RGB value
		
		var H, S, L;
		
		L = (var_Max + var_Min) / 2;

		if (del_Max === 0) //This is a gray, no chroma...
		{
			H = 0; //HSL results from 0 to 1
			S = 0;
		}
		else //Chromatic data...
		{
			if (L < 0.5) S = del_Max / (var_Max + var_Min);
			else         S = del_Max / (2 - var_Max - var_Min);

			var del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max;
			var del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max;
			var del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max;

			if      (var_R === var_Max) H = del_B - del_G;
			else if (var_G === var_Max) H = (1/3) + del_R - del_B;
			else if (var_B === var_Max) H = (2/3) + del_G - del_R;
			
			if (H < 0) H += 1;
			if (H > 1) H -= 1;
		}

		//convert H decimal to degrees
		H = Math.round(H * 360); // 0 <= H <= 360
		
		//round values (.xx)
		S = Number(S.toFixed(2));
		L = Number(L.toFixed(2));
		
		return {h:H,s:S,l:L};
	}
	
	Color.prototype.CMYK = function(set){
		if (set){
			this.RGBA = ColorLib.fromCMYK(set).RGBA;
			return this;
		}
		
		var C = 1 - (this.RGBA.r / 255);
		var M = 1 - (this.RGBA.g / 255);
		var Y = 1 - (this.RGBA.b / 255);
		
		var K = 1; //temp

		if (C < K) K = C;
		if (M < K) K = M;
		if (Y < K) K = Y;
		
		if (K === 1) { //Black
			C = 0;
			M = 0;
			Y = 0;
		}
		else {
			C = (C - K) / (1 - K);
			M = (M - K) / (1 - K);
			Y = (Y - K) / (1 - K);
		}
		
		var round = function(n){ return Number(n.toPrecision(2));}
		
		return {c:round(C),m:round(M),y:round(Y),k:round(K)};
	}
	
	Color.prototype.removeAlpha = function(bg){
		var a = this.RGBA.a;
		
		if (!bg) bg = {r: 255, g: 255, b: 255}; //set to white if no background
		
		var calc = function(bgC, C){ return Math.round( (1 - a) * bgC + a * C ); }
		
		this.RGBA.r = calc(bg.r, this.RGBA.r);
        this.RGBA.g = calc(bg.g, this.RGBA.g);
        this.RGBA.b = calc(bg.b, this.RGBA.b);
		this.RGBA.a = 1;
		
		return this;
	}
	
	Color.prototype.setAlpha = function(alpha){
		this.RGBA.a = alpha;
		return this;
	}
	
	/* operations */
	Color.prototype.lighter = function(percent){
		var hsl = this.HSL();
		hsl.l = hsl.l + (hsl.l * (percent / 100));
		
		if (hsl.l > 1) return ColorLib('fff');
		else return ColorLib.fromHSL(hsl);
	}
	
	Color.prototype.darker = function(percent){
		var hsl = this.HSL();
		hsl.l = hsl.l - (hsl.l * (percent / 100));
		
		if (hsl.l > 1) return ColorLib('000');
		else return ColorLib.fromHSL(hsl);
	}
	
	/* color schemes */
	Color.prototype.hueShiftSingle = function(degrees){
		// H + degrees
		var hsl = this.HSL();
		
		var shift = {};
		shift.h = ColorLib.circleMotion(hsl.h, degrees);
		
		shift.s = hsl.s;
		shift.l = hsl.l;
		
		return new ColorLib.fromHSL(shift);
	}
	
	Color.prototype.hueShift = function(degrees){
		// H +/- degrees
		degrees = Number(degrees);
		return [this, this.hueShiftSingle(degrees), this.hueShiftSingle(degrees * -1)];
	}
	
	Color.prototype.triad = function(color){
		//H +/- 120 degrees
		return this.hueShift(120);
	}
	
	Color.prototype.split = function(color){
		//H +/- 150 degrees
		return this.hueShift(150);
	}
	
	Color.prototype.analog = function(color){
		//H +/- 30 degrees
		return this.hueShift(30);
	}
	
	Color.prototype.complement = function(color){
		//H + 180 degrees
		return [this, this.hueShiftSingle(180)];
	}
	
	Color.prototype.quadrat = function(shift){
		var x = Number(shift) || 40;
		var y = 180 - x;
		
		var colors = [];
		
		colors.push(this);
		colors.push(this.hueShiftSingle(x));
		colors.push(this.hueShiftSingle(x + y));
		colors.push(this.hueShiftSingle(x + y + x));
		
		return colors;
	}
	
	Color.prototype.contrasts = function(count){
		//return complement if 1
		if (count === 1) return this.complement();
		
		//calculate `count` number of equidistant colors
		var degrees = 360 / count;
		
		var colors = [];
		
		for(var i = 0; i < count; i++){
			colors.push( this.hueShiftSingle(degrees * i));
		}
		
		return colors;
	}
	
	//return Lightness spectrum -- no black or white
	Color.prototype.monochrome = function(count){
		//do not return white (adds another color)
		var n = 1/++count;
		
		var colors = [];
		var hsv = this.HSL();
		
		// do not return black
		//var i = 1;
		
		for (var i = 1; i < count; i++){
			colors.push(new ColorLib.fromHSL({
				h: hsv.h,
				s: hsv.s,
				l: n*i
			}));
		}
		
		return colors;
	}
	
	//experimental lighter color calculator using alpha chanel
	Color.prototype.monochromeLight = function(count){
		return ColorLib.alphaShift(this, count, ColorLib('fff'));
	}
	
	//experimental darker color calculator using alpha chanel
	Color.prototype.monochromeDark = function(count){
		return ColorLib.alphaShift(this, count, ColorLib('000'));
	}
	
	//two colors, merging in the middle at white
	Color.prototype.diverging = function(count){
		var colors = this.complement();
		
		//even
		if (count % 2 === 0){
			var first = colors[0].monochromeLight(count/2);
			var second = colors[1].monochromeLight(count/2).reverse();
			return first.concat(second);
		}
		//odd
		else{
			var c = parseInt(count/2) + 1;
			var first = colors[0].monochromeLight(c);
			var second = colors[1].monochromeLight(c);
			
			//merge lightest colors together, make gray 6% lighter
			ColorLib.mix(first[c-1], second[c-1]).lighter(6);
			
			//remove lightest color of 'second'
			second.pop();
			
			return first.concat( second.reverse() );
		}
	}
	
	//creator function -- check types
	var creator = function(val){
		//check for valid color values (0 - 255)
		// set to 0 if invalid
		var rgba = {};
		rgba["r"] = (val.r && val.r >= 0 && val.r <= 255) ? val.r : 0;
		rgba["g"] = (val.g && val.g >= 0 && val.g <= 255) ? val.g : 0;
		rgba["b"] = (val.b && val.b >= 0 && val.b <= 255) ? val.b : 0;
		rgba["a"] = (val.a && val.a >= 0 && val.a <= 1) ? val.a : 1;
		
		return new Color(rgba);
	}
	
	// simple creator -- RGB[A] or HEX
	var ColorLib = function(val){
		//checl for null
		if (!val) return null;
		
		if (typeof val === "string") return ColorLib.fromHEX(val);
		else return creator(val);
	}
	
	// xxxxxx, xxx, #xxx, or #xxxxxx
	ColorLib.fromHEX = function(val){
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
		
		return creator({r:r,g:g,b:b,a:1});
	}
	
	// create from RGB or RGBA objects
	ColorLib.fromRGBA = creator;
	ColorLib.fromRGB = creator;
	
	// RGB from [c,m,y,k] or {c,m,y,k}
	ColorLib.fromCMYK = function(val){
		var CMYK = {};
		if (val instanceof Array){
			CMYK.c = val[0];
			CMYK.m = val[1];
			CMYK.y = val[2];
			CMYK.k = val[3];
		}
		else CMYK = val;
		
		CMYK.c = ( CMYK.c * ( 1 - CMYK.k ) + CMYK.k );
		CMYK.m = ( CMYK.m * ( 1 - CMYK.k ) + CMYK.k );
		CMYK.y = ( CMYK.y * ( 1 - CMYK.k ) + CMYK.k );
		
		var rgb = {};
		rgb.r = Math.round(( 1 - CMYK.c ) * 255);
		rgb.g = Math.round(( 1 - CMYK.m ) * 255);
		rgb.b = Math.round(( 1 - CMYK.y ) * 255);
		
		return creator(rgb);
	}
	
	ColorLib.fromArray = function(val){
		return creator({r:val[0], g:val[1], b:val[2], a:val[3]});
	}
	
	ColorLib.fromRaw = function(r,g,b,a){
		return creator({r:r, g:g, b:b, a:a});
	}
	
	// RGB from [h,s,v] or {h,s,v}
	ColorLib.fromHSV = function(val){
		var h, s, v;
		if (val instanceof Array){
			h = val[0]; s = val[1]; v = val[2];
		}
		else{
			h = val.h; s = val.s; v = val.v;
		}
		
		//convert H degrees to decimal for calculation
		h = h/360; // 0 <= H <= 1
		
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
		
		//round values
		rgb.r = Math.round(rgb.r);
		rgb.g = Math.round(rgb.g);
		rgb.b = Math.round(rgb.b);
		
		return creator(rgb);
	}
	
	//RGB from [h,s,l] or {h,s,l}
	ColorLib.fromHSL = function(val){
		var H, S, L;
		if (val instanceof Array){
			H = val[0]; S = val[1]; L = val[2];
		}
		else{
			H = val.h; S = val.s; L = val.l;
		}
		
		//convert H degrees to decimal for calculation
		H = H/360; // 0 <= H <= 1
		
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
		
		//round values
		var rgb = {
			r: Math.round(R),
			g: Math.round(G),
			b: Math.round(B)
		}
		
		return creator(rgb);
	}
	
	//pseudo-random color
	ColorLib.random = function(){
		var r = function(){ return Math.floor(Math.random()*256) }
		var rgb = {
			r: r(),
			g: r(),
			b: r()
		}
		
		return creator(rgb);
	}
	
	/* lib helpers */
	ColorLib.min = function(arr){
		var m = arr[0];
		for (var i = 0; i < arr.length; i++){
			if (arr[i] < m) m = arr[i];
		}
		return m;
	}
	ColorLib.max = function(arr){
		var m = arr[0];
		for (var i = 0; i < arr.length; i++){
			if (arr[i] > m) m = arr[i];
		}
		return m;
	}
	ColorLib.circleMotion = function(from, offset){
		from = Number(from) + Number(offset);
		
		while (from < 0) from = from + 360;
		while (from > 360) from = from - 360;
		
		return from;
	}
	//creates different colors based on alpha and background color
	ColorLib.alphaShift = function alphaShift(color, count, background){
		var n = 1/count;
		
		var colors = [];
		
		for (var i = count; i > 0; i--){
			var col = new ColorLib.fromArray([color.RGBA.r, color.RGBA.g, color.RGBA.b, (n*i)]);
			colors.push(col.removeAlpha( background.RGBA ));
		}
		
		return colors;
	}
	//mix two colors evenly
	ColorLib.mix = function mix(color1, color2){
		//do not change original colors
		var newColor = ColorLib(color1.RGBA);
		return newColor.setAlpha(.5).removeAlpha(color2.RGBA);
	}
	
	//attach to global scope
	//TODO: RequireJS, AMD, CommonJS, etc.
    !!(typeof module !== 'undefined' && module.exports) ? module.exports = ColorLib : global.Color = ColorLib;
})(this);
