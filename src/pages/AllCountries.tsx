// AllCountries.tsx
import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import { Country } from '../types/Country';

const AllCountries: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);

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
                        borders: columns[11] && columns[11].trim() !== '[]' ? columns[11].replace(/\[/g, "").replace(/\]/g, "").replace(/'/g, "").split(';').join(', ') : '- ',
                        flag: columns[12]
                    };
                });
                setCountries(parsedCountries);
            });
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-5 bg-slate-800 p-5">
            {countries.map(country => (
                <CountryCard key={country.code} country={country} />
            ))}
        </div>
    );
};

export default AllCountries;