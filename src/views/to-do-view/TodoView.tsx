import { useEffect, useState } from "react";
import App from "../../App";
import Header from "../../components/header/Header";
import MainContent from "../../components/main-content/MainContent";
import Sidebar from "../../components/sidebar/Sidebar";

import "./TodoView.scss";
import Cursor from "../../components/cursor/Cursor";

function TodoView() {
  const [sidebarPos, setSidebarPos] = useState<number>(0);

  const [gaps, setGaps] = useState(20);
  const [headerSize, setHeaderSize] = useState(4 * 16);
  const [sidebarSize, setSidebarSize] = useState(20 * 16);
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
                             0% 100%,
                             ${gaps * 2 + sidebarSize}px 100%,



                             ${gaps * 2 + sidebarSize}px 
                             ${headerSize + borderRadius}px,
                          
                             ${gaps * 2 + (sidebarSize + borderRadius / 8)}px 
                             ${headerSize + borderRadius / 2}px,
                             ${
                               gaps * 2 +
                               (sidebarSize +
                                 1 +
                                 borderRadius / 4 +
                                 borderRadius / 20)
                             }px 
                             ${
                               headerSize +
                               1 +
                               borderRadius / 4 +
                               borderRadius / 20
                             }px,
                             ${gaps * 2 + (sidebarSize + borderRadius / 2)}px 
                             ${headerSize + borderRadius / 8}px,
                             
                             ${gaps * 2 + sidebarSize + borderRadius}px 
                             ${headerSize}px,

          

                             calc(100vw - ${gaps - 1 + borderRadius}px) 
                             ${headerSize}px,

                             calc(100vw - ${gaps - 1 + borderRadius / 2}px) 
                             ${headerSize + borderRadius / 8}px,
                             calc(100vw - ${
                               gaps - 1 + borderRadius / 4 + borderRadius / 20
                             }px) 
                             ${
                               headerSize + borderRadius / 4 + borderRadius / 20
                             }px,
                             calc(100vw - ${gaps - 1 + borderRadius / 8}px) 
                             ${headerSize + borderRadius / 2}px,

                             calc(100vw - ${gaps - 1}px) 
                             ${headerSize + borderRadius}px,


                             
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

  useEffect(() => {
    makeMask();
  }, [freeform]);

  return (
    <div id="todo-view">
      <Header />
      <div
        id="fill-back"
        style={{
          clipPath: maskShape,
          // clipPath: `polygon(0% 0%,
          //                    0% 100%,
          //                    ${gaps * 2 + sidebarSize}px 100%,

          //                    ${gaps * 2 + sidebarSize}px
          //                    ${headerSize + borderRadius}px,

          //                    ${gaps * 2 + (sidebarSize + borderRadius / 8)}px
          //                    ${headerSize + borderRadius / 2}px,
          //                    ${
          //                      gaps * 2 +
          //                      (sidebarSize +
          //                        1 +
          //                        borderRadius / 4 +
          //                        borderRadius / 20)
          //                    }px
          //                    ${
          //                      headerSize +
          //                      1 +
          //                      borderRadius / 4 +
          //                      borderRadius / 20
          //                    }px,
          //                    ${gaps * 2 + (sidebarSize + borderRadius / 2)}px
          //                    ${headerSize + borderRadius / 8}px,

          //                    ${gaps * 2 + sidebarSize + borderRadius}px
          //                    ${headerSize}px,

          //                    calc(100vw - ${gaps - 1 + borderRadius}px)
          //                    ${headerSize}px,

          //                    calc(100vw - ${gaps - 1 + borderRadius / 2}px)
          //                    ${headerSize + borderRadius / 8}px,
          //                    calc(100vw - ${
          //                      gaps - 1 + borderRadius / 4 + borderRadius / 20
          //                    }px)
          //                    ${
          //                      headerSize + borderRadius / 4 + borderRadius / 20
          //                    }px,
          //                    calc(100vw - ${gaps - 1 + borderRadius / 8}px)
          //                    ${headerSize + borderRadius / 2}px,

          //                    calc(100vw - ${gaps - 1}px)
          //                    ${headerSize + borderRadius}px,

          //                    calc(100vw - ${gaps - 1}px)
          //                    calc(100vh - ${gaps - 1 + borderRadius}px),

          //                    calc(100vw - ${gaps - 1 + borderRadius / 8}px)
          //                    calc(100vh - ${gaps - 1 + borderRadius / 2}px),
          //                    calc(100vw - ${
          //                      gaps - 1 + borderRadius / 4 + borderRadius / 20
          //                    }px)
          //                    calc(100vh - ${
          //                      gaps - 1 + borderRadius / 4 + borderRadius / 20
          //                    }px),
          //                    calc(100vw - ${gaps - 1 + borderRadius / 2}px)
          //                    calc(100vh - ${gaps - 1 + borderRadius / 8}px),

          //                    calc(100vw - ${gaps - 1 + borderRadius}px)
          //                    calc(100vh - ${gaps - 1}px),

          //                    ${gaps * 2 + sidebarSize + borderRadius}px
          //                    calc(100vh - ${gaps - 1}px),

          //                    ${gaps * 2 + sidebarSize + borderRadius / 2}px
          //                    calc(100vh - ${gaps - 1 + borderRadius / 8}px),
          //                    ${
          //                      gaps * 2 +
          //                      sidebarSize +
          //                      borderRadius / 4 +
          //                      borderRadius / 20
          //                    }px
          //                    calc(100vh - ${
          //                      gaps - 1 + borderRadius / 4 + borderRadius / 20
          //                    }px),
          //                    ${gaps * 2 + sidebarSize + borderRadius / 8}px
          //                    calc(100vh - ${gaps - 1 + borderRadius / 2}px),

          //                    ${gaps * 2 + sidebarSize}px
          //                    calc(100vh - ${gaps - 1 + borderRadius}px),

          //                    ${gaps * 2 + sidebarSize}px 100%,
          //                    100% 100%,
          //                    100% 0%)`,
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
      />
    </div>
  );
}

export default TodoView;
