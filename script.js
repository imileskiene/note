const noteCreateButton = document.getElementById("add-note-btn");
let notesContainer = document.querySelector(".notes-container");
const textBoxColors = ["lightblue", "yellow", "lightgreen", "pink", "gold", "violet", "lime", "cyan", "orange"];

//save data to localStorage
function updateStorage(){
    // Naudojame querySelectorAll, kad gautume NodeList su visais .textarea-container elementais
    // NodeList neturi map() metodo, todėl negalime tiesiogiai naudoti
    // Panaudojame Array.from(), kad konvertuotume NodeList į masyvą
    // Ir tada naudoti map() metodą
    const allNotes = Array.from(document.querySelectorAll(".textarea-container")).map((textarea) => {
        return {
          content: textarea.value,
          color: textarea.style.background,
        };
      });
      //JSON.stringify() funkcija paverčia objektą į tekstinį JSON (JavaScript Object Notation) formatą, i stringą.
      localStorage.setItem("notes", JSON.stringify(allNotes));
}

// get data from localStorage
function loadNotes() {
    //JSON.parse() funkcija gražina objektą
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach((note) => {
      createNote(note.content, note.color);
    });
  }


//content pradine reiksme ir color pradine reiksme
function createNote( content ="", color = null){

    

    const noteDiv = document.createElement("div");
    noteDiv.className = "text-container"

    let textarea = document.createElement("textarea");
    textarea.className = "textarea-container";
    textarea.value =content;

    const randomColorIndex = Math.floor(Math.random() * textBoxColors.length);
    textarea.style.background = color || textBoxColors[randomColorIndex];


    let textAreaDeleteicon = document.createElement("button");
    textAreaDeleteicon.textContent = "x";
    textAreaDeleteicon.className = "delete-btn";

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(textAreaDeleteicon);
    notesContainer.appendChild(noteDiv);

    textarea.addEventListener("input", updateStorage);

    textAreaDeleteicon.addEventListener("click", ()=>{
        noteDiv.remove();
        updateStorage();
    })
}

noteCreateButton.addEventListener("click", ()=>{
    createNote();
    updateStorage();
});

// Puslapiui užsikrovus, atkuria lenteles
loadNotes();