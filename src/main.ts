import YouTubePlayer from "youtube-player";

const videoId = new URL(location.href).searchParams.get("v") ?? "dQw4w9WgXcQ";
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

if (window.localStorage) {
  const savedLoops = localStorage.getItem(videoId);
  if (savedLoops) {
    loops = JSON.parse(savedLoops);
    selectedLoopId = loops[0].id;
  }
} else {
  alert("Local save is not available in this browser.");
}

updateLoopListElem();
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
    save();
  } else {
    alert("The end time is earlier than the start time.");
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
    const textEl = document.createElement("div");
    const smallEl = document.createElement("small");
    const startEl = document.createElement("u");
    const startTimeStr = toTimeStr(start);
    startEl.innerText = startTimeStr;
    startEl.addEventListener("click", (event) => {
      event.stopPropagation();
      const newStartTimeStr = prompt(
        "Please enter the start time.",
        startTimeStr
      );
      try {
        const seconds = toSeconds(newStartTimeStr);
        if (seconds < 0 || seconds > end) {
          alert("The start time is later than the end time.");
        } else {
          loop.range[0] = seconds;
          updateLoopListElem();
          save();
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          alert("Your input is not valid.");
        }
      }
    });
    const endTimeStr = toTimeStr(end);
    const endEl = document.createElement("u");
    endEl.innerText = endTimeStr;
    endEl.addEventListener("click", (event) => {
      event.stopPropagation();
      const newEndTimeStr = prompt("Please enter the end time.", endTimeStr);
      try {
        const seconds = toSeconds(newEndTimeStr);
        if (seconds < 0 || seconds < start) {
          alert("The end time is earlier than the start time.");
        } else {
          loop.range[1] = seconds;
          updateLoopListElem();
          save();
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          alert("Your input is not valid.");
        }
      }
    });
    smallEl.append(startEl, " ~ ", endEl);
    textEl.append(name, " ", smallEl);
    const renameButton = document.createElement("button");
    renameButton.innerText = "Rename";
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    li.append(textEl, renameButton, deleteButton);
    li.addEventListener("click", () => {
      selectedLoopId = selectedLoopId === id ? null : id;
      updateMark();
    });
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      loops = loops.filter((loop) => loop.id !== id);
      if (id === selectedLoopId) {
        selectedLoopId = null;
      }
      updateLoopListElem();
      save();
    });
    renameButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const newName = prompt("Please name this loop.");
      if (typeof newName === "string" && newName.length > 0) {
        loop.name = newName;
        updateLoopListElem();
        save();
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
      timeArr.push(Math.floor(time / 3600).toFixed());
    }
    if (time > 60) {
      const secondsInHour = time % 3600;
      timeArr.push(Math.floor(secondsInHour / 60).toFixed());
    }
    timeArr.push((time % 60).toFixed(2));
    return timeArr.join(":");
  }
  function toSeconds(timeStr) {
    const times = timeStr.split(":").map((timeEl) => Number(timeEl));
    if (
      times.length < 1 ||
      times.length > 3 ||
      times.some((timeEl) => Number.isNaN(timeEl))
    ) {
      throw new SyntaxError();
    }
    let seconds = times.pop();
    if (times.length > 0) {
      seconds += times.pop() * 60;
    }
    if (times.length > 0) {
      seconds += times.pop() * 3600;
    }
    return seconds;
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

function save() {
  if (loops.length > 0) {
    window.localStorage.setItem(videoId, JSON.stringify(loops));
  } else {
    window.localStorage.removeItem(videoId);
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
