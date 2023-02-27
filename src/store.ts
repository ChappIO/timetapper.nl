import {create} from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware'
import {v4 as uuid} from "uuid";


export interface Activity {
    id: string;
    name: string;
}

export interface Log {
    id: string;
    activityId: string;
    start: number;
    end?: number;
}

export interface State {
    activities: Activity[],
    logs: Log[];
    addActivity: () => void;
    start: (activityId: string) => void;
    stop: () => void;

    getActive(): string | false;
}

export const useStore = create(
    persist<State>(
        (set, get): State => ({
            activities: [],
            logs: [],
            addActivity() {
                set({activities: [...get().activities, {id: uuid(), name: 'New'}]})
            },
            start(activityId: string) {
                get().stop();
                set({
                    logs: [...get().logs, {
                        id: uuid(),
                        activityId,
                        start: Date.now()
                    }]
                })
            },
            stop() {
                const logs = get().logs;
                const lastLog = logs[logs.length - 1];
                if (lastLog && !lastLog.end) {
                    lastLog.end = Date.now();
                }
            },
            getActive(): string | false {
                const logs = get().logs;
                const lastLog = logs[logs.length - 1];
                if (lastLog && !lastLog.end) {
                    return lastLog.activityId;
                } else {
                    return false;
                }
            }
        }),
        {
            name: 'timetapper-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
