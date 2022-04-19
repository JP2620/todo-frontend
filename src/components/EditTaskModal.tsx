type EditTaskModalProps = {
    openModal: (state: boolean) => void;
}

function EditTaskModal(props: EditTaskModalProps) {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2 className="modal-header">Edit Task</h2>
                <form>
                    <input type="text" name="newTask" placeholder="New Task" />
                    <div className="buttons">
                        <button onClick={() => props.openModal(false)} type="submit">Save</button>
                        <button onClick={() => props.openModal(false)} className="button-cancel" type="button">Cancel</button>
                    </div>
                </form>
            </div>
        </div >

    )
}

export default EditTaskModal;
