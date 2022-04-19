type EditTaskModalProps = {
    openModal: (state: boolean) => void;
    taskName: string;
}

function EditTaskModal(props: EditTaskModalProps) {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2 className="modal-header">Editing task "{props.taskName}"</h2>
                <form className="task-edit-form">
                    <div className="form-field">
                    <input className=".task-edit-input" type="text" name="newTask" placeholder="New Task" />
                        <div className="task-edit-buttons">
                            <button onClick={() => props.openModal(false)} className="button-cancel" type="button">Cancel</button>
                            <button onClick={() => props.openModal(false)} type="submit">Save</button>
                        </div>
                    </div>

                </form>
            </div>
        </div >

    )
}

export default EditTaskModal;
