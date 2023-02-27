import {Activity, useStore} from "../store";
import {classNames} from "../lib/classNames";

export interface Props extends Activity {
}

export const ActivityBadge = ({id, name}: Props) => {
    const activeActivity = useStore(state => state.getActive());
    const start = useStore(state => state.start);
    return (
        <button {...classNames(
            'button',
            'is-primary',
            'activity', id !== activeActivity && 'is-inverted'
        )}
                onClick={() => {
                    start(id);
                }}>
            {name}
        </button>
    )
}