import React from 'react';
import { useDropzone, Accept } from 'react-dropzone';

interface FileUploaderProps {
  onImageUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onImageUpload }) => {
  const accept: Accept = {
    'image/*': [] // Aceita todos os tipos de imagem
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      onImageUpload(file);
    },
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Arraste uma imagem ou clique para selecionar</p>
    </div>
  );
};

export default FileUploader;
