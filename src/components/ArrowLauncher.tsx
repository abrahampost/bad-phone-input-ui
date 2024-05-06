import { useEffect, useState } from "react";
import './ArrowLauncher.css';
import { formatPhoneNumber } from "../util/format";

type NullableNum = number | null;

export default function ArrowLauncher() {
    const [ angle, setAngle ] = useState(0);
    const [ power, setPower ] = useState(0);
    const [ physics, setPhysics ] = useState({ x: 20, y: 20, xVel: 0, yVel: 0 });
    const [ launched, setLaunched ] = useState(false);
    const [ number, setNumber ] = useState<NullableNum>(null);

    useEffect(() => {
        if (!launched || number) return;
        const interval = setInterval(() => {
            setPhysics((prev) => {            
                const nextTick = { ...prev };
                nextTick.x += nextTick.xVel;
                nextTick.y += nextTick.yVel;
                if (nextTick.y < 0) {
                    nextTick.y = 0;
                    nextTick.xVel = 0;
                    nextTick.yVel = 0;
                    setNumber(-1);
                } else if (nextTick.x > 480) {
                    nextTick.x = 480;
                    nextTick.xVel = 0;
                    nextTick.yVel = 0;
                    setNumber(nextTick.y / 400 * 1_0000_000_000);
                }
                nextTick.yVel -= 2;
                console.log(prev, nextTick);
                return nextTick;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [ launched, number ]);

    const launch = () => {
        const nextTick = { ...physics };
        nextTick.xVel = Math.cos((90-angle) * Math.PI / 180) * power;
        nextTick.yVel = Math.sin((90-angle) * Math.PI / 180) * power;
        setPhysics(nextTick);
        setLaunched(true);
    }

    return (
        <div className="phone-number">
            <div className="arrow-launcher">
                <div className="arrow-launcher__arena">
                    <div className="arrow-launcher__cannon" style={{ transform: `rotate(${angle}deg) translate(50%, -50%)` }}></div>
                    <div className="arrow-launcher__target">
                        <div className="top">999-999-9999</div>
                        <div className="bottom">000-000-0000</div>
                    </div>
                    <div className="arrow-launcher__arrow" style={{ left: `${physics.x}px`, bottom: `${physics.y}px`, background: number !== null ? 'red' : 'var(--color-secondary)' }}></div>
                </div>
                <div className="arrow-launcher__settings">
                    <label>Angle</label>
                    <input type="range" min={5} max={85} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
                    <label>Power</label>
                    <input type="range" min={20} max={50} value={power} onChange={(e) => setPower(Number(e.target.value))} />
                    <button onClick={launch} disabled={launched || number !== null}>Launch</button>
                </div>
            </div>
            <div className="phone-number__result">
                { number !== null && <>
                    { number > 0 && <>
                        <p>Phone number: {formatPhoneNumber(number)}</p>
                        <p>Is this your number?</p>
                    </>}
                    { number === -1 && <p>Missed target</p> }
                    <button onClick={() => {
                        setNumber(null);
                        setLaunched(false);
                        setPhysics({ x: 20, y: 20, xVel: 0, yVel: 0 });
                    }}>Try Again</button>
                </> }
            </div>
        </div>
    )
}