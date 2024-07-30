import ColorThief from 'colorthief';

export const ColorMap: { [key: string]: string } = {
  "rgb(245, 244, 237)": "Incolor",
  "rgb(242, 236, 223)": "Branco",
  "rgb(219, 216, 208)": "Branco gelo",
  "rgb(196, 110, 138)": "Rosa Açaí",
  "rgb(158, 89, 117)": "Rosa Azaléia",
  "rgb(207, 77, 61)": "Vermelho Cardeal",
  "rgb(179, 72, 70)": "Rubi",
  "rgb(178, 62, 61)": "Vermelho Cardinal",
  "rgb(167, 34, 34)": "Vermelho",
  "rgb(121, 59, 46)": "Colorado",
  "rgb(92, 41, 39)": "Vermelho Goya",
  "rgb(246, 220, 184)": "Pérola Claro",
  "rgb(234, 190, 164)": "Pêssego",
  "rgb(223, 156, 128)": "Flamingo",
  "rgb(247, 161, 86)": "Laranja Cítrico",
  "rgb(228, 142, 95)": "Laranja Imperial",
  "rgb(236, 123, 79)": "Laranja Maracatú",
  "rgb(225, 132, 81)": "Laranja Neon",
  "rgb(187, 111, 88)": "Terracota Suave",
  "rgb(215, 84, 19)": "Laranja",
  "rgb(164, 81, 60)": "Cerâmica Onix",
  "rgb(148, 79, 57)": "Cerâmica",
  "rgb(120, 85, 60)": "Marron Conhaque",
  "rgb(246, 231, 210)": "Romã",
  "rgb(220, 203, 181)": "Areia",
  "rgb(226, 190, 139)": "Creme",
  "rgb(229, 183, 127)": "Cromo Suave",
  "rgb(215, 162, 97)": "Ocre Colonial",
  "rgb(220, 156, 80)": "Mangaba",
  "rgb(235, 228, 209)": "Geada",
  "rgb(241, 223, 199)": "Pérola",
  "rgb(238, 220, 187)": "Marfim",
  "rgb(231, 218, 194)": "Palha",
  "rgb(248, 215, 165)": "Vanilla",
  "rgb(248, 211, 128)": "Amarelo Canário",
  "rgb(239, 208, 119)": "Sino",
  "rgb(253, 191, 54)": "Amarelo Frevo",
  "rgb(238, 179, 76)": "Amarelo Demarcação",
  "rgb(240, 190, 0)": "Amarelo Segurança",
  "rgb(252, 164, 0)": "Amarelo",
  "rgb(253, 163, 0)": "Amarelo - Padrão Wandepoxy",
  "rgb(206, 161, 39)": "Ouro Coral",
  "rgb(225, 144, 15)": "Amarelo Trator",
  "rgb(220, 228, 186)": "Verde Vale",
  "rgb(217, 220, 184)": "Capim Limão",
  "rgb(219, 201, 84)": "Refresco",
  "rgb(178, 187, 91)": "Verde Limão",
  "rgb(230, 234, 213)": "Orvalho",
  "rgb(224, 235, 207)": "Verde Primavera",
  "rgb(219, 226, 203)": "Sálvia",
  "rgb(203, 211, 193)": "Mate",
  "rgb(174, 182, 142)": "Verde Kiwi",
  "rgb(122, 174, 124)": "Verde Angra",
  "rgb(129, 164, 115)": "Verde Nilo",
  "rgb(120, 157, 99)": "Verde Claro",
  "rgb(83, 162, 80)": "Verde Timbalada",
  "rgb(92, 114, 82)": "Verde Quadra",
  "rgb(79, 88, 77)": "Verde Escolar",
  "rgb(58, 99, 50)": "Verde Folha",
  "rgb(48, 80, 58)": "Verde Escuro",
  "rgb(41, 61, 52)": "Verde Colonial",
  "rgb(172, 227, 205)": "Verde - Padrão Corante",
  "rgb(159, 216, 208)": "Verde Piscina",
  "rgb(0, 158, 165)": "Pavão",
  "rgb(0, 136, 163)": "Azul Piscina",
  "rgb(205, 222, 230)": "Oceanic",
  "rgb(195, 221, 232)": "Azul Praia",
  "rgb(183, 210, 226)": "Azul Sereno",
  "rgb(175, 203, 212)": "Marine",
  "rgb(124, 184, 198)": "Azul Arpoador",
  "rgb(131, 168, 193)": "Azul dos Andes",
  "rgb(130, 152, 198)": "Orquídea",
  "rgb(0, 146, 196)": "Oceano",
  "rgb(14, 144, 173)": "Azul Mar",
  "rgb(0, 113, 161)": "Azul Segurança",
  "rgb(0, 111, 158)": "Lua do Sertão",
  "rgb(0, 111, 154)": "Azul Profundo",
  "rgb(5, 107, 143)": "Azul",
  "rgb(0, 92, 138)": "Azul França",
  "rgb(17, 61, 99)": "Azul Del Rey",
  "rgb(225, 209, 215)": "Violeta",
  "rgb(163, 174, 198)": "Lilás",
  "rgb(233, 223, 204)": "Areia Sirena",
  "rgb(209, 206, 199)": "Pedra Preciosa",
  "rgb(204, 204, 203)": "Cinza Alpino",
  "rgb(175, 180, 172)": "Prata",
  "rgb(176, 176, 175)": "Tubarão Branco",
  "rgb(171, 177, 172)": "Platina",
  "rgb(172, 175, 172)": "Platina",
  "rgb(145, 156, 154)": "Cinza Médio",
  "rgb(141, 144, 142)": "Cinza - Padrão Wandepoxy",
  "rgb(126, 127, 128)": "Cinza Médio",
  "rgb(122, 122, 121)": "Cinza Médio",
  "rgb(93, 93, 91)": "Cinza Escuro",
  "rgb(94, 97, 84)": "Cinza - Padrão Ferrolack",
  "rgb(72, 77, 80)": "Cinza Escuro",
  "rgb(59, 60, 60)": "Preto",
  "rgb(233, 225, 212)": "Algodão Egípsio",
  "rgb(206, 204, 195)": "Crômio",
  "rgb(212, 191, 165)": "Castanho",
  "rgb(200, 187, 170)": "Bronze Lenda",
  "rgb(189, 166, 141)": "Camurça",
  "rgb(168, 153, 142)": "Madeira Acinzentada",
  "rgb(156, 143, 121)": "Concreto",
  "rgb(141, 136, 133)": "Alumínio",
  "rgb(107, 68, 47)": "Tabaco",
  "rgb(92, 50, 37)": "Vermelho Óxido",
  "rgb(75, 47, 40)": "Marron"
};

export const extractColorsFromImage = (image: HTMLImageElement, canvas: HTMLCanvasElement): string[] => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(image, 10, 10);

  const pixelCounts = new Map<string, number>();
  let totalPixels = 0;

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const rgb = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

      const closestColor = findClosestColor(rgb);
      pixelCounts.set(closestColor, (pixelCounts.get(closestColor) || 0) + 1);
      totalPixels++;
    }
  }

  return Array.from(pixelCounts.keys()).slice(0, 7); // Retorna as 7 principais cores
};

const findClosestColor = (rgbString: string): string => {
  const rgb = parseRgb(rgbString);
  let closestColor = "Cor não encontrada na paleta";
  let minDistance = Infinity;

  Object.keys(ColorMap).forEach(key => {
    const mapRgb = parseRgb(key);
    const distance = euclideanDistance(rgb, mapRgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = ColorMap[key];
    }
  });

  return minDistance <= 70 ? closestColor : "Cor não encontrada na paleta";
};

const parseRgb = (rgbString: string): [number, number, number] => {
  const result = rgbString.match(/\d+/g);
  return result ? [parseInt(result[0]), parseInt(result[1]), parseInt(result[2])] : [0, 0, 0];
};

const euclideanDistance = (rgb1: [number, number, number], rgb2: [number, number, number]): number => {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
    Math.pow(rgb1[1] - rgb2[1], 2) +
    Math.pow(rgb1[2] - rgb2[2], 2)
  );
};
