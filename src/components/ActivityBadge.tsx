import {Activity, useStore} from "../store";
import {classNames} from "../lib/classNames";
import {useState} from "react";

export interface Props extends Activity {
}

export const ActivityBadge = ({id, name}: Props) => {
    const active = useStore(state => state.currentTask()?.activityId) === id;
    const start = useStore(state => state.start);
    const rename = useStore(state => state.rename);
    const deleteActivity = useStore(state => state.deleteActivity);
    const [renameOpen, setRenameOpen] = useState(false);

    return (
        <div className="activity buttons has-addons">
            <button {...classNames(
                'button',
                'main',
                'is-primary',
                !active && 'is-outlined'
            )}
                    onClick={(e) => {
                        e.preventDefault();
                        start(id);
                    }}>
                {name}

            </button>
            <button className="button is-primary is-outlined" onClick={() => {
                setRenameOpen(true);
            }}>
                <i className="fas fa-pencil"/>
            </button>
            {renameOpen && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => {
                        setRenameOpen(false);
                    }}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{name}</p>
                            <button className="delete" aria-label="close" onClick={() => {
                                setRenameOpen(false);
                            }}/>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Name</label>
                                <input className="input" value={name} onChange={(e) => {
                                    rename(id, e.target.value);
                                }}/>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={() => {
                                deleteActivity(id);
                            }}>Delete</button>
                            <button className="button" onClick={() => {
                                setRenameOpen(false);
                            }}>Cancel</button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    )
}