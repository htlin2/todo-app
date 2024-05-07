import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function TodoBar(props) {
  const { addTodo, todoDesc, setTodoDesc } = props;
  const handleOnKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await addTodo();
    }
  };
  return (
    <Form className="m-3">
      <Row>
        <Col>
          <Form.Control
            id="add-todo"
            value={todoDesc}
            placeholder="What's on your mind for today?"
            onKeyDown={handleOnKeyDown}
            onChange={(e) => setTodoDesc(e.target.value)}
          />
        </Col>
        <Col xs="auto" className="m-0 mt-1">
          <Button onClick={addTodo}>Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}
export default TodoBar;
