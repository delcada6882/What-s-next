import { useEffect, useState } from "react";
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
}) {
  const [finalStyle, setFinalStyle] = useState<any>();

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
        height: `calc(100vh - calc(${headerSize}px + ${gap}px))`,
        top: headerSize,
        width: `calc(100vw - calc(${sidebarSize}px + calc(${gap}px * 3)))`,
        borderRadius: borderRadius,
      });
    }
  }

  useEffect(() => {
    makeStyle();
  }, []);

  return (
    <div id="main-content" style={finalStyle}>
      <p>Main content</p>
    </div>
  );
}

export default MainContent;
