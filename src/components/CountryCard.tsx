import React, { useState } from 'react';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { Country } from '../types/Country';

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="card-container">
            <div 
                className={`card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className="card-side card-front">
                    <CardFront country={country} />
                </div>
                <div className="card-side card-back">
                    <CardBack country={country} />
                </div>
            </div>
        </div>
    );
};

export default CountryCard;