import React from 'react';

interface ImagePreviewProps {
  imageSrc: string | null;
  imgRef: React.RefObject<HTMLImageElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onExtractColors: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc, imgRef, canvasRef, onExtractColors }) => {
  return (
    <>
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
            <button onClick={onExtractColors} className="btn btn-success">
              Mostrar Cores
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
