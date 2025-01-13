import { useEffect, useRef, useState } from "react";
import "./MainContent.scss";

function MainContent({
  gap,
  headerSize,
  sidebarSize,
  borderRadius,
  debug,
  left,
  top,
  width,
  height,
  sidebarPos,
  playAnimation,
}: {
  gap: number;
  headerSize: number;
  sidebarSize: number;
  borderRadius: number;
  debug: boolean;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  sidebarPos: number;
  playAnimation: boolean;
}) {
  const [finalStyle, setFinalStyle] = useState<any>();

  const hostRef = useRef<HTMLDivElement>(null);

  function makeStyle() {
    if (debug) {
      setFinalStyle({
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      });
    } else {
      setFinalStyle({
        left: `calc(${sidebarSize}px + calc(${gap}px * 2))`,
        height: `calc(100vh - calc(${headerSize + gap / 4}px + ${gap}px))`,
        top: headerSize + gap / 4,
        width: `calc(100vw - calc(${sidebarSize}px + calc(${gap}px * 3)))`,
        borderRadius: borderRadius,
      });
    }
  }

  function moveMainBox() {
    if (hostRef.current?.classList.contains("play-left-main")) {
      hostRef.current?.classList.remove("play-left-main");
      hostRef.current?.classList.add("play-right-main");
    } else {
      hostRef.current?.classList.remove("play-right-main");
      hostRef.current?.classList.add("play-left-main");
    }
  }

  useEffect(() => {
    makeStyle();
  }, []);

  useEffect(() => {
    if (playAnimation) {
      moveMainBox();
    }
  }, [playAnimation]);

  return (
    <div id="main-content" ref={hostRef} style={finalStyle}>
      <p>Main content</p>
    </div>
  );
}

export default MainContent;
