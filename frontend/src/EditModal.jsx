import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function EditModal(props) {
  const { editTodo, todoId } = props;

  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);

  const handleSetDesc = async (todoId) => {
    const res = await fetch(`http://localhost:3000/todos/${todoId}`);
    const todo = await res.json();
    setDesc(todo.description);
  };

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    await handleSetDesc(todoId);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={async () => {
              handleClose();
              await editTodo({ id: todoId, description: desc });
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
