import React from "react";
import {useStore} from "../store";
import {renderTimeSince} from "../lib/renderTimeSince";

function toCsv(data: string[][]) {
    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function (rowArray) {
        let row = rowArray.join(";");
        csvContent += row + "\n";
    });
    return encodeURI(csvContent);
}

export const Controls = () => {
    const addActivity = useStore(state => state.addActivity);
    const stop = useStore(state => state.stop);
    const state = useStore(state => state);

    return (
        <div className="buttons has-addons is-centered are-large">
            <button className="button is-success" onClick={() => addActivity()}>
                Add
            </button>
            <button className="button is-danger" onClick={() => {
                console.log('uh');
                stop();
            }}>
                Stop
            </button>
            <button className="button is-info" onClick={() => {
                const data = state.logs.map(entry => ([
                    state.activities.find(a => entry.activityId === a.id)?.name || '',
                    entry.end ? renderTimeSince(entry.start, entry.end) : ''
                ]));
                const link = document.createElement('a');
                link.download = `activities_${new Date().toISOString().split('T')[0]}.csv`;
                link.href = toCsv(data);
                link.click();
                state.reset();
            }}>
                Export
            </button>
        </div>
    );
}