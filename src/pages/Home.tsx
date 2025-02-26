import { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import api from "../services/api";
import TodoList from "../components/TodoList";
import {
  add,
  addCircle,
  addCircleOutline,
  addCircleSharp,
  addOutline,
  addSharp,
  filterSharp,
  personCircle,
} from "ionicons/icons";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Estado para abrir/fechar o popover
  const [popoverEvent, setPopoverEvent] = useState<
    React.MouseEvent | undefined
  >(undefined); // Para capturar o evento do clique no botão

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data);
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    const response = await api.post("/tasks", {
      text: newTask,
      completed: false,
    });
    setTasks([...tasks, response.data]);
    setNewTask("");
  };

  const removeTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = async (id: number, newText: string) => {
    const response = await api.put(`/tasks/${id}`, { text: newText });
    setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const response = await api.put(`/tasks/${id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleFilterClick = (e: React.MouseEvent) => {
    setPopoverEvent(e); // Captura o evento de clique para abrir o popover
    setIsPopoverOpen(true); // Abre o popover
  };

  const handleFilterSelect = (selectedFilter: string) => {
    setFilter(selectedFilter); // Atualiza o filtro
    setIsPopoverOpen(false); // Fecha o popover após selecionar
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Lista de tarefas</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={personCircle} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" size-sm="10">
              <IonInput
                value={newTask}
                onIonChange={(e) => setNewTask(e.detail.value!)}
                placeholder="Nova tarefa"
                fill="outline"
                clearInput={true}
              />
            </IonCol>
            <IonCol size="3" size-sm="2">
              <IonButton expand="block" onClick={addTask} size="large">
                <IonIcon icon={add} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton
          onClick={handleFilterClick}
          fill="outline"
          style={{ marginLeft: "10px" }}
        >
          <IonIcon icon={filterSharp} style={{ marginRight: "10px" }} />
          Filtrar por:{" "}
          {filter === "all"
            ? "Todas"
            : filter === "completed"
            ? "Concluídas"
            : "Pendentes"}
        </IonButton>

        <IonPopover
          isOpen={isPopoverOpen}
          event={popoverEvent}
          onDidDismiss={() => setIsPopoverOpen(false)}
        >
          <IonList>
            <IonItem button onClick={() => handleFilterSelect("all")}>
              <IonLabel>Todas</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleFilterSelect("completed")}>
              <IonLabel>Concluídas</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleFilterSelect("pending")}>
              <IonLabel>Pendentes</IonLabel>
            </IonItem>
          </IonList>
        </IonPopover>

        <TodoList
          tasks={filteredTasks}
          onRemove={removeTask}
          onEdit={editTask}
          onToggleComplete={toggleComplete}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
