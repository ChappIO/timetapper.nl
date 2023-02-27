import {create} from "zustand";
import {persist} from 'zustand/middleware'
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
    currentTask: () => Log | undefined;
    addActivity: () => void;
    start: (activityId: string) => void;
    stop: () => void;

    reset(): void;
}

export const useStore = create(
    persist<State>(
        (set, get): State => ({
            activities: [],
            logs: [],
            currentTask: () => {
                const logs = get().logs;
                if (logs.length === 0) {
                    return undefined;
                }
                const last = logs[logs.length - 1];
                if (last.end) {
                    return undefined;
                }
                return last;
            },
            addActivity: () => set((state) => ({
                activities: [...state.activities, {id: uuid(), name: 'New'}]
            })),
            start: (activityId: string) => set((state) => {
                const logs = [...state.logs, {
                    id: uuid(),
                    activityId,
                    start: Date.now(),
                }]
                return {
                    logs
                }
            }),
            stop: () => set((state) => {
                const logs = state.logs;
                const last = logs.pop();
                if (!last) {
                    return {};
                }
                return {
                    logs: [
                        ...logs,
                        {...last, end: Date.now()}
                    ]
                }
            }),
            reset: () => set({logs: []})
        }),
        {
            name: 'timetapper-storage',
        }
    )
);
