import { For, useContext } from "solid-js";
import { FieldCell } from "./FieldCell";
import { GameOfLifeContext } from "./GameOfLife";

export type FieldProps = {
  scale: number;
};
export function Field() {
  const ctx = useContext(GameOfLifeContext);
  return (
    <>
      <div>age: {ctx.age()}</div>

      <div
        style={{
          display: "grid",
          "grid-template-columns": `repeat(${ctx.scale()}, 1fr)`,
          width: "fit-content",
          border: "1px solid #696969",
        }}
      >
        <For
          each={ctx.lives()}
          children={(liveRow, rowIndex) => (
            <For
              each={liveRow}
              children={(life, columnIndex) => (
                <FieldCell
                  life={life}
                  rowIndex={rowIndex()}
                  columnIndex={columnIndex()}
                ></FieldCell>
              )}
            ></For>
          )}
        ></For>
      </div>
    </>
  );
}
