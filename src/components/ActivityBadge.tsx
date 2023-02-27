import {Activity, useStore} from "../store";
import {classNames} from "../lib/classNames";
import useLongPress from "../hooks/useLongPress";

export interface Props extends Activity {
}

export const ActivityBadge = ({id, name}: Props) => {
    const active = useStore(state => state.currentTask()?.activityId) === id;
    const start = useStore(state => state.start);
    const longPress = useLongPress(() => {
        alert('rename!');
    }, 500);
    return (
        <button {...classNames(
            'button',
            'is-primary',
            'activity',
            !active && 'is-inverted'
        )}
                {...longPress}
                onClick={() => {
                    start(id);
                }}>
            {name}
        </button>
    )
}