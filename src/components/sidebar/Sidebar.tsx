import { LegacyRef, useEffect, useRef, useState } from "react";
import "./Sidebar.scss";
import ArrowRight from "../../svg/ArrowRight";
import Add from "../../svg/Add";

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
  taskList,
  notebookViewed,
  setNotebookViewed,
  update,
  setUpdate,
  editbarOpen,
  setEditbarOpen,
  setTaskView,
  taskView,
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
  notebookViewed: number;
  setNotebookViewed: Function;
  update: number;
  setUpdate: Function;
  editbarOpen: boolean;
  setEditbarOpen: Function;
  setTaskView: Function;
  taskView: Array<number>;
}) {
  const [finalStyle, setFinalStyle] = useState<any>();

  const hostRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<any>(null);

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

  useEffect(() => {
    if (editbarOpen) {
      hostRef.current?.classList.add("blackout");
    } else {
      hostRef.current?.classList.remove("blackout");
    }
  }, [editbarOpen]);

  function moveSidebar() {
    if (hostRef.current?.classList.contains("play-right-side")) {
      setSidebarPos(0);
      hostRef.current?.classList.remove("play-right-side");
      hostRef.current?.classList.add("play-left-side");
    } else {
      setSidebarPos(1);
      hostRef.current?.classList.remove("play-left-side");
      hostRef.current?.classList.add("play-right-side");
    }
    if (arrowRef.current?.classList.contains("rotate-right")) {
      arrowRef.current?.classList.remove("rotate-right");
      arrowRef.current?.classList.add("rotate-left");
    } else {
      arrowRef.current?.classList.remove("rotate-left");
      arrowRef.current?.classList.add("rotate-right");
    }
  }

  function createNotebook() {
    setEditbarOpen(true);
    setTaskView([0, 0, 2]);
  }

  return (
    <div
      id="sidebar"
      style={finalStyle}
      ref={hostRef}
      onAnimationStart={() => {
        setPlayAnimation(true);
        hostRef.current?.classList.add("disabled-side");
      }}
      onAnimationEnd={() => {
        setPlayAnimation(false);
        hostRef.current?.classList.remove("disabled-side");
      }}
    >
      <div className="notebooks-view-side">
        <div className="top">
          <h2>Task List</h2>
          <ArrowRight ref={arrowRef} onClick={moveSidebar} />
        </div>
        <div
          className="add-notebook"
          onClick={() => {
            createNotebook();
          }}
        >
          <Add />
          <p>Add notebook</p>
        </div>
        <div className="notebook-container">
          {taskList.map((data: any, index) => {
            return (
              <div
                className={`notebook ${
                  notebookViewed === index ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  setNotebookViewed(index);
                }}
              >
                <p>{data.name}</p>
              </div>
            );
          })}
        </div>
        <div className="view-all">
          <div
            className={`notebook ${notebookViewed === -1 ? "selected" : ""}`}
            onClick={() => {
              setNotebookViewed(-1);
            }}
          >
            <p>View all</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
