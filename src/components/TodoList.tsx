import { IonList } from "@ionic/react";
import TodoItem from "./TodoItem";

interface TodoListProps {
  tasks: { id: number; text: string; completed: boolean }[];
  onRemove: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onToggleComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  onRemove,
  onEdit,
  onToggleComplete,
}) => {
  return (
    <IonList>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onRemove={onRemove}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </IonList>
  );
};

export default TodoList;
