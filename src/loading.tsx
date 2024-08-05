import { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const colorMap: { [key: string]: string } = {
  // Adicione seu mapa de cores aqui
};

const DISTANCE_THRESHOLD = 70; // distância mínima de pixels das cores

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<{ rgb: string; name: string; area: string }[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [height, setHeight] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const clearImage = () => {
    setImageSrc(null);
    setColors([]);
    setShowColors(false);
    setHeight('');
    setWidth('');
  };

  useEffect(() => {
    if (imageSrc && imgRef.current && canvasRef.current) {
      const imgElement = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);
      }
    }
  }, [imageSrc]);

  const extractColors = () => {
    if (imgRef.current && canvasRef.current) {
      const imgElement = imgRef.current;

      // Configurar canvas para a extração de pixels
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
      }

      // Mapear o número de pixels para cada cor extraída
      const pixelCounts = new Map<string, number>();
      let totalPixels = 0;

      if (ctx) {
        for (let y = 0; y < imgElement.height; y++) {
          for (let x = 0; x < imgElement.width; x++) {
            const pixelData = ctx.getImageData(x, y, 1, 1).data;
            const rgb = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

            // Encontrar a cor mais próxima da paleta
            const closestColor = findClosestColor(rgb);
            pixelCounts.set(
              closestColor,
              (pixelCounts.get(closestColor) || 0) + 1
            );
            totalPixels++;
          }
        }
      }

      // Criar uma lista de cores com seus nomes e áreas
      const colorList = Array.from(pixelCounts.entries())
        .map(([name, count]) => ({
          rgb: findRgbByName(name),
          name,
          area: (
            ((count / totalPixels) * (width as number) * (height as number))
          ).toFixed(2),
        }))
        .filter(color => parseFloat(color.area) >= 1) // Filtra cores com menos de 1m²
        .sort((a, b) => parseFloat(b.area) - parseFloat(a.area)); // Ordena por área em ordem decrescente

      // Seleciona as 6 principais cores
      const topColors = colorList.slice(0, 6);

      setColors(topColors);
      setLoading(false); // Parar o loading após a extração de cores
    }
  };

  const handleShowColors = () => {
    setLoading(true); // Iniciar o loading
    setTimeout(() => {
      extractColors();
      setShowColors(true);
    }, 1000); // Simulando o tempo de carregamento para extração
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
      Math.pow(rgb2[2] - rgb2[2], 2)
    );
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Cores Extraídas", 10, 10);

    colors.forEach((color, index) => {
      doc.setFillColor(...parseRgb(color.rgb));
      doc.rect(10, 20 + (index * 10), 10, 10, 'F');
      doc.text(`${color.name} (${color.area} m²)`, 25, 30 + (index * 10));
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
              <div className="d-flex justify-content-center align-items-center">
                <label htmlFor="height" className="me-2">Altura (m):</label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="form-control me-3"
                  style={{ width: '100px' }}
                />
                <label htmlFor="width" className="me-2">Largura (m):</label>
                <input
                  type="number"
                  id="width"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="form-control"
                  style={{ width: '100px' }}
                />
              </div>
            </div>
            <div className="mt-3">
              <button onClick={clearImage} className="btn btn-danger me-3">
                Limpar Imagem
              </button>
              <button
                onClick={handleShowColors}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  'Mostrar Cores'
                )}
              </button>
            </div>
          </div>
        )}
        {showColors && colors.length > 0 && (
          <div className="mt-4">
            <h4>Cores Extraídas:</h4>
            <div className="color-list">
              {colors.map((color, index) => (
                <div key={index} className="color-item d-flex align-items-center mb-2">
                  <div
                    className="color-box me-3"
                    style={{ backgroundColor: color.rgb }}
                  ></div>
                  <div>
                    <span>{color.name}</span>
                    <span className="ms-2">({color.area} m²)</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button onClick={downloadPDF} className="btn btn-secondary me-3">
                Baixar PDF
              </button>
              <button onClick={shareResults} className="btn btn-info me-3">
                Compartilhar
              </button>
              <button onClick={printResults} className="btn btn-warning">
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
