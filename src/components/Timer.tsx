import {useEffect, useState} from "react";
import {useStore} from "../store";
import {renderTimeSince} from "../lib/renderTimeSince";


export const Timer = () => {
    const [display, setDisplay] = useState('');
    const start = useStore(state => state.currentTask()?.start);

    useEffect(() => {
        const timer = setInterval(() => {
            if (start) {
                setDisplay(renderTimeSince(start, Date.now()));
            } else {
                setDisplay('--:--');
            }
        }, 100);

        return () => clearInterval(timer);
    }, [start]);

    return (
        <div>
            <div style={{marginBottom: 12, textAlign: 'center', fontSize: '2rem'}}>
                <pre><span className="icon"><i className="fas fa-stopwatch"/></span> {display}</pre>
            </div>
        </div>
    );
}