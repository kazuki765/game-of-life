import { useContext } from "solid-js";
import { GameOfLifeContext } from "./GameOfLife";

export function FieldCell(props: {
  life: boolean;
  rowIndex: number;
  columnIndex: number;
}) {
  const ctx = useContext(GameOfLifeContext);
  return (
    <div
      onClick={() => {
        ctx.setLives(
          ctx
            .lives()
            .map((row, ri) =>
              row.map((life, ci) =>
                ri === props.rowIndex && ci === props.columnIndex ? !life : life
              )
            )
        );
      }}
      style={{
        width: "10px",
        height: "10px",
        border: "1px solid #696969",
        "border-collapse": "collapse",
        "background-color": props.life ? "#000000" : "#ffffff00",
      }}
    ></div>
  );
}
