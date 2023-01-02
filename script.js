const API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const btn = document.getElementById("submit");
const inp = document.getElementById("input-word");


window.onload = function(){
  document.getElementById("input-word").value = "";
}

document.addEventListener("keypress",(e)=>{
  if(e.key == "Enter"){
    
    btn.click();
  }
});

btn.addEventListener("click", () => {
  fetch(API + inp.value)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      
      document.getElementById("sound").src=data[0].phonetics[0].audio;
      document.getElementById("result").innerHTML = `
        
        
        <div id="meaning">
            <ol type="1">
              ${data[0].meanings.map(item => {
                  return (`
                  <div id="word-pos">
                    
                    <h1 id="word">${data[0].word}</h1>
                    <h3 id="pos">${item.partOfSpeech}</h3>
                    <button onclick=playSound()>
                      <i class="fas fa-volume-up"></i>
                    </button>
                    </div>
                    <ol>
                    ${item.definitions.map(def=>{
                    return `<li>${def.definition}</li>`;
                    }).join(" ")}
                    </ol>`)
                })
                .join(" ")
              }
            </ol>
        </div>
        `;
    })
    .catch(() => {
      document.getElementById(
        "result"
      ).innerHTML = `<div id="error">Word Not Found</div>`;
    });
});


function playSound(){
    console.log(document.getElementById("sound").src);
    document.getElementById("sound").play();
  
}
