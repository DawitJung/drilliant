import YouTubePlayer from "youtube-player";

const videoId = new URL(location.href).searchParams.get("v");

const player = YouTubePlayer("player");

player.loadVideoById(videoId);

const startButton = document.getElementById("start-button")!;
const endButton = document.getElementById("end-button")!;
const resetButton = document.getElementById("reset-button")!;
const clearSelectButton = document.getElementById("clear-select-button")!;
const loopListElem = document.getElementById("loop-list")!;

type loop = { id: number; range: [number, number]; name: string };

let loops: loop[] = [];
let selectedLoopId: null | number = null;
let newLoopStart: null | number = null;

updateButtons();

startButton.addEventListener("click", async () => {
  newLoopStart = await player.getCurrentTime();
  updateButtons();
});

endButton.addEventListener("click", async () => {
  const newLoopEnd = await player.getCurrentTime();
  if (typeof newLoopStart === "number" && newLoopStart < newLoopEnd) {
    const id = Math.random();
    loops.push({
      id,
      range: [newLoopStart, newLoopEnd],
      name: `#${loops.length}`,
    });
    selectedLoopId = id;
    newLoopStart = null;
    updateButtons();
    updateLoopListElem();
  } else {
    alert("The end time of the loop is earlier than the start time.");
  }
});

resetButton.addEventListener("click", () => {
  newLoopStart = null;
  updateButtons();
});

clearSelectButton.addEventListener("click", () => {
  selectedLoopId = null;
  updateMark();
});

function updateButtons() {
  if (newLoopStart === null) {
    startButton.style.display = "unset";
    endButton.style.display = "none";
    resetButton.style.display = "none";
  } else if (newLoopStart !== null) {
    startButton.style.display = "none";
    endButton.style.display = "unset";
    resetButton.style.display = "unset";
  }
}

function updateLoopListElem() {
  const lis: HTMLElement[] = [];
  for (const loop of loops) {
    const {
      id,
      name,
      range: [start, end],
    } = loop;
    const li = document.createElement("li");
    const text = document.createElement("div");
    text.innerHTML = `${name} <small>${toTimeStr(start)} ~ ${toTimeStr(
      end
    )}</small>`;
    const renameButton = document.createElement("button");
    renameButton.innerText = "rename";
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    li.append(text, renameButton, deleteButton);
    li.addEventListener("click", () => {
      selectedLoopId = id;
      updateMark();
    });
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      loops = loops.filter((loop) => loop.id !== id);
      if (id === selectedLoopId) {
        selectedLoopId = null;
      }
      updateLoopListElem();
    });
    renameButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const newName = prompt("New name?");
      if (typeof newName === "string" && newName.length > 0) {
        loop.name = newName;
        updateLoopListElem();
      } else {
        alert("Your input is not valid.");
      }
    });
    lis.push(li);
  }
  while (loopListElem.firstChild) {
    loopListElem.removeChild(loopListElem.firstChild);
  }
  loopListElem.append(...lis);
  updateMark();
  function toTimeStr(time) {
    let timeArr: string[] = [];
    if (time > 3600) {
      timeArr.push((time / 3600).toFixed());
    }
    if (time > 60) {
      const secondsInHour = time % 3600;
      timeArr.push((secondsInHour / 60).toFixed());
    }
    timeArr.push((time % 60).toFixed(2));
    return timeArr.join(":");
  }
}

function updateMark() {
  const prevSelectedLoopElem = document.getElementById("selected-loop");
  if (prevSelectedLoopElem) {
    prevSelectedLoopElem.id = "";
  }
  const selectedLoopIndex = loops.findIndex(
    (loop) => loop.id === selectedLoopId
  );
  if (selectedLoopIndex > -1) {
    loopListElem.children[selectedLoopIndex].id = "selected-loop";
  }
}

setInterval(async () => {
  if (!player || !player.getPlayerState) return;
  const state = await player.getPlayerState();
  if (state === 1 && selectedLoopId !== null) {
    const curTime = await player.getCurrentTime();
    const loop = loops.find((loop) => loop.id === selectedLoopId);
    if (loop) {
      const [start, end] = loop.range;
      if (curTime < start || end < curTime) {
        player.seekTo(start);
      }
    }
  }
}, 80);
