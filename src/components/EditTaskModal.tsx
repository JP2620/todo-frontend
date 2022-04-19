import { useState } from "react";

type EditTaskModalProps = {
    openModal: (state: boolean) => void;
    taskName: string;
    completed: string;
    username: string;
    folder: string | undefined;
}

function EditTaskModal(props: EditTaskModalProps) {
    const [newDescription, setNewDescription] = useState<string>("");
    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2 className="modal-header">Editing task "{props.taskName}"</h2>
                <form className="task-edit-form" 
                onSubmit={(event:any) => {
                    props.openModal(false);
                    const data = {
                        owner: props.username,
                        folder: props.folder,
                        old_description: props.taskName,
                        new_description: newDescription,
                        state: props.completed
                    };
                    fetch("http://localhost:5001/api/todo/task", {
                        method: "PATCH",
                        credentials: "include",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json,text/*;q=0.99",
                        }
                    });
                    }}>
                    <div className="form-field">
                    <input className=".task-edit-input" type="text" name="newTask" placeholder="New Task"
                    onChange={(e) => setNewDescription(e.target.value)} />
                        <div className="task-edit-buttons">
                            <button onClick={() => props.openModal(false)} className="button-cancel" type="button">Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >

    )
}

export default EditTaskModal;
