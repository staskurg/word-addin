import * as React from "react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
  textArea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
  },
  button: {
    display: "block",
    marginTop: "10px",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();
  const [prompt, setPrompt] = React.useState<string>("");

  const listItems: HeroListItem[] = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration!!!!",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];

  const callOpenAI = async (prompt: string) => {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = () => {
    callOpenAI(prompt);
  };

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title={props.title} message="Welcome" />
      <HeroList message="Discover what this add-in can do for you today!" items={listItems} />
      <TextInsertion insertText={insertText} />
      <textarea
        className={styles.textArea}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
      />
      <button className={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default App;
