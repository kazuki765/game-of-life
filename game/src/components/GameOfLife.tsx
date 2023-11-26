import {
  Accessor,
  JSXElement,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js";
import { Field } from "./Field";
import { next } from "./life-sycle";

export type GameOfLifeContextValue = {
  age: Accessor<number>;
  lives: Accessor<boolean[][]>;
  setLives: (lives: boolean[][]) => void;
  scale: Accessor<number>;
};
export const GameOfLifeContext = createContext<GameOfLifeContextValue>({
  age: () => 0,
  lives: () => [],
  setLives: () => {},
  scale: () => 0,
});

function GameOfLifeProvider(props: { children: JSXElement; scale: number }) {
  // NOTE: scale が 150 を超えると、レンダリングが追いつかなくなるので、150 に制限する
  const scale = createMemo(() => (props.scale > 150 ? 150 : props.scale));
  const [age, setAge] = createSignal(0);
  const [lives, setLives] = createSignal<boolean[][]>(
    Array.from({ length: scale() }, (_, ri) =>
      Array.from(
        { length: scale() },
        (_, ci) =>
          ri % Math.floor(Math.random() * 3) === 0 &&
          ci % Math.floor(Math.random() * 10) === 0
      )
    )
  );

  createEffect(() => {
    scale();

    setAge(0);
  });

  createEffect(() => {
    setLives(
      Array.from({ length: scale() }, (_, ri) =>
        Array.from(
          { length: scale() },
          (_, ci) =>
            Math.floor(Math.random() * 10) % 3 === 0 &&
            ci % Math.floor(Math.random() * 10) === 0
        )
      )
    );
  });

  const nextLives = createMemo(() =>
    lives().map((r, ri) => r.map((_, ci) => next(lives(), ri, ci)))
  );

  const id = setInterval(() => {
    setAge(age() + 1);
    setLives(nextLives());
  }, 250);

  onCleanup(() => {
    clearInterval(id);
  });

  return (
    <GameOfLifeContext.Provider
      value={{
        age,
        lives,
        setLives,
        scale,
      }}
    >
      {props.children}
    </GameOfLifeContext.Provider>
  );
}

export function GameOfLife() {
  const [scale, setScale] = createSignal(50);
  return (
    <GameOfLifeProvider scale={scale()}>
      <main
        style={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
        }}
      >
        <h1>Game of Life</h1>
        <div>
          <label for="scale-input">scale</label>
          <input
            id="scale-input"
            value={scale()}
            onChange={(e) => setScale(Number(e.target.value) ?? 50)}
            placeholder="0~150"
          ></input>
        </div>
        <Field></Field>
      </main>
    </GameOfLifeProvider>
  );
}
