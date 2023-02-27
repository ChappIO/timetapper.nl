import {Activity, useStore} from "../store";
import {classNames} from "../lib/classNames";
import useLongPress from "../hooks/useLongPress";
import {useState} from "react";

export interface Props extends Activity {
}

export const ActivityBadge = ({id, name}: Props) => {
    const active = useStore(state => state.currentTask()?.activityId) === id;
    const start = useStore(state => state.start);
    const [renameOpen, setRenameOpen] = useState(false);
    const longPress = useLongPress(() => {
        setRenameOpen(true);
    }, 500);

    return (
        <>
            <button {...classNames(
                'button',
                'is-primary',
                'activity',
                !active && 'is-inverted'
            )}
                    {...longPress}
                    onClick={(e) => {
                        e.preventDefault();
                        start(id);
                    }}>
                {name}
            </button>
            {renameOpen && (
                <div className="modal is-active">

                </div>
            )}
        </>
    )
}