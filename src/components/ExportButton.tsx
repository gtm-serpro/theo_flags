// ExportButton.tsx
import React from 'react';
import * as htmlToImage from 'html-to-image';

const ExportButton: React.FC = () => {
  const handleExport = () => {
    const node = document.getElementById('group-container');
    if (node) {
      htmlToImage.toSvg(node)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'group.svg';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Export failed:', error);
        });
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-500 text-white rounded"
    >
      Export as SVG
    </button>
  );
};

export default ExportButton;
