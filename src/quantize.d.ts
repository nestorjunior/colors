declare module 'quantize' {
  type RGB = [number, number, number];
  
  function quantize(pixels: RGB[], colorCount: number): {
    palette(): RGB[];
  };

  export default quantize;
}
