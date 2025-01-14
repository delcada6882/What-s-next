import { useEffect, useRef, useState } from "react";
import "./MainContent.scss";
import Add from "../../svg/Add";
import Delete from "../../svg/Delete";
import Edit from "../../svg/Edit";
import Checkmark from "../../svg/Checkmark";

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
  notebookViewed,
  setNotebookViewed,
  setTaskList,
  setTaskView,
  taskView,
  update,
  setUpdate,
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
  taskList: Array<any>;
  setEditbarOpen: Function;
  editbarOpen: boolean;
  notebookViewed: number;
  setNotebookViewed: Function;
  setTaskList: Function;
  setTaskView: Function;
  taskView: any;
  update: number;
  setUpdate: Function;
}) {
  const [finalStyle, setFinalStyle] = useState<any>();
  const [tempNotebookview, setTempNotebookView] = useState<number>(-1);

  const hostRef = useRef<HTMLDivElement>(null);
  const notebooks1Ref = useRef<HTMLDivElement>(null);
  const notebook2Ref = useRef<HTMLDivElement>(null);

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

  function showNotebookView() {
    notebooks1Ref.current?.classList.add("up-one");
    notebooks1Ref.current?.classList.remove("viewed");

    notebook2Ref.current?.classList.add("viewed");
    notebook2Ref.current?.classList.remove("down-one");
  }
  function showNotebooksView() {
    notebook2Ref.current?.classList.add("down-one");
    notebook2Ref.current?.classList.remove("viewed");

    notebooks1Ref.current?.classList.add("viewed");
    notebooks1Ref.current?.classList.remove("up-one");
  }

  function checkOff(task: number) {
    console.log(task);
    let tempTaskList = taskList;
    console.log(tempTaskList[tempNotebookview].tasks[task]);
    let tempTask = tempTaskList[tempNotebookview].tasks[task];

    tempTaskList[tempNotebookview].tasks[task].completed = true;
    tempTaskList[0].tasks.push(tempTask);

    setTaskList(tempTaskList);
    setUpdate(update + 1);
  }
  function checkOn(task: number) {
    console.log(task);
    let tempTaskList = taskList;
    console.log(tempTaskList[tempNotebookview].tasks[task]);
    let tempTask = tempTaskList[tempNotebookview].tasks[task];

    tempTaskList[tempNotebookview].tasks[task].completed = false;
    const indexFor = tempTaskList[0]["tasks"].indexOf(tempTask);
    console.log(indexFor);
    tempTaskList[0]["tasks"].splice(indexFor, 1);

    setTaskList(tempTaskList);
    setUpdate(update + 1);
  }

  function openTask(task: number) {
    if (
      editbarOpen &&
      taskView[0] === tempNotebookview &&
      taskView[1] === task
    ) {
      setEditbarOpen(false);
      setTaskView("");
    } else {
      setEditbarOpen(true);
      setTaskView([tempNotebookview, task]);
    }
  }

  function deleteTask(task: number) {
    const tempTaskList = taskList;

    tempTaskList[notebookViewed]["tasks"].splice(task, 1);

    console.log(tempTaskList[notebookViewed]["tasks"]);

    setTaskList(tempTaskList);
    setUpdate(update + 1);
  }

  function createTask() {
    setTaskView([tempNotebookview, -1, 1]);

    setEditbarOpen(true);
  }

  useEffect(() => {
    if (notebookViewed !== -1) {
      showNotebookView();
      setTempNotebookView(notebookViewed);
    } else {
      showNotebooksView();
    }
  }, [notebookViewed]);

  useEffect(() => {
    makeStyle();
  }, [sidebarPos]);

  useEffect(() => {
    if (editbarOpen) {
      makeMainBoxSmaller();
    } else {
      setTaskView([-1, -1]);
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
      className={editbarOpen ? "blackout" : ""}
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
      <div className="notebooks-view-main" ref={notebooks1Ref}>
        <div className="notebooks-holder">
          {taskList.map((data: any, index) => {
            return (
              <div
                className="notebook-main"
                onClick={() => {
                  setNotebookViewed(index);
                }}
              >
                <div className="top">
                  <p>{data.name}</p>
                </div>
                <div className="tasks">
                  {data.tasks.map((task: any, index: number) => {
                    return (
                      <div className="task">
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
      <div className="notebook-view-main" ref={notebook2Ref}>
        <div className="top">
          <h1>{taskList[tempNotebookview]?.name}</h1>
        </div>
        <div className="tasks-main">
          {taskList[tempNotebookview]?.tasks.map((data: any, index: number) => {
            return (
              <div className={`task-main ${data.completed ? "complete" : ""}`}>
                <p style={{ display: "none" }}>{update}</p>
                <div className="name">
                  <div className="text-and-check">
                    <div
                      className={`checkmark-box  ${
                        data.completed ? "active" : "not-active"
                      }`}
                      onClick={(e) => {
                        if (e.currentTarget.classList.contains("not-active")) {
                          e.currentTarget.classList.remove("not-active");
                          e.currentTarget.classList.add("active");
                          checkOff(index);
                        } else {
                          e.currentTarget.classList.add("not-active");
                          e.currentTarget.classList.remove("active");
                          checkOn(index);
                        }
                      }}
                    >
                      <div className="blank"></div>
                      <Checkmark />
                    </div>
                    <h2>{data.name}</h2>
                  </div>

                  <div className="icons">
                    <Delete
                      onClick={() => {
                        deleteTask(index);
                      }}
                    />
                    <Edit
                      onClick={() => {
                        openTask(index);
                      }}
                    />
                  </div>
                </div>
                <div className="description">
                  <p>{data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="add-button">
          <Add
            onClick={() => {
              createTask();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
