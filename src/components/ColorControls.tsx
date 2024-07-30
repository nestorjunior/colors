import React from 'react';

interface ColorControlsProps {
  onDownloadPDF: () => void;
  onShareResults: () => void;
  onPrintResults: () => void;
}

const ColorControls: React.FC<ColorControlsProps> = ({ onDownloadPDF, onShareResults, onPrintResults }) => {
  return (
    <div className="mt-3">
      <button onClick={onDownloadPDF} className="btn btn-secondary me-2">
        Baixar PDF
      </button>
      <button onClick={onShareResults} className="btn btn-info me-2">
        Compartilhar
      </button>
      <button onClick={onPrintResults} className="btn btn-danger">
        Imprimir
      </button>
    </div>
  );
};

export default ColorControls;
