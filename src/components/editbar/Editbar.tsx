import { LegacyRef, useEffect, useRef, useState } from "react";
import "./Editbar.scss";
import ArrowRight from "../../svg/ArrowRight";
import Add from "../../svg/Add";
import { create } from "domain";

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
  taskView,
  setTaskList,
  update,
  setUpdate,
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
  taskList: Array<any>;
  setEditbarOpen: Function;
  editbarOpen: boolean;
  playAnimation: boolean;
  taskView: Array<number>;
  setTaskList: Function;
  update: number;
  setUpdate: Function;
}) {
  const [finalStyle, setFinalStyle] = useState<any>();

  const nameRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);

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
    hostRef.current?.classList.remove("play-right-edit");
    hostRef.current?.classList.remove("play-left-edit");
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

  function editTask() {
    let tempTask = taskList[taskView[0]]?.tasks[taskView[1]];
    let tempTaskList: Array<any> = taskList;

    if (nameRef.current.value === "" || descriptionRef.current.value === "") {
      return;
    }

    tempTask.name = nameRef.current.value;
    tempTask.desciption = descriptionRef.current.value;
    tempTaskList[taskView[0]]["tasks"][taskView[1]]["name"] =
      nameRef.current.value;
    tempTaskList[taskView[0]]["tasks"][taskView[1]]["description"] =
      descriptionRef.current.value;

    setTaskList(tempTaskList);
    setUpdate(update + 1);
    setEditbarOpen(false);
  }

  function createTask() {
    let tempTaskList: Array<any> = taskList;

    if (nameRef.current.value === "" || descriptionRef.current.value === "") {
      return;
    }
    tempTaskList[taskView[0]]["tasks"].push({
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      completed: false,
    });

    setTaskList(tempTaskList);
    setUpdate(update + 1);
    setEditbarOpen(false);
  }

  function createNotebook() {
    let tempTaskList: Array<any> = taskList;

    if (nameRef.current.value === "") {
      return;
    }
    tempTaskList.push({
      name: nameRef.current.value,
      tasks: [
        {
          name: "Time to get started!",
          description: "Delete me.",
          completed: false,
        },
      ],
    });

    setTaskList(tempTaskList);
    setUpdate(update + 1);
    setEditbarOpen(false);
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
      <div className="edit-view">
        <div className="top">
          {taskView[2] === 1 ? (
            <h2>Create Task</h2>
          ) : taskView[2] === 2 ? (
            <h3>Create Notebook</h3>
          ) : (
            <h2>Edit Task</h2>
          )}
          <Add
            onClick={() => {
              setEditbarOpen(false);
            }}
          />
        </div>
        {taskView[2] === 1 ? (
          <div className="edit-space">
            <div className="name">
              <h3>Name:</h3>
              {taskView[0] !== -1 ? (
                <textarea
                  // defaultValue={taskList[taskView[0]]?.tasks[taskView[1]]?.name}
                  ref={nameRef}
                />
              ) : (
                <p>Loading</p>
              )}
            </div>
            <div className="description">
              <h3>Description:</h3>

              {taskView[0] !== -1 ? (
                <textarea
                  // defaultValue={
                  //   taskList[taskView[0]]?.tasks[taskView[1]]?.description
                  // }
                  ref={descriptionRef}
                />
              ) : (
                <p>Loading</p>
              )}
            </div>
            <button
              onClick={() => {
                createTask();
              }}
            >
              Confirm
            </button>
          </div>
        ) : taskView[2] === 2 ? (
          <div className="edit-space">
            <div className="name">
              <h3>Name:</h3>
              {taskView[0] !== -1 ? <textarea ref={nameRef} /> : <p>Loading</p>}
            </div>
            <button
              onClick={() => {
                createNotebook();
              }}
            >
              Confirm
            </button>
          </div>
        ) : (
          <div className="edit-space">
            <div className="name">
              <h3>Name:</h3>
              {taskView[0] !== -1 ? (
                <textarea
                  defaultValue={taskList[taskView[0]]?.tasks[taskView[1]]?.name}
                  ref={nameRef}
                />
              ) : (
                <p>Loading</p>
              )}
            </div>
            <div className="description">
              <h3>Description:</h3>

              {taskView[0] !== -1 ? (
                <textarea
                  defaultValue={
                    taskList[taskView[0]]?.tasks[taskView[1]]?.description
                  }
                  ref={descriptionRef}
                />
              ) : (
                <p>Loading</p>
              )}
            </div>
            <button
              onClick={() => {
                editTask();
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editbar;
