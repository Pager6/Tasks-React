import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import type { Task, Filter } from "../entities/task";
import { makeTask } from "../entities/task";
import { TaskInput } from "../components/task-input";
import { TaskList } from "../components/task-list";
import { FilterBar } from "../views/filter-bar";
import { SearchBar } from "../views/search-bar";
import type { Sort } from "../views/sort-bar";
import { TaskModal } from "../components/task-modal";
import { ProgressBar } from "../components/progress-bar";


const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacing(4)};
  max-width: 600px;
  margin: 0 auto;
`;

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);


  const handleAddTask = (title: string) => {
    const newTask = makeTask(title);
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };


  const handleRemoveTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });
  }, [tasks, filter]);

  const searchedTasks = useMemo(() => {
    return filteredTasks.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [filteredTasks, query]);

  const sortedTasks = useMemo(() => {
    const copy = [...searchedTasks];
    copy.sort((a, b) => {
      const aTime = a.createdAt.getTime();
      const bTime = b.createdAt.getTime();

      if (sort === "newest") {
        return bTime - aTime;
      } else {
        return aTime - bTime;
      }
    });
    return copy;
  }, [searchedTasks, sort]);

  return (
    <Wrapper>
      <h1>Задачи на месяц</h1>
      <TaskInput onAdd={handleAddTask} />
      <SearchBar query={query} onChange={setQuery} />
      <FilterBar
        filter={filter}
        onChange={setFilter}
        sort={sort}
        onSortChange={setSort}
      />

      <ProgressBar percent={percent} />

      <TaskList
        tasks={sortedTasks}
        onToggle={handleToggleTask}
        onRemove={handleRemoveTask}
        onEdit={(task) => setEditingTask(task)} 
      />

      {editingTask && (
        <TaskModal
          task={editingTask}
          onSave={(updatedTask) => {
            handleEditTask(updatedTask);
            setEditingTask(null);
          }}
          onClose={() => setEditingTask(null)}
        />
      )}
    </Wrapper>
  );
};





