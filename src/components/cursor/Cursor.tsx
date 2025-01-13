import "./Cursor.scss";

import { ReactElement, useRef, useState } from "react";

function Cursor() {
  const mouseRef = useRef<HTMLDivElement>(null);

  window.addEventListener("mousemove", (event) => {
    if (mouseRef.current === null) {
      return;
    }
    mouseRef.current.style.top = `${event.clientY - 150}px`;
    mouseRef.current.style.left = `${event.clientX - 150}px`;
  });
  return <div id="cursor" ref={mouseRef}></div>;
}

export default Cursor;
