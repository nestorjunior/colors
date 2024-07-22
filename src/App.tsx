import { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import './App.css';

const colorMap: { [key: string]: string } = {
  "rgb(245, 244, 237)": "Incolor",
  // ... (outros mapeamentos de cores)
  "rgb(75, 47, 40)": "Marron"
};

const DISTANCE_THRESHOLD = 70; // Ajuste este valor conforme necessário

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<{ rgb: string; name: string; percentage: number }[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImageSrc(e.target.result);
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
      const namedColors = palette.map(color => {
        const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        const name = findClosestColor(rgb);
        return { rgb, name, percentage: 0 };
      });
      countColorOccurrences(imgElement, namedColors);
    }
  };

  const countColorOccurrences = (imgElement: HTMLImageElement, namedColors: { rgb: string; name: string; percentage: number }[]) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colorCounts: { [key: string]: number } = {};
    let totalPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      const rgb = `rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`;
      const closestColor = findClosestColor(rgb);

      if (colorCounts[closestColor]) {
        colorCounts[closestColor]++;
      } else {
        colorCounts[closestColor] = 1;
      }
      totalPixels++;
    }

    const updatedColors = namedColors.map(color => ({
      ...color,
      percentage: ((colorCounts[color.name] || 0) / totalPixels) * 100,
    }));

    setColors(updatedColors);
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

  return (
    <>
      <div>
        <h2>Muralize</h2>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImageDrop}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            marginTop: '20px'
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
            Arraste e solte a imagem aqui ou clique para fazer upload
          </label>
        </div>
        {imageSrc && (
          <div style={{ marginTop: '20px' }}>
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Uploaded"
              crossOrigin="anonymous"
              onLoad={extractColors}
              style={{ maxWidth: '500px', maxHeight: '500px', width: '500px', height: '500px' }}
            />
          </div>
        )}
        {colors.length > 0 && (
          <div>
            <h3>Cores extraídas</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {colors.map((color, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{
                    backgroundColor: color.rgb,
                    width: '50px',
                    height: '50px',
                    marginRight: '10px'
                  }}></div>
                  <span>{color.name} - {color.percentage.toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
