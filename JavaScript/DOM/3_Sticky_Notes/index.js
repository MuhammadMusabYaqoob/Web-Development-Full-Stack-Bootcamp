const addNoteBtn = document.querySelector(".add-note-btn");
const notesContainer = document.querySelector(".notes-container");

// Modal elements
const deleteModal = document.querySelector(".delete-modal");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

let noteToDelete = null;
let highestZIndex = 0;
const storageKey = "sticky-notes";

function getSavedNotes() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

function saveNotes() {
  const savedNotes = [...notesContainer.querySelectorAll(".note")].map((note) => ({
    left: note.style.left,
    top: note.style.top,
    text: note.querySelector("textarea").value,
    color: note.style.backgroundColor,
  }));

  localStorage.setItem(storageKey, JSON.stringify(savedNotes));
}

function generateRandomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

function hasOverlap(note, left, top) {
  const right = left + note.offsetWidth;
  const bottom = top + note.offsetHeight;

  return [...notesContainer.querySelectorAll(".note")].some((otherNote) => {
    if (otherNote === note) return false;

    const otherLeft = otherNote.offsetLeft;
    const otherTop = otherNote.offsetTop;
    const otherRight = otherLeft + otherNote.offsetWidth;
    const otherBottom = otherTop + otherNote.offsetHeight;

    return (
      left < otherRight &&
      right > otherLeft &&
      top < otherBottom &&
      bottom > otherTop
    );
  });
}

function findFreePosition(note, preferredLeft, preferredTop) {
  if (!hasOverlap(note, preferredLeft, preferredTop)) {
    return { left: preferredLeft, top: preferredTop };
  }

  const gap = 20;
  const step = 24;
  const lastLeft = Math.max(gap, window.innerWidth - note.offsetWidth - gap);
  const verticalStep = note.offsetHeight + gap;

  // Search row by row, starting near the center of the visible screen.
  for (let row = 0; row < 100; row++) {
    const top = preferredTop + row * verticalStep;

    for (let left = gap; left <= lastLeft; left += step) {
      if (!hasOverlap(note, left, top)) return { left, top };
    }
  }

  return { left: gap, top: preferredTop + 100 * verticalStep };
}

function updateCanvasHeight() {
  const notes = [...notesContainer.querySelectorAll(".note")];
  const notesBottom = notes.reduce((bottom, note) => {
    return Math.max(bottom, note.offsetTop + note.offsetHeight + 32);
  }, window.innerHeight);

  document.body.style.minHeight = `${notesBottom}px`;
  notesContainer.style.height = `${notesBottom}px`;
}

function createNote(savedNote = null) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="note-header">
      <span class="drag-handle">☷</span>
      <button class="delete-note-btn">×</button>
    </div>
    <textarea placeholder="Write your note..."></textarea>
  `;

  notesContainer.appendChild(note);

  const color = savedNote?.color || generateRandomHexColor();
  note.style.backgroundColor = color;

  // The clicked note gets the highest stacking order and appears in front.
  note.style.zIndex = ++highestZIndex;
  note.addEventListener("pointerdown", () => {
    note.style.zIndex = ++highestZIndex;
  });

  const textarea = note.querySelector("textarea");
  textarea.value = savedNote?.text || "";
  textarea.addEventListener("input", saveNotes);

  const preferredLeft = savedNote
    ? parseFloat(savedNote.left)
    : (window.innerWidth - note.offsetWidth) / 2;
  const preferredTop = savedNote
    ? parseFloat(savedNote.top)
    : window.scrollY + (window.innerHeight - note.offsetHeight) / 2;
  const position = findFreePosition(note, preferredLeft, preferredTop);
  note.style.left = `${position.left}px`;
  note.style.top = `${position.top}px`;

  // Clicking the × opens the existing confirmation modal.
  const deleteBtn = note.querySelector(".delete-note-btn");
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    noteToDelete = note;
    deleteModal.style.display = "flex";
  });

  // Drag the note by its header.
  const dragHandle = note.querySelector(".note-header");
  dragHandle.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("delete-note-btn")) return;

    event.preventDefault();
    const noteRect = note.getBoundingClientRect();
    const shiftX = event.clientX - noteRect.left;
    const shiftY = event.clientY - noteRect.top;
    const originalLeft = note.style.left;
    const originalTop = note.style.top;

    function moveNote(event) {
      note.style.left = `${event.clientX - shiftX}px`;
      note.style.top = `${event.clientY + window.scrollY - shiftY}px`;
    }

    function stopDragging() {
      document.removeEventListener("mousemove", moveNote);
      document.removeEventListener("mouseup", stopDragging);

      const currentLeft = parseFloat(note.style.left);
      const currentTop = parseFloat(note.style.top);
      if (hasOverlap(note, currentLeft, currentTop)) {
        note.style.left = originalLeft;
        note.style.top = originalTop;
      }

      updateCanvasHeight();
      saveNotes();
    }

    document.addEventListener("mousemove", moveNote);
    document.addEventListener("mouseup", stopDragging);
  });

  if (!savedNote) textarea.focus();
  updateCanvasHeight();
  saveNotes();
}

addNoteBtn.addEventListener("click", () => createNote());

// Restore saved notes when the page opens.
getSavedNotes().forEach((savedNote) => createNote(savedNote));

noBtn.addEventListener("click", () => {
  deleteModal.style.display = "none";
  noteToDelete = null;
});

yesBtn.addEventListener("click", () => {
  if (noteToDelete) {
    noteToDelete.remove();
    updateCanvasHeight();
    saveNotes();
  }

  deleteModal.style.display = "none";
  noteToDelete = null;
});
