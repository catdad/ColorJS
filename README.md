ColorJS
=======

convert and calculate colors in JavaScript

**This library (and doc) is still a work in progress. Please bear with me, and feel free to make suggestions. As a disclaimer, I may break things for the time being, until the code matures a bit more. If you use it, and later choose to update your library, please read the up-to-date doc.**

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

You can use this library to calculate color various named color harmonies.

    //HUE +/- 30 degrees
    color.analog(); //[original, plus, minus]
    
    //HUE +/- 120 degrees
    color.triad(); //[original, plus, minus]
    
    //HUE +/- 150 degrees
    color.split(); //[original, plus, minus]
    
    //HUE + 180 degrees
    color.complement(); //[original, complement]

_Note: These values are mathematical suggestions, and may need to be adjusted slightly to make a more pleasant color combination or remain in the same color gamut._

You can also calculate any generic (unnamed) color scheme using the hue shifter function.

    //HUE +/- degrees
    color.hueShift(degrees); //[original, plus, minus]
    
More generic hue shifter, which returns only one value:

    //HUE + degrees
    color.hueShiftSingle(degrees); //newColor

Hue shifts based on how many colors you need, which will calculate colors at equal invervals:

    var count = 5;
    color.contrasts(count); //[original, color1, color2, color3, color4];
    
_Note: This name will likely change, as it is not very intuitive._

_Note: This function obviously has a limit of usefulness, as too many colors will result colors being too close to one another. This is a mathematical limitation, and there isn't much I can do about it. If you need more colors, try calculating this from two (or seven) colors from a different color gamut to get more contrasting colors._

Monochromatic calculations, based on the number of colors you need:

    var count = 3;
    color.monochrome(count); //[color1, color2, color3]
    
_Note: This function does not return pure black or white. Add those on your own if you need to. Also, it does not necessarily return the original color. It will only be returned with an odd number of colors, as the middle color._

##Note

All colors are stored as RGBA values. Some rounding needs to occur for this, especially for HSL and HSV values. This will result in colors being ever so slightly different. If this is unacceptable, please look elsewhere.

##Thanks

Special thanks to my art school girlfriend, who answered all of my incessant questions about color theory.

##License

This project is licensed under the MIT X11 License. Please use, adapt, and modify this project to your heart's content. Link back to this page wherever you can.
