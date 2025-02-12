import React from 'react';
import { Country } from '../types/Country';

interface CardBackProps {
    country: Country;
}

const CardBack: React.FC<CardBackProps> = ({ country }) => {
    return (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center bg-[url('/bg.svg')] grayscale text-left">
            <div className="bg-[rgba(255,255,255,.8)] w-full h-full flex items-center justify-center">
                <div className="relative z-10 flex max-w-[80%]">
                    <div>
                        <div className="flex justify-between items-center gap-4">
                            <h2 className="text-lg font-bold text-balance">{country.name}</h2>
                            <p className="text-sm">{country.code}</p>
                        </div>
                        <h3 className="text-sm font-light mb-4 text-balance ">
                            {country.official_name}
                        </h3>
                        <div className="grid grid-cols-1">
                            <table className="w-full text-xs">
                                <tbody>
                                    <tr>
                                        <td className="font-bold w-20">Região</td>
                                        <td>{country.region}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold w-20">Subregião</td>
                                        <td>{country.subregion}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold w-20">Capital</td>
                                        <td>{country.capital}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold w-20">População</td>
                                        <td>{country.population}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold w-20">Área</td>
                                        <td>{country.area} km²</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold w-20">Moeda</td>
                                        <td>{country.currency}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold w-20">Idioma</td>
                                        <td>{country.language}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold w-20">Fronteiras</td>
                                        <td>{country.borders}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardBack;