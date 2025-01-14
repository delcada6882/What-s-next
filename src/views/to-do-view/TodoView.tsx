import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import MainContent from "../../components/main-content/MainContent";
import Sidebar from "../../components/sidebar/Sidebar";

import "./TodoView.scss";
import Cursor from "../../components/cursor/Cursor";
import Editbar from "../../components/editbar/Editbar";

function TodoView() {
  const [sidebarPos, setSidebarPos] = useState<number>(0);
  const [editbarOpen, setEditbarOpen] = useState<boolean>(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const [gaps, setGaps] = useState(30);
  const [headerSize, setHeaderSize] = useState(4 * 16);
  const [sidebarSize, setSidebarSize] = useState(15 * 16);
  const [borderRadius, setBorderRadius] = useState(20);

  const [freeform, setFreeform] = useState(false);

  const [sidebarLeft, setsidebarLeft] = useState(50);
  const [sidebarTop, setsidebarTop] = useState(50);
  const [sidebarHeight, setsidebarHeight] = useState(50);

  const [mainContentLeft, setMainContentLeft] = useState(10);
  const [mainContentTop, setMainContentTop] = useState(10);
  const [mainContentWidth, setMainContentWidth] = useState(90 * 16);
  const [mainContentHeight, setMainContentHeight] = useState(10 * 16);

  const [maskShape, setMaskShape] = useState<string>("");

  const maskRef = useRef<HTMLDivElement>(null);
  const beginningTaskList = {
    name: "Tutorial list",
    tasks: [
      {
        name: "Click on the trashcan.",
        description: "That'll delete me!",
        completed: false,
      },
      {
        name: "Click on the pencil.",
        description: "That'll edit me!",
        completed: false,
      },
      {
        name: "Click on the box on my left.",
        description: "That'll complete me!",
        completed: false,
      },
    ],
  };

  const [taskList, setTaskList] = useState<Array<object>>([
    { name: "Completed", tasks: [] },
    beginningTaskList,
  ]);

  const [notebookViewed, setNotebookViewed] = useState<number>(-1);
  const [taskView, setTaskView] = useState<any>([0, 0]);
  const [update, setUpdate] = useState<number>(0);

  function changeVariables() {
    document.documentElement.style.setProperty(`--gaps`, `${gaps}px`);
    document.documentElement.style.setProperty(
      `--header-size`,
      `${headerSize}px`
    );
    document.documentElement.style.setProperty(
      `--sidebar-size`,
      `${sidebarSize}px`
    );
    document.documentElement.style.setProperty(
      `--border-radius`,
      `${borderRadius}px`
    );
  }

  function makeMask() {
    if (freeform) {
      setMaskShape(`polygon(0% 0%,
                             0% 100%,
                             ${mainContentLeft}px 100%,

                             ${mainContentLeft}px ${mainContentTop}px,
                             ${
                               mainContentWidth + mainContentLeft + 1
                             }px ${mainContentTop}px,
                             
                             ${mainContentWidth + mainContentLeft + 1}px 
                             ${mainContentTop + mainContentHeight + 1}px,
                             
                             ${mainContentLeft}px ${
        mainContentTop + mainContentHeight + 1
      }px,

                             ${mainContentLeft}px 100%,
                             100% 100%,
                             100% 0%)`);
    } else {
      setMaskShape(`polygon(0% 0%,
                             0% 200vw,
                             ${gaps * 2 + sidebarSize}px 100%,



                             ${gaps * 2 + sidebarSize}px 
                             ${headerSize + gaps / 4 + borderRadius}px,
                          
                             ${gaps * 2 + (sidebarSize + borderRadius / 8)}px 
                             ${headerSize + gaps / 4 + borderRadius / 2}px,


                             ${
                               gaps * 2 +
                               (sidebarSize +
                                 1 +
                                 borderRadius / 4 +
                                 borderRadius / 20)
                             }px 
                             ${
                               headerSize +
                               gaps / 4 +
                               1 +
                               borderRadius / 4 +
                               borderRadius / 20
                             }px,


                             ${gaps * 2 + (sidebarSize + borderRadius / 2)}px 
                             ${headerSize + gaps / 4 + borderRadius / 8}px,
                             
                             ${gaps * 2 + sidebarSize + borderRadius}px 
                             ${headerSize + gaps / 4}px,

          

                             calc(100vw - ${gaps - 1 + borderRadius}px) 
                             ${headerSize + gaps / 4}px,

                             calc(100vw - ${gaps - 1 + borderRadius / 2}px) 
                             ${headerSize + gaps / 4 + borderRadius / 8}px,
                             calc(100vw - ${
                               gaps - 1 + borderRadius / 4 + borderRadius / 20
                             }px) 
                             ${
                               headerSize +
                               gaps / 4 +
                               borderRadius / 4 +
                               borderRadius / 20
                             }px,
                             calc(100vw - ${gaps - 1 + borderRadius / 8}px) 
                             ${headerSize + gaps / 4 + borderRadius / 2}px,

                             calc(100vw - ${gaps - 1}px) 
                             ${headerSize + gaps / 4 + borderRadius}px,


                             
                             calc(100vw - ${gaps - 1}px) 
                             calc(100vh - ${gaps - 1 + borderRadius}px),

                             calc(100vw - ${gaps - 1 + borderRadius / 8}px) 
                             calc(100vh - ${gaps - 1 + borderRadius / 2}px),
                             calc(100vw - ${
                               gaps - 1 + borderRadius / 4 + borderRadius / 20
                             }px) 
                             calc(100vh - ${
                               gaps - 1 + borderRadius / 4 + borderRadius / 20
                             }px),
                             calc(100vw - ${gaps - 1 + borderRadius / 2}px) 
                             calc(100vh - ${gaps - 1 + borderRadius / 8}px),

                             calc(100vw - ${gaps - 1 + borderRadius}px) 
                             calc(100vh - ${gaps - 1}px),


                             
                             ${gaps * 2 + sidebarSize + borderRadius}px 
                             calc(100vh - ${gaps - 1}px),

                             ${gaps * 2 + sidebarSize + borderRadius / 2}px 
                             calc(100vh - ${gaps - 1 + borderRadius / 8}px),
                             ${
                               gaps * 2 +
                               sidebarSize +
                               borderRadius / 4 +
                               borderRadius / 20
                             }px 
                             calc(100vh - ${
                               gaps - 1 + borderRadius / 4 + borderRadius / 20
                             }px),
                             ${gaps * 2 + sidebarSize + borderRadius / 8}px 
                             calc(100vh - ${gaps - 1 + borderRadius / 2}px),

                             ${gaps * 2 + sidebarSize}px 
                             calc(100vh - ${gaps - 1 + borderRadius}px),


                             ${gaps * 2 + sidebarSize}px 100%,
                             100% 100%,
                             100% 0%)`);
    }
  }

  function moveMask() {
    if (maskRef.current?.classList.contains("play-left-main-back")) {
      maskRef.current?.classList.remove("play-left-main-back");
      maskRef.current?.classList.add("play-right-main-back");
    } else {
      maskRef.current?.classList.remove("play-right-main-back");
      maskRef.current?.classList.add("play-left-main-back");
    }
  }

  useEffect(() => {
    makeMask();
    changeVariables();
  }, [freeform]);

  useEffect(() => {
    if (playAnimation) {
      moveMask();
    }
  }, [playAnimation]);

  useEffect(() => {
    console.log(`this is notebookviewed ${notebookViewed}`);
  }, [notebookViewed]);

  useEffect(() => {
    if (sidebarPos === 0) {
      console.log("Sidebar is Left");
    } else {
      console.log("Sidebar is Right");
    }
  }, [sidebarPos]);

  useEffect(() => {
    console.log(`editbar open is ${editbarOpen}`);
  }, [editbarOpen]);

  return (
    <div id="todo-view">
      <Header />
      <div
        id="fill-back"
        ref={maskRef}
        style={{
          clipPath: maskShape,
        }}
      ></div>
      <div id="background-pattern"></div>
      <Cursor />
      <Sidebar
        gap={gaps}
        headerSize={headerSize}
        width={sidebarSize}
        borderRadius={borderRadius}
        debug={freeform}
        left={sidebarLeft}
        top={sidebarTop}
        height={sidebarHeight}
        sidebarPos={sidebarPos}
        setSidebarPos={setSidebarPos}
        editbarOpen={editbarOpen}
        setEditbarOpen={setEditbarOpen}
        setPlayAnimation={setPlayAnimation}
        taskList={taskList}
        notebookViewed={notebookViewed}
        setNotebookViewed={setNotebookViewed}
        update={update}
        setUpdate={setUpdate}
        setTaskView={setTaskView}
        taskView={taskView}
      />
      <MainContent
        gap={gaps}
        headerSize={headerSize}
        sidebarSize={sidebarSize}
        borderRadius={borderRadius}
        debug={freeform}
        left={mainContentLeft}
        top={mainContentTop}
        height={mainContentHeight}
        width={mainContentWidth}
        sidebarPos={sidebarPos}
        playAnimation={playAnimation}
        taskList={taskList}
        setTaskList={setTaskList}
        setEditbarOpen={setEditbarOpen}
        editbarOpen={editbarOpen}
        notebookViewed={notebookViewed}
        setNotebookViewed={setNotebookViewed}
        setTaskView={setTaskView}
        taskView={taskView}
        update={update}
        setUpdate={setUpdate}
      />
      <Editbar
        gap={gaps}
        headerSize={headerSize}
        width={sidebarSize}
        borderRadius={borderRadius}
        debug={freeform}
        left={sidebarLeft}
        top={sidebarTop}
        height={sidebarHeight}
        sidebarPos={sidebarPos}
        setSidebarPos={setSidebarPos}
        setPlayAnimation={setPlayAnimation}
        playAnimation={playAnimation}
        taskList={taskList}
        setEditbarOpen={setEditbarOpen}
        editbarOpen={editbarOpen}
        taskView={taskView}
        setTaskList={setTaskList}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default TodoView;

// ${gaps * 2 + (sidebarSize + borderRadius / 2)}px
// ${headerSize + gaps / 4 + borderRadius / 8}px,

// ${gaps * 2 + sidebarSize + borderRadius}px
// ${headerSize + gaps / 4}px,

// calc(100vw - ${gaps - 1 + borderRadius}px)
// ${headerSize + gaps / 4}px,

// calc(100vw - ${gaps - 1 + borderRadius / 2}px)
// ${headerSize + gaps / 4 + borderRadius / 8}px,
// calc(100vw - ${
//   gaps - 1 + borderRadius / 4 + borderRadius / 20
// }px)
// ${
//   headerSize +
//   gaps / 4 +
//   borderRadius / 4 +
//   borderRadius / 20
// }px,
// calc(100vw - ${gaps - 1 + borderRadius / 8}px)
// ${headerSize + gaps / 4 + borderRadius / 2}px,

// calc(100vw - ${gaps - 1}px)
// ${headerSize + gaps / 4 + borderRadius}px,

// calc(100vw - ${gaps - 1}px)
// calc(100vh - ${gaps - 1 + borderRadius}px),

// calc(100vw - ${gaps - 1 + borderRadius / 8}px)
// calc(100vh - ${gaps - 1 + borderRadius / 2}px),
// calc(100vw - ${
//   gaps - 1 + borderRadius / 4 + borderRadius / 20
// }px)
// calc(100vh - ${
//   gaps - 1 + borderRadius / 4 + borderRadius / 20
// }px),
// calc(100vw - ${gaps - 1 + borderRadius / 2}px)
// calc(100vh - ${gaps - 1 + borderRadius / 8}px),

// calc(100vw - ${gaps - 1 + borderRadius}px)
// calc(100vh - ${gaps - 1}px),

// ${gaps * 2 + sidebarSize + borderRadius}px
// calc(100vh - ${gaps - 1}px),

// ${gaps * 2 + sidebarSize + borderRadius / 2}px
// calc(100vh - ${gaps - 1 + borderRadius / 8}px),
// ${
//   gaps * 2 +
//   sidebarSize +
//   borderRadius / 4 +
//   borderRadius / 20
// }px
// calc(100vh - ${
//   gaps - 1 + borderRadius / 4 + borderRadius / 20
// }px),
// ${gaps * 2 + sidebarSize + borderRadius / 8}px
// calc(100vh - ${gaps - 1 + borderRadius / 2}px),

// ${gaps * 2 + sidebarSize}px
// calc(100vh - ${gaps - 1 + borderRadius}px),

// ${gaps * 2 + sidebarSize}px 100%,
// 100% 100%,
// 100% 0%)`
