/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import type { Filter } from "../entities/task";
import type { Sort } from "./sort-bar";
import  { SortBar} from "./sort-bar";

type Props = {
  filter: Filter;
  onChange: (f: Filter) => void;
  sort: Sort;
  onSortChange: (s: Sort) => void;
};

const Wrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border: 1px solid
    ${(p) => (p.active ? p.theme.colors.accent : p.theme.colors.border)};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) =>
    p.active ? p.theme.colors.accent : p.theme.colors.surface};
  color: ${(p) => (p.active ? "#fff" : p.theme.colors.text)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(p) =>
      p.active ? p.theme.colors.accentHover : "#f5f5f5"};
    border-color: ${(p) =>
      p.active ? p.theme.colors.accentHover : p.theme.colors.border};
  }
`;

export const FilterBar = (p: Props) => (
  <Wrapper>
    <FilterButton active={p.filter === "all"} onClick={() => p.onChange("all")}>
      Все
    </FilterButton>
    <FilterButton
      active={p.filter === "active"}
      onClick={() => p.onChange("active")}
    >
      Активные
    </FilterButton>
    <FilterButton
      active={p.filter === "completed"}
      onClick={() => p.onChange("completed")}
    >
      Завершённые
    </FilterButton>

    <SortBar sort={p.sort} onChange={p.onSortChange} />
  </Wrapper>
);

