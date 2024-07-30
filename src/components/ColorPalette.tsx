import React from 'react';

interface Color {
  rgb: string;
  name: string;
  percentage: string;
}

interface ColorPaletteProps {
  colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
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
    </div>
  );
};

export default ColorPalette;
