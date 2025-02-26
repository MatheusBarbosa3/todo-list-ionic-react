import { IonItem, IonLabel, IonButton, IonInput, IonIcon } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import {
  checkmarkCircleOutline,
  checkmarkCircle,
  trash,
  pencilSharp,
} from "ionicons/icons";

interface TodoItemProps {
  task: { id: number; text: string; completed: boolean };
  onRemove: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onToggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onRemove,
  onEdit,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para controle de edição
  const [newText, setNewText] = useState(task.text); // Texto da tarefa para edição
  const inputRef = useRef<HTMLIonInputElement>(null); // Referência para o input

  const handleEdit = () => {
    if (isEditing && newText !== task.text) {
      onEdit(task.id, newText); // Chama a função onEdit para salvar a edição
    }
    setIsEditing(!isEditing); // Alterna entre editar e visualizar
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.setFocus(); // Foca manualmente no input ao entrar no modo de edição
    }
  }, [isEditing]);

  return (
    <IonItem>
      <IonButton
        fill="clear"
        color={task.completed ? "success" : "medium"}
        onClick={() => onToggleComplete(task.id)}
        size="default"
      >
        <IonIcon
          icon={task.completed ? checkmarkCircle : checkmarkCircleOutline}
        />
      </IonButton>
      <IonLabel
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {isEditing ? (
          <IonInput
            value={newText}
            onIonChange={(e) => setNewText(e.detail.value!)}
            ref={inputRef} // Usando a referência para o foco
          />
        ) : (
          task.text
        )}
      </IonLabel>
      <IonButton onClick={handleEdit}>
        {isEditing ? "Salvar" : <IonIcon icon={pencilSharp} />}
      </IonButton>
      <IonButton color="danger" onClick={() => onRemove(task.id)}>
        <IonIcon icon={trash} />
      </IonButton>
    </IonItem>
  );
};

export default TodoItem;
