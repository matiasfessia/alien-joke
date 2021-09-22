import { useEffect, useState } from "react";
import ConfettiGenerator from "confetti-js";

import "./App.css";

const App = () => {
  const [startCountDown, setStartCountDown] = useState(false);
  const [timeleft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeleft === 0) {
      const confettiSettings = {
        target: "my-canvas",
        max: "600",
        size: "1",
        animate: true,
        props: ["circle", "square", "triangle", "line"],
        colors: [
          [165, 104, 246],
          [230, 61, 135],
          [0, 199, 228],
          [253, 214, 126],
        ],
        clock: "25",
        rotate: true,
        height: window.innerHeight - 10,
        start_from_edge: true,
        respawn: false,
      };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      return () => confetti.clear();
    }
  }, [timeleft]); // add the var dependencies or not

  useEffect(() => {
    if (startCountDown) {
      const interval = setInterval(() => {
        if (timeleft <= 0) {
          return;
        }
        setTimeLeft(timeleft - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startCountDown, timeleft]);

  return (
    <>
      <canvas id="my-canvas"></canvas>
      <div className="joke-container">
        <div className="joke">
          <h1>What is an alien's favorite key on a keyboard?</h1>
          {!startCountDown ? (
            <div
              onClick={() => setStartCountDown(true)}
              class="play-button"
            ></div>
          ) : (
            timeleft > 0 && <h1>{timeleft}</h1>
          )}
          {timeleft === 0 && startCountDown && <h1>The space bar</h1>}
        </div>
        <a
          className="github-link"
          href="https://github.com/matiasfessia/alien-joke"
        >
          https://github.com/matiasfessia/alien-joke
        </a>
      </div>
    </>
  );
};

export default App;
