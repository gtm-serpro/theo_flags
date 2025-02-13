import React from 'react';
import { Country } from '../types/Country';

interface CardFrontProps {
    country: Country;
}

const CardFront: React.FC<CardFrontProps> = ({ country }) => {
    return (
        <div className="w-full h-full bg-[url('/bg.svg')] bg-cover flex flex-col items-center justify-center p-5">
            <img 
                src={country.flag} 
                alt={`Bandeira de ${country.name}`} 
                className="max-h-48 max-w-[250px]"
            />
        </div>
    );
};

export default CardFront;