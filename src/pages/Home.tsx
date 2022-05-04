import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const task = tasks.find((task) => {
      return task.title === newTaskTitle;
    });
    if (!task) {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks([...tasks, newTask]);
    } else {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const newListWithTaskModified = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(newListWithTaskModified);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldState) => oldState.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTaks(taskId: number, taskNewTitle: string) {
    const newListWithTaskModified = tasks.map((task) =>
      task.id === taskId ? { ...task, title: taskNewTitle } : task
    );
    setTasks(newListWithTaskModified);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTaks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
