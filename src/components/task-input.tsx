/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./button";

type TaskInputProps = {
  onAdd: (title: string) => void;
};

const Form = styled.form`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

const Input = styled.input`
  flex: 1;
  padding: ${(p) => p.theme.spacing(1)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
`;

const ErrorText = styled.p`
  color: ${(p) => p.theme.colors.error};
  font-size: 14px;
  margin-top: ${(p) => p.theme.spacing(0.5)};
`;

export const TaskInput = (p: TaskInputProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      setError("Название задачи не может быть пустым");
      return;
    }

    if (trimmed.length > 50) {
      setError("Название задачи слишком длинное (макс. 50 символов)");
      return;
    }

    p.onAdd(trimmed);
    setValue("");
    setError(null);
  };

  const buttonEnter = (e: React.FormEvent) => {
    e.preventDefault(); 
    handleAdd(); 
  };

  return (
    <div>
      <Form onSubmit={buttonEnter}>
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          placeholder="Введите задачу"
        />
        <Button label="Добавить" onClick={handleAdd}/>
      </Form>

      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

