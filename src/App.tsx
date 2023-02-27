import NoSleep from 'nosleep.js';
import React, {useEffect} from 'react';
import {Activities} from "./components/Activities";
import {Controls} from "./components/Controls";
import {Timer} from "./components/Timer";
import {useStore} from "./store";

const noSleep = new NoSleep();

export const App = () => {
    useEffect(() => {
        document.addEventListener('click', async function enableNoSleep() {
            document.removeEventListener('click', enableNoSleep, false);
            await noSleep.enable();
        }, false);
    }, []);
    // console.log(JSON.stringify(
    //     useStore(state => state),
    //     null,
    //     2
    // ));
    return (
        <>
            <Activities/>
            <Timer/>
            <Controls/>
        </>
    );
};
