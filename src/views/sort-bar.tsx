import React from "react";
import styled from "@emotion/styled";

type Props = {
  sort: Sort;
  onChange: (s: Sort) => void;
};

const Wrapper =  styled.div`
    display:flex;
    align-items: center;
    gap: 8px;
`;

const Select = styled.select`
    padding: 6px 8px;
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: 6px;
    color: black;
    background: ${(p) => p.theme.colors.surface || "#fff"};
    cursor: pointer;
`;

export type Sort = "newest" | "oldest";

export const SortBar: React.FC<Props> = ({ sort, onChange}) => {
    return (
        <Wrapper>
            <label htmlFor="sort-select" style={{ fontSize: 13, color: (undefined as any) }}>
                Сортировка:
            </label>
            <Select
                id = "sort-select"
                value={sort}
                onChange={(e) => onChange(e.target.value as Sort)}
                aria-label="Сортировка задач"
            >
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
            </Select>
        </Wrapper>
    );
};