import { useState, useMemo } from 'react';
import './App.css'
import NumberSlider from './components/NumberSlider'

type NullableNum = number | null;

function App() {

  const [ number, setNumber ] = useState<NullableNum[]>([null, null, null, null, null, null, null, null, null, null]);
  const finished = useMemo(() => number.every((val) => val !== null), number);

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
        seed={i * 10}
        key={i}
        value={number[i]}
        selecting={i === currentIndex}
        onChange={numberSliderCallback(i)}
      />
    );
  }
  
  return (
    <>
      <h1>Phone UX Is Important</h1>
      <div className="phone-number">
        <p>Enter your phone number:</p>
        <div className='phone-number__selector'>
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

    </>
  )
}

export default App
