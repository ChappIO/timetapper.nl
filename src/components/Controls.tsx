import React from "react";
import {useStore} from "../store";

export const Controls = () => {
    const addActivity = useStore(state => state.addActivity);
    const stop = useStore(state => state.stop);

    return (
        <div className="buttons has-addons is-centered are-large">
            <button className="button is-success" onClick={() => addActivity()}>
                Add
            </button>
            <button className="button is-danger" onClick={() => stop()}>
                Stop
            </button>
        </div>
    );
}