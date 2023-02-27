import {useEffect, useState} from "react";
import {useStore} from "../store";
import {renderTimeSince} from "../lib/renderTimeSince";
import {classNames} from "../lib/classNames";

export const Timer = () => {
    const [display, setDisplay] = useState('');
    const [blink, setBlink] = useState(true);
    const start = useStore(state => state.currentTask()?.start);

    useEffect(() => {
        function update() {
            if (start) {
                setBlink(prev => !prev);
                setDisplay(renderTimeSince(start, Date.now()));
            } else {
                setDisplay('--:--');
                setBlink(false);
            }
        }

        const timer = setInterval(update, 1000);

        update();

        return () => clearInterval(timer);
    }, [start]);

    return (
        <div>
            <div style={{marginBottom: 12, textAlign: 'center', fontSize: '2rem'}}>
                <pre><span className="icon"><i className="fas fa-stopwatch"/></span>{' '}
                    <span {...classNames(blink && 'has-text-grey-lighter')}>{display}</span>
                </pre>
            </div>
        </div>
    );
}