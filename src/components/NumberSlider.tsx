import { useEffect, useRef, useState } from "react";
import './NumberSlider.css';

interface NumberSliderProps {
    value: number | null;
    seed: number;
    selecting: boolean;
    onChange: (value: number) => void;
}

function NumberSlider({ value, seed, selecting, onChange }: NumberSliderProps) {
    const [ currentVal, setCurrentVal ] = useState(seed);
    const isIncreasing = useRef(true);
    useEffect(() => {
        if (value !== null) return;
        const interval = setInterval(() => {
            setCurrentVal((prev) => {
                if (isIncreasing.current) {
                    if (prev < 99) {
                        return prev + 11;
                    } else {
                        isIncreasing.current = false;
                        return prev - 11;
                    }
                } else {
                    if (prev > 0) {
                        return prev - 11;
                    } else {
                        isIncreasing.current = true;
                        return prev + 11;
                    }
                }
            });
        }, 100);
        return () => clearInterval(interval);
    }, [ value, onChange ])
    
    return (
        <div className="number-slider">
            <div className="number-slider__outer">
                <div 
                    className="number-slider__inner"
                    style={{
                        height: `${value ? value * 11 : currentVal}px`
                    }}></div>
            </div>
            { <button style={{visibility: (value || !selecting) ? 'hidden' : 'unset'}} onClick={onChange.bind(null, currentVal / 11)}>SET</button> }
            { <p>{value || currentVal / 11}</p> }
        </div>
    );

}

export default NumberSlider;