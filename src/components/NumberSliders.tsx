import { useState } from "react";
import NumberSlider from "./NumberSlider";

type NullableNum = number | null;

export default function NumberSliders() {
    const [ number, setNumber ] = useState<NullableNum[]>([null, null, null, null, null, null, null, null, null, null]);
  const finished = number.every((val) => val !== null);

  const [ currentIndex, setCurrentIndex ] = useState(0);
  const numberSliderCallback = (index: number) => (val: number) => {
    setNumber((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
    setCurrentIndex(index => index + 1);
  }

  const numberSliders = [];
  for (let i = 0; i < 10; i++) {
    numberSliders.push(
      <NumberSlider
        seed={i * 11}
        key={i}
        value={number[i]}
        selecting={i === currentIndex}
        onChange={numberSliderCallback(i)}
      />
    );
  }

  return (
      <div className="phone-number">
        <p>Enter your phone number:</p>
        <div className='number-sliders'>
          { numberSliders}
        </div>
        { finished && <>
          <p>Phone number: {number.join('')}</p>
          <p>Is this your number?</p>
          <button onClick={() => {
              setNumber([null, null, null, null, null, null, null, null, null, null]);
              setCurrentIndex(0);
            }}>No</button>
          </>
        }
      </div>
    )
}