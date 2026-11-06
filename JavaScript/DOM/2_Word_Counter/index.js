const textArea = document.querySelector("#textArea");
const charCount = document.querySelector("#charCount");
const wordCount = document.querySelector("#wordCount");
const spaceCount = document.querySelector("#spaceCount");
const btn = document.querySelector("#copy-btn");
const alertBox = document.querySelector(".alert-box")
// const okBtn = document.querySelector("#okBtn")
const message = document.querySelector(".message")
const limit = 1000
function counter(){
    const text = textArea.value
    const words = text.trim().split(/\s+/);
    // charCount.textContent = text.length
    if(text.length === 0){
        charCount.textContent = 0
        wordCount.textContent = 0
        spaceCount.textContent = 0

    }else{
        charCount.textContent = text.length
        wordCount.textContent = `${words.length}/${limit}`
        let space = 0
        for(let i = 0; i < textArea.value.length; i++){
            if(text[i] === " "){
                space++
            }
        }
        spaceCount.textContent = space
    }
    if(words.length >= limit){
        wordCount.style.color = "red"
    }else{
        wordCount.style.color = "black"
    }
    // console.log(words.length)
}

textArea.addEventListener("beforeinput", function(event){
console.log("🚀 ~ event:", event)

    const words = textArea.value.trim().split(/\s+/);

    if(words.length >= limit){
        
        if(event.inputType === "insertText" ||
           event.inputType === "insertFromPaste"){

            event.preventDefault();

        }

    }

});

textArea.addEventListener("input", counter)
window.addEventListener('load', counter)



btn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(textArea.value)
    alertBox.style.display = "flex"
    message.textContent = "Copied to clipboard"
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 500); 
})
// okBtn.addEventListener("click", ()=>{
//     alertBox.style.display = "none"
// })
