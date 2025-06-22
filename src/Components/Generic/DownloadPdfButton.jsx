import React, { useState } from 'react';
import './DownloadPdfButton.css';

const DownloadPdfButton = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pdf-dolarhoy');
      console.log('Content-Type:', response.headers.get('content-type'));
      if (!response.ok) throw new Error('No se pudo generar el PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dolarhoy.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error al descargar el PDF: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="download-pdf-btn"
    >
      {loading ? 'Generando PDF...' : 'Descargar PDF de DolarHoy.com'}
    </button>
  );
};

export default DownloadPdfButton;
