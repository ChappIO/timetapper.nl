import {useStore} from "../store";
import React from "react";
import {ActivityBadge} from "./ActivityBadge";

export const Activities = () => {
    const activities = useStore(state => state.activities);

    return (
        <div className="activities buttons are-large">
            {activities.map(activity => (
                <ActivityBadge key={activity.id} {...activity}/>
            ))}
        </div>
    )
}