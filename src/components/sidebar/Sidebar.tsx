import { useEffect, useRef, useState } from "react";
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
  sidebarPos,
  setSidebarPos,
  setPlayAnimation,
}: {
  gap: number;
  headerSize: number;
  width: number;
  borderRadius: number;
  debug: boolean;
  left?: number;
  top?: number;
  height?: number;
  sidebarPos: number;
  setSidebarPos: Function;
  setPlayAnimation: Function;
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
        left: gap,
        height: `calc(100vh - ${headerSize + gap + gap / 4}px)`,
        width: width,
        top: headerSize + gap / 4,
        borderRadius: borderRadius,
      });
    }
  }

  useEffect(() => {
    makeStyle();
  }, [sidebarPos]);

  function moveSidebar() {
    if (hostRef.current?.classList.contains("play-right-side")) {
      hostRef.current?.classList.remove("play-right-side");
      hostRef.current?.classList.add("play-left-side");
    } else {
      hostRef.current?.classList.remove("play-left-side");
      hostRef.current?.classList.add("play-right-side");
    }
  }

  return (
    <div
      id="sidebar"
      style={finalStyle}
      ref={hostRef}
      onAnimationStart={() => {
        setSidebarPos(1);
        setPlayAnimation(true);
        hostRef.current?.classList.add("disabled-side");
      }}
      onAnimationEnd={() => {
        setPlayAnimation(false);
        hostRef.current?.classList.remove("disabled-side");
      }}
    >
      <p>Sidebar works</p>
      <button onClick={moveSidebar}>CLICK ME</button>
    </div>
  );
}

export default Sidebar;
