import { LegacyRef, useEffect, useRef, useState } from "react";
import "./Editbar.scss";
import ArrowRight from "../../svg/ArrowRight";

function Editbar({
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
  taskList,
  setEditbarOpen,
  editbarOpen,
  playAnimation,
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
  taskList: Array<object>;
  setEditbarOpen: Function;
  editbarOpen: boolean;
  playAnimation: boolean;
}) {
  const [finalStyle, setFinalStyle] = useState<any>();

  const hostRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<any>(null);

  const [side, setSide] = useState("right");

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
        left: `-${gap + width}px`,
        height: `calc(100vh - ${headerSize + gap + gap / 4}px)`,
        width: width,
        top: headerSize + gap / 4,
        borderRadius: borderRadius,
      });
    }
  }

  useEffect(() => {
    makeStyle();
  }, [editbarOpen, sidebarPos]);

  useEffect(() => {
    if (editbarOpen) {
      summonEditbar();
    } else {
      goEditbar();
    }
  }, [editbarOpen]);

  useEffect(() => {
    if (editbarOpen) {
      moveEditbar();
    }
  }, [playAnimation]);

  function summonEditbar() {
    hostRef.current?.classList.remove("go-left-edit");
    hostRef.current?.classList.remove("go-right-edit");
    if (sidebarPos === 1) {
      hostRef.current?.classList.add("summon-left-edit");
      hostRef.current?.classList.remove("summon-right-edit");
    } else {
      hostRef.current?.classList.add("summon-right-edit");
      hostRef.current?.classList.remove("summon-left-edit");
    }
  }
  function goEditbar() {
    hostRef.current?.classList.remove("permanant-summon-left");
    hostRef.current?.classList.remove("permanant-summon-right");
    if (sidebarPos === 1) {
      hostRef.current?.classList.remove("summon-left-edit");
      hostRef.current?.classList.add("go-left-edit");
    } else {
      hostRef.current?.classList.remove("summon-right-edit");
      hostRef.current?.classList.add("go-right-edit");
    }
  }

  function moveEditbar() {
    hostRef.current?.classList.remove("permanant-summon-left");
    hostRef.current?.classList.remove("permanant-summon-right");

    if (sidebarPos === 0) {
      hostRef.current?.classList.remove("play-left-edit");
      hostRef.current?.classList.add("play-right-edit");
    } else {
      hostRef.current?.classList.remove("play-right-edit");
      hostRef.current?.classList.add("play-left-edit");
    }
  }

  return (
    <div
      id="editbar"
      style={finalStyle}
      ref={hostRef}
      onAnimationStart={() => {
        hostRef.current?.classList.add("disabled-edit");
      }}
      onAnimationEnd={() => {
        hostRef.current?.classList.remove("disabled-edit");
        if (hostRef.current?.classList.contains("summon-right-edit")) {
          hostRef.current?.classList.remove("summon-right-edit");
          hostRef.current?.classList.add("permanant-summon-right");
        }
        if (hostRef.current?.classList.contains("summon-left-edit")) {
          hostRef.current?.classList.remove("summon-left-edit");
          hostRef.current?.classList.add("permanant-summon-left");
        }
      }}
    >
      <div className="notebook-view">I work!</div>
    </div>
  );
}

export default Editbar;
