import { useEffect, useRef, useState } from "react";
import "./MainContent.scss";
import Add from "../../svg/Add";

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
  taskList,
  setEditbarOpen,
  editbarOpen,
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
  taskList: Array<object>;
  setEditbarOpen: Function;
  editbarOpen: boolean;
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
    hostRef.current?.classList.remove("grow-right");
    hostRef.current?.classList.remove("grow-left");
    // hostRef.current?.classList.remove("shrink-left");
    // hostRef.current?.classList.remove("shrink-right");
    if (editbarOpen) {
      console.log("EIOGJSIG");
      hostRef.current?.classList.add("play-small");
      return;
    } else {
      hostRef.current?.classList.remove("shrink-right");
      hostRef.current?.classList.remove("shrink-left");
      if (sidebarPos === 0) {
        hostRef.current?.classList.remove("play-left-main");
        hostRef.current?.classList.add("play-right-main");
      } else {
        hostRef.current?.classList.remove("play-right-main");
        hostRef.current?.classList.add("play-left-main");
      }
    }
  }

  function makeMainBoxSmaller() {
    hostRef.current?.classList.remove("grow-right");
    hostRef.current?.classList.remove("grow-left");
    hostRef.current?.classList.remove("play-left-main");
    hostRef.current?.classList.remove("play-right-main");
    if (sidebarPos === 0) {
      hostRef.current?.classList.remove("shrink-left");
      hostRef.current?.classList.add("shrink-right");
    } else {
      hostRef.current?.classList.remove("play-left-main");
      hostRef.current?.classList.add("shrink-left");
      hostRef.current?.classList.remove("shrink-right");
    }
  }
  function makeMainBoxGrow() {
    if (sidebarPos === 0) {
      hostRef.current?.classList.remove("permanant-shrink-right");
      hostRef.current?.classList.remove("permanant-shrink-left");
      hostRef.current?.classList.add("grow-right");
    } else {
      hostRef.current?.classList.add("grow-left");
      hostRef.current?.classList.remove("permanant-shrink-left");
      hostRef.current?.classList.remove("permanant-shrink-right");
    }
  }

  useEffect(() => {
    makeStyle();
  }, [sidebarPos]);

  useEffect(() => {
    if (editbarOpen) {
      makeMainBoxSmaller();
    } else {
      makeMainBoxGrow();
    }
  }, [editbarOpen]);

  useEffect(() => {
    if (playAnimation) {
      moveMainBox();
    }
  }, [playAnimation]);

  return (
    <div
      id="main-content"
      ref={hostRef}
      style={finalStyle}
      onAnimationStart={() => {
        hostRef.current?.classList.add("disabled-main");
      }}
      onAnimationEnd={() => {
        hostRef.current?.classList.remove("play-small");
        hostRef.current?.classList.remove("disabled-main");

        if (hostRef.current?.classList.contains("shrink-left")) {
          hostRef.current?.classList.remove("shrink-left");
          hostRef.current?.classList.add("permanant-shrink-left");
        }
        if (hostRef.current?.classList.contains("shrink-right")) {
          hostRef.current?.classList.remove("shrink-right");
          hostRef.current?.classList.add("permanant-shrink-right");
        }
      }}
    >
      {/* <p>Main content</p> */}
      <div className="notebooks-view">
        {taskList.map((data: any, index) => {
          return (
            <div className="notebook-main">
              <div className="top">
                <p>{data.name}</p>
                <Add
                  onClick={() => {
                    setEditbarOpen(false);
                  }}
                />
              </div>
              <div className="tasks">
                {data.tasks.map((task: any, index: number) => {
                  return (
                    <div
                      className="task"
                      onClick={() => {
                        setEditbarOpen(true);
                        console.log("here");
                      }}
                    >
                      <p key={index}>{task.name}</p>
                    </div>
                  );
                })}
                {/* {JSON.stringify(data.tasks)} */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainContent;
