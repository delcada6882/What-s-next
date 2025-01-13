import { useEffect, useState } from "react";
import "./Sidebar.scss";

function Sidebar({
  gap,
  headerSize,
  width,
  borderRadius,
  debug,
  left,
  top,
  height,
}: {
  gap: number;
  headerSize: number;
  width: number;
  borderRadius: number;
  debug: boolean;
  left?: number;
  top?: number;
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
        left: gap,
        height: `calc(100vh - calc(${headerSize}px + ${gap}px))`,
        width: width,
        top: headerSize,
        borderRadius: borderRadius,
      });
    }
  }

  useEffect(() => {
    makeStyle();
  }, []);

  return (
    <div id="sidebar" style={finalStyle}>
      <p>Sidebar works</p>
    </div>
  );
}

export default Sidebar;
