import { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const colorMap = [
  { name: "Incolor", rgb: "rgb(245, 244, 237)" },
  { name: "Branco", rgb: "rgb(242, 236, 223)" },
  { name: "Branco gelo", rgb: "rgb(219, 216, 208)" },
  { name: "Rosa Açaí", rgb: "rgb(196, 110, 138)" },
  { name: "Rosa Azaléia", rgb: "rgb(158, 89, 117)" },
  { name: "Vermelho Cardeal", rgb: "rgb(207, 77, 61)" },
  { name: "Rubi", rgb: "rgb(179, 72, 70)" },
  { name: "Vermelho Cardinal", rgb: "rgb(178, 62, 61)" },
  { name: "Vermelho", rgb: "rgb(167, 34, 34)" },
  { name: "Colorado", rgb: "rgb(121, 59, 46)" },
  { name: "Vermelho Goya", rgb: "rgb(92, 41, 39)" },
  { name: "Pérola Claro", rgb: "rgb(246, 220, 184)" },
  { name: "Pêssego", rgb: "rgb(234, 190, 164)" },
  { name: "Flamingo", rgb: "rgb(223, 156, 128)" },
  { name: "Laranja Cítrico", rgb: "rgb(247, 161, 86)" },
  { name: "Laranja Imperial", rgb: "rgb(228, 142, 95)" },
  { name: "Laranja Maracatú", rgb: "rgb(236, 123, 79)" },
  { name: "Laranja Neon", rgb: "rgb(225, 132, 81)" },
  { name: "Terracota Suave", rgb: "rgb(187, 111, 88)" },
  { name: "Laranja", rgb: "rgb(215, 84, 19)" },
  { name: "Cerâmica Onix", rgb: "rgb(164, 81, 60)" },
  { name: "Cerâmica", rgb: "rgb(148, 79, 57)" },
  { name: "Marron Conhaque", rgb: "rgb(120, 85, 60)" },
  { name: "Romã", rgb: "rgb(246, 231, 210)" },
  { name: "Areia", rgb: "rgb(220, 203, 181)" },
  { name: "Creme", rgb: "rgb(226, 190, 139)" },
  { name: "Cromo Suave", rgb: "rgb(229, 183, 127)" },
  { name: "Ocre Colonial", rgb: "rgb(215, 162, 97)" },
  { name: "Mangaba", rgb: "rgb(220, 156, 80)" },
  { name: "Geada", rgb: "rgb(235, 228, 209)" },
  { name: "Pérola", rgb: "rgb(241, 223, 199)" },
  { name: "Marfim", rgb: "rgb(238, 220, 187)" },
  { name: "Palha", rgb: "rgb(231, 218, 194)" },
  { name: "Vanilla", rgb: "rgb(248, 215, 165)" },
  { name: "Amarelo Canário", rgb: "rgb(248, 211, 128)" },
  { name: "Sino", rgb: "rgb(239, 208, 119)" },
  { name: "Amarelo Frevo", rgb: "rgb(253, 191, 54)" },
  { name: "Amarelo Demarcação", rgb: "rgb(238, 179, 76)" },
  { name: "Amarelo Segurança", rgb: "rgb(240, 190, 0)" },
  { name: "Amarelo", rgb: "rgb(252, 164, 0)" },
  { name: "Amarelo - Padrão Wandepoxy", rgb: "rgb(253, 163, 0)" },
  { name: "Ouro Coral", rgb: "rgb(206, 161, 39)" },
  { name: "Amarelo Trator", rgb: "rgb(225, 144, 15)" },
  { name: "Verde Vale", rgb: "rgb(220, 228, 186)" },
  { name: "Capim Limão", rgb: "rgb(217, 220, 184)" },
  { name: "Refresco", rgb: "rgb(219, 201, 84)" },
  { name: "Verde Limão", rgb: "rgb(178, 187, 91)" },
  { name: "Orvalho", rgb: "rgb(230, 234, 213)" },
  { name: "Verde Primavera", rgb: "rgb(224, 235, 207)" },
  { name: "Sálvia", rgb: "rgb(219, 226, 203)" },
  { name: "Mate", rgb: "rgb(203, 211, 193)" },
  { name: "Verde Kiwi", rgb: "rgb(174, 182, 142)" },
  { name: "Verde Angra", rgb: "rgb(122, 174, 124)" },
  { name: "Verde Nilo", rgb: "rgb(129, 164, 115)" },
  { name: "Verde Claro", rgb: "rgb(120, 157, 99)" },
  { name: "Verde Timbalada", rgb: "rgb(83, 162, 80)" },
  { name: "Verde Quadra", rgb: "rgb(92, 114, 82)" },
  { name: "Verde Escolar", rgb: "rgb(79, 88, 77)" },
  { name: "Verde Folha", rgb: "rgb(58, 99, 50)" },
  { name: "Verde Escuro", rgb: "rgb(48, 80, 58)" },
  { name: "Verde Colonial", rgb: "rgb(41, 61, 52)" },
  { name: "Verde - Padrão Corante", rgb: "rgb(172, 227, 205)" },
  { name: "Verde Piscina", rgb: "rgb(159, 216, 208)" },
  { name: "Pavão", rgb: "rgb(0, 158, 165)" },
  { name: "Azul Piscina", rgb: "rgb(0, 136, 163)" },
  { name: "Oceanic", rgb: "rgb(205, 222, 230)" },
  { name: "Azul Praia", rgb: "rgb(195, 221, 232)" },
  { name: "Azul Sereno", rgb: "rgb(183, 210, 226)" },
  { name: "Marine", rgb: "rgb(175, 203, 212)" },
  { name: "Azul Arpoador", rgb: "rgb(124, 184, 198)" },
  { name: "Azul dos Andes", rgb: "rgb(131, 168, 193)" },
  { name: "Orquídea", rgb: "rgb(130, 152, 198)" },
  { name: "Oceano", rgb: "rgb(0, 146, 196)" },
  { name: "Azul Mar", rgb: "rgb(14, 144, 173)" },
  { name: "Azul Segurança", rgb: "rgb(0, 113, 161)" },
  { name: "Lua do Sertão", rgb: "rgb(0, 111, 158)" },
  { name: "Azul Profundo", rgb: "rgb(0, 111, 154)" },
  { name: "Azul", rgb: "rgb(5, 107, 143)" },
  { name: "Azul França", rgb: "rgb(0, 92, 138)" },
  { name: "Azul Del Rey", rgb: "rgb(17, 61, 99)" },
  { name: "Violeta", rgb: "rgb(225, 209, 215)" },
  { name: "Lilás", rgb: "rgb(163, 174, 198)" },
  { name: "Areia Sirena", rgb: "rgb(233, 223, 204)" },
  { name: "Pedra Preciosa", rgb: "rgb(209, 206, 199)" },
  { name: "Cinza Alpino", rgb: "rgb(204, 204, 203)" },
  { name: "Prata", rgb: "rgb(175, 180, 172)" },
  { name: "Tubarão Branco", rgb: "rgb(176, 176, 175)" },
  { name: "Platina", rgb: "rgb(171, 177, 172)" },
  { name: "Platina", rgb: "rgb(172, 175, 172)" },
  { name: "Cinza Médio", rgb: "rgb(145, 156, 154)" },
  { name: "Cinza - Padrão Wandepoxy", rgb: "rgb(141, 144, 142)" },
  { name: "Cinza Médio", rgb: "rgb(126, 127, 128)" },
  { name: "Cinza Médio", rgb: "rgb(122, 122, 121)" },
  { name: "Cinza Escuro", rgb: "rgb(93, 93, 91)" },
  { name: "Cinza - Padrão Ferrolack", rgb: "rgb(94, 97, 84)" },
  { name: "Cinza Escuro", rgb: "rgb(72, 77, 80)" },
  { name: "Preto", rgb: "rgb(59, 60, 60)" },
  { name: "Algodão Egípsio", rgb: "rgb(233, 225, 212)" },
  { name: "Crômio", rgb: "rgb(206, 204, 195)" },
  { name: "Castanho", rgb: "rgb(212, 191, 165)" },
  { name: "Bronze Lenda", rgb: "rgb(200, 187, 170)" },
  { name: "Camurça", rgb: "rgb(189, 166, 141)" },
  { name: "Madeira Acinzentada", rgb: "rgb(168, 153, 142)" },
  { name: "Concreto", rgb: "rgb(156, 143, 121)" },
  { name: "Alumínio", rgb: "rgb(141, 136, 133)" },
  { name: "Tabaco", rgb: "rgb(107, 68, 47)" },
  { name: "Vermelho Óxido", rgb: "rgb(92, 50, 37)" },
  { name: "Marron", rgb: "rgb(75, 47, 40)" }
];

const DISTANCE_THRESHOLD = 70; // Ajuste este valor conforme necessário

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<{ rgb: string; name: string; percentage: number }[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

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

  const extractColors = () => {
    if (imgRef.current) {
      const colorThief = new ColorThief();
      const imgElement = imgRef.current;
      const palette = colorThief.getPalette(imgElement, 10, 10);

      const totalPixels = imgElement.width * imgElement.height;
      const colorCount: { [key: string]: number } = {};

      palette.forEach(color => {
        const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        colorCount[rgb] = (colorCount[rgb] || 0) + 1;
      });

      const colorPercentages = Object.keys(colorCount).map(rgb => {
        const count = colorCount[rgb];
        const percentage = (count / totalPixels) * 100;
        return {
          rgb,
          name: findClosestColor(rgb),
          percentage: parseFloat(percentage.toFixed(2)) // Ajuste o número de casas decimais conforme necessário
        };
      });

      setColors(colorPercentages);
    }
  };

  const handleShowColors = () => {
    extractColors();
    setShowColors(true);
  };

  const euclideanDistance = (rgb1: [number, number, number], rgb2: [number, number, number]): number => {
    return Math.sqrt(
      Math.pow(rgb1[0] - rgb2[0], 2) +
      Math.pow(rgb1[1] - rgb2[1], 2) +
      Math.pow(rgb1[2] - rgb2[2], 2)
    );
  };

  const findClosestColor = (rgbString: string): string => {
    const rgb = parseRgb(rgbString);
    let closestColor = "Cor não encontrada na paleta";
    let minDistance = Infinity;

    colorMap.forEach(color => {
      const mapRgb = parseRgb(color.rgb);
      const distance = euclideanDistance(rgb, mapRgb);
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color.name;
      }
    });

    return minDistance <= DISTANCE_THRESHOLD ? closestColor : "Cor não encontrada na paleta";
  };

  const parseRgb = (rgbString: string): [number, number, number] => {
    const result = rgbString.match(/\d+/g);
    return result ? [parseInt(result[0]), parseInt(result[1]), parseInt(result[2])] : [0, 0, 0];
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Cores Extraídas", 10, 10);

    colors.forEach((color, index) => {
      doc.setFillColor(...parseRgb(color.rgb));
      doc.rect(10, 20 + (index * 10), 10, 10, 'F');
      doc.text(color.name, 25, 30 + (index * 10));
      doc.text(`${color.percentage}%`, 120, 30 + (index * 10)); // Exibe a porcentagem no PDF
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
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={colors} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#8884d8">
                  {colors.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color.rgb} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
