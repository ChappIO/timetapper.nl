import NoSleep from 'nosleep.js';
import React, {useEffect} from 'react';
import {Activities} from "./components/Activities";
import {Controls} from "./components/Controls";
import {Timer} from "./components/Timer";

const noSleep = new NoSleep();

export const App = () => {
    useEffect(() => {
        document.addEventListener('click', async function enableNoSleep() {
            document.removeEventListener('click', enableNoSleep, false);
            await noSleep.enable();
        }, false);
    }, []);
    return (
        <>
            <Activities/>
            <Timer/>
            <Controls/>
        </>
    );
};
