import React, { useState } from "react";
import { IPalette } from "../types";

interface IProps {
  palette: IPalette;
  isMine: boolean;
  selected: boolean;
  setSelPal: (id: string) => void;
}

interface IPaletteContext {
  isCtxOpen: boolean;
  setSelected: (id: string) => void;
  palette: IPalette;
}

export const PaletteItem = ({
  palette,
  selected,
  isMine,
  setSelPal,
}: IProps) => {
  const [isCtxOpen, setIsCtxOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: selected ? "rgb(239, 203, 255)" : "",
        minWidth: "160px",
        minHeight: "64px",
      }}
      onClick={() => {
        setIsCtxOpen(!isCtxOpen);
      }}
      className="palette flex cursor-pointer flex-col items-center rounded bg-gray-200 p-4 hover:bg-purple-200"
    >
      {!isCtxOpen ? (
        <>
          <div>{palette.name}</div>
          <div className="colors flex items-center justify-center gap-2">
            {palette.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="border-1 h-4 w-4 rounded-lg border-black"
                style={{ backgroundColor: color }}
              ></div>
            ))}
            {palette.colors.length > 4 && <div>...</div>}
          </div>
        </>
      ) : (
        <div
          className="context top-0 left-0 flex-col justify-center rounded"
          style={{ display: isCtxOpen ? "flex" : "none" }}
        >
          <div className="flex">
            <div
              onClick={() => console.log("edit")}
              className="flex w-full justify-center  rounded px-2  hover:bg-purple-200"
            >
              {isMine ? "Edit" : "Add"}
            </div>
            <div
              onClick={() => {
                console.log("use");
                setSelPal(palette.id);
              }}
              className="flex w-full justify-center  rounded px-2  hover:bg-purple-200"
            >
              Use
            </div>
          </div>
          <div className="flex w-full">
            {isMine && (
              <div
                onClick={() => console.log("edit")}
                className="flex w-full justify-center rounded px-2  hover:bg-purple-200"
              >
                Delete
              </div>
            )}

            <div
              onClick={() => console.log("cancel")}
              className="flex w-full justify-center  rounded px-2  hover:bg-purple-200"
            >
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
