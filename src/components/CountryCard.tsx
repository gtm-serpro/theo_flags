// CountryCard.tsx
import React, { useState, useRef, useEffect } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { Country } from "../types/Country";

interface CountryCardProps {
  country: Country;
  setRefs?: (front: HTMLDivElement | null, back: HTMLDivElement | null) => void;
  showBack?: boolean; // if provided, forces a particular side
}

const CountryCard: React.FC<CountryCardProps> = ({ country, setRefs, showBack }) => {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (setRefs) {
      setRefs(frontRef.current, backRef.current);
    }
  }, [setRefs]);

  // Container and side classes to enforce fixed dimensions
  const containerClasses = "card-container w-64 h-80 relative";
  const sideClasses = "card-side absolute top-0 left-0 w-full h-full";

  // Forced display of one side (disabling interactive flip)
  if (typeof showBack === "boolean") {
    return (
      <div className={containerClasses}>
        {showBack ? (
          <div ref={backRef} className={`${sideClasses} card-back forced-show`}>
            <CardBack country={country} />
          </div>
        ) : (
          <div ref={frontRef} className={`${sideClasses} card-front forced-show`}>
            <CardFront country={country} />
          </div>
        )}
      </div>
    );
  }

  // Default interactive flip behavior (unused in Groups view)
  return (
    <div className={containerClasses} onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={`card w-full h-full relative transform transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div ref={frontRef} className={`${sideClasses} card-front`}>
          <CardFront country={country} />
        </div>
        <div ref={backRef} className={`${sideClasses} card-back`}>
          <CardBack country={country} />
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
