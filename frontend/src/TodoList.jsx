import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import EditModal from "./EditModal";

function TodoList(props) {
  const { todoList, deleteTodo, editTodo } = props;
  return (
    <div className="m-3">
      <Table striped={true} hover={true} className="rounded-table">
        <thead>
          <tr>
            <th>#</th>
            <th colSpan={3}>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo, i) => (
            <tr key={todo.id}>
              <td>{i + 1}</td>
              <td colSpan={3}>{todo.description}</td>
              <td>
                <EditModal editTodo={editTodo} todoId={todo.id} />
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default TodoList;
