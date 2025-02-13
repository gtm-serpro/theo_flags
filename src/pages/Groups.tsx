// Groups.tsx
import React, { useEffect, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import CountryCard from '../components/CountryCard';
import { Country } from '../types/Country';

// Helper function to break an array into chunks
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4 my-4">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-white">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const Groups: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch('data.tsv')
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n').slice(1);
        const parsedCountries: Country[] = rows.map(row => {
          const columns = row.split('\t');
          return {
            code: columns[1],
            name: columns[2],
            official_name: columns[3],
            population: columns[4] ? parseInt(columns[4]).toLocaleString('pt-BR') : 'N/A',
            area: columns[5] ? parseInt(columns[5]).toLocaleString('pt-BR') : 'N/A',
            capital: columns[6] ? columns[6].split(';').join(', ') : 'N/A',
            region: columns[7],
            subregion: columns[8] ? columns[8] : ' - ',
            language: columns[9] ? columns[9].split(';').join(', ') : 'N/A',
            currency: columns[10] ? columns[10].split(';').join(', ') : 'N/A',
            borders:
              columns[11] && columns[11].trim() !== '[]'
                ? columns[11]
                    .replace(/\[/g, "")
                    .replace(/\]/g, "")
                    .replace(/'/g, "")
                    .split(';')
                    .join(', ')
                : '- ',
            flag: columns[12]
          };
        });
        setCountries(parsedCountries);
      });
  }, []);

  // Chunk the countries into groups of 35
  const countryChunks = chunkArray(countries, 35);
  const totalPages = countryChunks.length;
  const currentChunk = countryChunks[currentPage] || [];

  // Reference to the hidden export container (for exporting all groups at once if desired)
  // const exportAllContainerRef = useRef<HTMLDivElement>(null);

  // Export all groups (each group individually) as separate SVG files
  const exportEachGroupAsSVG = () => {
    countryChunks.forEach((_, index) => {
      const groupElement = document.getElementById(`export-group-${index}`);
      if (groupElement) {
        htmlToImage.toSvg(groupElement)
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `group-${index + 1}.svg`;
            link.href = dataUrl;
            link.click();
          })
          .catch((error) => {
            console.error(`Export failed for group ${index + 1}:`, error);
          });
      }
    });
  };

  // Optional: Export the current page's front side as an SVG
  const exportCurrentFront = () => {
    const node = document.getElementById('group-container-front');
    if (node) {
      htmlToImage.toSvg(node)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `group-front-page-${currentPage + 1}.svg`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Export failed:', error);
        });
    }
  };

  return (
    <div className="bg-slate-800 p-5">
      {/* Export Buttons */}
      <div className="mb-4 flex flex-col items-center space-y-2">
        <button 
          onClick={exportCurrentFront}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Export Current Front as SVG
        </button>
        <button 
          onClick={exportEachGroupAsSVG}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Export Each Group as SVG
        </button>
      </div>

      {/* Front of the Cards (Current Page) */}
      <section>
        <h2 className="text-white text-2xl mb-4 text-center">Front of Cards</h2>
        <div className="overflow-auto">
          <div 
            id="group-container-front"
            className="grid grid-cols-5 gap-1 w-fit min-w-fit"
          >
            {currentChunk.map(country => (
              // Force the front side (disable flip by passing showBack={false})
              <CountryCard key={country.code} country={country} showBack={false} />
            ))}
          </div>
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => {
            if (page >= 0 && page < totalPages) {
              setCurrentPage(page);
            }
          }}
        />
      </section>

      {/* Back of the Cards (Current Page) */}
      <section className="mt-12">
        <h2 className="text-white text-2xl mb-4 text-center">Back of Cards</h2>
        <div className="overflow-auto">
        <div className="grid grid-cols-5 gap-1 w-fit min-w-fit">
          {chunkArray(currentChunk, 5).map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.slice().reverse().map(country => (
                <CountryCard key={`back-${country.code}`} country={country} showBack={true} />
              ))}
            </React.Fragment>
          ))}
        </div>
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => {
            if (page >= 0 && page < totalPages) {
              setCurrentPage(page);
            }
          }}
        />
      </section>

      {/* Hidden Export Containers: One per group */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        {countryChunks.map((chunk, index) => (
          <div key={`export-group-${index}`} id={`export-group-${index}`} className="mb-8">
            <h2 className="text-black text-2xl mb-2">Group {index + 1} - Front</h2>
            <div className="grid grid-cols-5 gap-1 w-fit min-w-fit">
              {chunk.map(country => (
                <CountryCard key={`front-${country.code}`} country={country} showBack={false} />
              ))}
            </div>
            <h2 className="text-black text-2xl mt-4 mb-2">Group {index + 1} - Back</h2>
            <div className="grid grid-cols-5 gap-1 w-fit min-w-fit">
              {chunkArray(chunk, 5).map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.slice().reverse().map(country => (
                    <CountryCard key={`back-${country.code}`} country={country} showBack={true} />
                  ))}
                </React.Fragment>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
