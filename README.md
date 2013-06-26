ColorJS
=======

convert and calculate colors in JavaScript

**This library (and doc) is still a work in progress. Please bear with me, and feel free to make suggestions.**

Check out the live demo [here](http://catdad.github.io/ColorJS).

##Create

Simple create methods

    Color("#ff0000");
    Color({r:255,g:0,b:0});
  
Advanced create methods

    Color.fromHEX("#ff0000");
    Color.fromRGB({r:255,g:0,b:0});
    Color.fromRGBA({r:255,g:0,b:0,a:.5});
  
Under advanced methods, there are also options to create colors from `CMYK`, `HSV`, and `HSL`. Both of these take `Object` or `Array` values, as such:

    Color.fromCMYK({c: 0, m: 1, y: 1, k: 0});
    Color.fromCMYK([0, 1, 1, 0]);
    
    Color.fromHSV({h: 0, s: 1, v: 1})
    Color.fromHSL({h: 0, s: 1, l: 0.5});
  
##Convert

Once you have created a color, you can convert it to any format you would like, as such:

    var color = Color("#ff0000");
  
    color.CMYK(); //{c: 0, m: 1, y: 1, k: 0}
    color.HSV(); //{h: 0, s: 1, v: 1}
    color.HSL(); //{h: 0, s: 1, l: 0.5}
    color.HEX(); //"ff0000"
    color.CSS(); //"#ff0000"
  
##Setters

The convert functions can also be used to set the color of an existing `Color` object by passing the appropriate value.

    var color = Color("ff0000");
    color.CMYK(); //{c: 0, m: 1, y: 1, k: 0}
    
    color.CMYK({c: 1, m: 1, y: 0, k: 0});
    color.HEX(); //0000ff

##Color scheme calculator

You can use this library to calculate color various color harmonies.

    //HUE +/- 30 degrees
    color.analog(); //[original, plus, minus]
    
    //HUE +/- 120 degrees
    color.triad(); //[original, plus, minus]
    
    //HUE +/- 150 degrees
    color.split(); //[original, plus, minus]
    
    //HUE + 180 degrees
    color.complement(); //[original, complement]

_Note: These values are mathematical suggestions, and may need to be adjusted slightly to make a more pleasant color combination or remain in the same color gamut._

##Note

All colors are stored as RGBA values. Some rounding needs to occur for this, especially for HSL and HSV values. This will result in colors being ever so slightly different. If this is unacceptable, please look elsewhere.

##License

This project is licensed under a [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/). Please use, adapt, and modify this project to your heart's content. Link back to this page wherever you can.
