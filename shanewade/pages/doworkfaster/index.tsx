import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import {
  Button,
  Text,
  InputGroup,
  Colors,
  ButtonGroup,
  TextArea,
  Menu,
  MenuItem,
} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";

// Setup Blueprint
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
// Turn off focus styling for blueprint components
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import { createUseStyles } from "react-jss";

const TOP_BAR_HEIGHT = "50px";

const useStyles = createUseStyles({
  topBar: {
    TOP_BAR_HEIGHT,
  },
  typingTestContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
  wordsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "900px",
    height: "180px",
    margin: "0 auto",
    overflow: "hidden",
    marginTop: "10%",
  },
  rowCentered: {
    width: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    marginRight: "10px",
  },
});

type typingTestProps = {
  words: Array<string>;
};

export type AppState = {};

const TypingTest: InferGetStaticPropsType<typeof getStaticProps> = (
  props: typingTestProps
) => {
  const router = useRouter();
  const classes = useStyles();

  // app state
  const [state, setState] = React.useState<AppState>({});

  const iframeUrl = React.useRef<String>("");

  const [url, setUrl] = React.useState<String>("https://immigrationlaw.chat/");

  return (
    <div className={classes.typingTestContainer}>
      {/* content frame */}
      <div
        id="content_frame"
        style={{ height: "100%", width: "50%", padding: "1rem" }}
      >
        <div
          style={{
            height: "5%",
          }}
        >
          <InputGroup
            width={"100%"}
            onChange={(e) => {
              iframeUrl.current = e.target.value;
            }}
            rightElement={
              <Button
                icon="application"
                text="load url"
                onClick={() => {
                  setUrl(iframeUrl.current);
                }}
              />
            }
          />
        </div>
        <div
          style={{
            height: "94%",
          }}
        >
          {url != "" ? (
            <iframe
              src={url.toString()}
              referrerPolicy="origin"
              loading="lazy"
              width={"100%"}
              height={"100%"}
            ></iframe>
          ) : null}
        </div>
      </div>

      {/* workspace frame */}
      <div
        id="workspace_frame"
        style={{ height: "100%", width: "50%", padding: "1rem" }}
      >
        {/* model dropdown */}
        <div
          style={{
            width: "100%",
          }}
        >
          <Popover2
            content={
              <Menu>
                <MenuItem text="gpt-3.5-turbo" />
                <MenuItem text="gpt-4" />
              </Menu>
            }
            minimal
            position="bottom-left"
          >
            <Button
              text="gpt-3.5-turbo"
              intent="primary"
              icon="caret-down"
              rightIcon="predictive-analysis"
            />
          </Popover2>
        </div>

        <br />

        {/* system prompt input */}
        <h3 style={{ margin: 0 }}>System</h3>
        <br />
        <TextArea fill placeholder={"system prompt..."} />

        {/* chat input */}
        <h3>Chat</h3>
        <div>
          <Popover2
            content={
              <Menu>
                <MenuItem text="User" />
                <MenuItem text="AI" />
              </Menu>
            }
            minimal
            position="bottom-left"
          >
            <Button text="User" icon="caret-down" />
          </Popover2>
          <TextArea fill></TextArea>
        </div>
      </div>
    </div>
  );
};
export default TypingTest;

export const getStaticProps: GetStaticProps = async (context) => {
  type Data = {
    words: Array<String>;
  };

  return {
    props: { words: [] }, // will be passed to the page component as props
  };
};
