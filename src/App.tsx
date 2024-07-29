import { useState, useRef, useEffect } from 'react';
import ColorThief from 'colorthief';
import quantize from 'quantize';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const colorMap: { [key: string]: string } = {
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

const DISTANCE_THRESHOLD = 70; // Ajuste este valor conforme necessário

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<{ rgb: string; name: string, percentage: string }[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referência ao canvas

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImageSrc(e.target.result);
        setShowColors(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  useEffect(() => {
    if (imageSrc && imgRef.current && canvasRef.current) {
      const imgElement = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);
      }
    }
  }, [imageSrc]);

  type RGB = [number, number, number];

  const extractColors = () => {
    if (imgRef.current && canvasRef.current) {
      const imgElement = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);

        // Obter todos os pixels da imagem
        const pixelData = ctx.getImageData(0, 0, imgElement.width, imgElement.height).data;
        const arrayOfPixels: RGB[] = [];

        for (let i = 0; i < pixelData.length; i += 4) {
          const rgb: RGB = [pixelData[i], pixelData[i + 1], pixelData[i + 2]];
          arrayOfPixels.push(rgb);
        }

        const maximumColorCount = 10; // Número máximo de cores na paleta
        const colorMap = quantize(arrayOfPixels, maximumColorCount);
        const palette = colorMap.palette(); // Obtém a paleta reduzida

        const colorCounts = new Map<string, number>();
        let totalPixels = arrayOfPixels.length;

        // Função para encontrar a cor mais próxima na paleta
        const findClosestColor = (color: RGB): RGB => {
          return palette.reduce((closest, current) => {
            const distCurrent = getColorDistance(color, current);
            const distClosest = getColorDistance(color, closest);
            return distCurrent < distClosest ? current : closest;
          }, palette[0]);
        };

        // Função para calcular a distância entre duas cores
        const getColorDistance = (c1: RGB, c2: RGB): number => {
          const rDiff = c1[0] - c2[0];
          const gDiff = c1[1] - c2[1];
          const bDiff = c1[2] - c2[2];
          return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
        };

        arrayOfPixels.forEach(pixel => {
          const reducedColor = findClosestColor(pixel);
          const colorKey = `rgb(${reducedColor[0]}, ${reducedColor[1]}, ${reducedColor[2]})`;
          colorCounts.set(colorKey, (colorCounts.get(colorKey) || 0) + 1);
        });

        const colorList = Array.from(colorCounts.entries())
          .map(([color, count]) => {
            const rgb = color.match(/\d+/g)?.map(Number) as RGB;
            return {
              rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
              name: color, // Nome da cor é a string RGB
              percentage: ((count / totalPixels) * 100).toFixed(2),
            };
          })
          .filter(color => parseFloat(color.percentage) >= 1) // Filtra cores com menos de 1%
          .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)); // Ordena por porcentagem em ordem decrescente

        // Seleciona as 10 principais cores
        const topColors: { rgb: string; name: string; percentage: string; }[] = colorList.slice(0, 10);

        setColors(topColors); // Atualiza o estado com a lista de cores
      }
    }
  };

  const handleShowColors = () => {
    extractColors();
    setShowColors(true);
  };

  const findClosestColor = (rgbString: string): string => {
    const rgb = parseRgb(rgbString);
    let closestColor = "Cor não encontrada na paleta";
    let minDistance = Infinity;

    Object.keys(colorMap).forEach(key => {
      const mapRgb = parseRgb(key);
      const distance = euclideanDistance(rgb, mapRgb);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = colorMap[key];
      }
    });

    return minDistance <= DISTANCE_THRESHOLD ? closestColor : "Cor não encontrada na paleta";
  };

  const parseRgb = (rgbString: string): [number, number, number] => {
    const result = rgbString.match(/\d+/g);
    return result ? [parseInt(result[0]), parseInt(result[1]), parseInt(result[2])] : [0, 0, 0];
  };

  const findRgbByName = (name: string): string => {
    return Object.keys(colorMap).find(key => colorMap[key] === name) || "rgb(0, 0, 0)";
  };

  const euclideanDistance = (rgb1: [number, number, number], rgb2: [number, number, number]): number => {
    return Math.sqrt(
      Math.pow(rgb1[0] - rgb2[0], 2) +
      Math.pow(rgb1[1] - rgb2[1], 2) +
      Math.pow(rgb1[2] - rgb2[2], 2)
    );
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Cores Extraídas", 10, 10);

    colors.forEach((color, index) => {
      doc.setFillColor(...parseRgb(color.rgb));
      doc.rect(10, 20 + (index * 10), 10, 10, 'F');
      doc.text(`${color.name} (${color.percentage}%)`, 25, 30 + (index * 10));
    });

    doc.save("cores-extraidas.pdf");
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Cores Extraídas',
        text: 'Confira as cores extraídas da imagem!',
        url: window.location.href
      })
        .catch(error => console.error('Erro ao compartilhar:', error));
    } else {
      alert('A funcionalidade de compartilhamento não é suportada pelo seu navegador.');
    }
  };

  const printResults = () => {
    window.print();
  };

  return (
    <>
      <div className="container">
        <h2 className="my-4">Muralize</h2>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImageDrop}
          className="upload-area border-dashed p-4 text-center"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="d-none"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="upload-label">
            Arraste e solte a imagem aqui ou clique para fazer upload
          </label>
        </div>
        {imageSrc && (
          <div className="mt-4 text-center">
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Uploaded"
              crossOrigin="anonymous"
              className="img-fluid"
              style={{ maxWidth: '500px', maxHeight: '500px' }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <div className="mt-3">
              <button
                onClick={handleShowColors}
                className="btn btn-success"
              >
                Mostrar Cores
              </button>
            </div>
          </div>
        )}
        {showColors && colors.length > 0 && (
          <div className="mt-4">
            <h3>Cores extraídas</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Cor</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Porcentagem</th>
                </tr>
              </thead>
              <tbody>
                {colors.map((color, index) => (
                  <tr key={index}>
                    <td style={{ backgroundColor: color.rgb, width: '50px', height: '50px' }}></td>
                    <td>{color.name}</td>
                    <td>{color.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3">
              <button onClick={downloadPDF} className="btn btn-secondary me-2">
                Baixar PDF
              </button>
              <button onClick={shareResults} className="btn btn-info me-2">
                Compartilhar
              </button>
              <button onClick={printResults} className="btn btn-danger">
                Imprimir
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
