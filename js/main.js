const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeBtn = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) =>{
  for(const country_code in countries){

    let selected;
    if(id == 0 && country_code == "en-GB"){
      selected = "selected"
    }else if(id == 1 && country_code == "uz-UZ"){
      selected ="selected"
    }

    
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
  }
});


exchangeBtn.addEventListener("click", () =>{
  // exchanging textarea and select tag value
  let tempText = fromText.value;
  let tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () =>{
  let text =  fromText.value;
  let translateFrom = selectTag[0].value; //getting fromSelect tag value
  let translateTo = selectTag[1].value; //getting toSelect tag value
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  // fetching api response and returning it with parsing into js obj
  // and it another then method receiving that obj
  fetch(apiUrl).then(res => res.json()).then(data =>{
    toText.value = data.responseData.translatedText;
  })
});


icons.forEach(icon => {
  icon.addEventListener("click", ({target}) =>{
    if(target.classList.contains("fa-copy")){
      if(target.id == "from"){
        navigator.clipboard.writeText(fromText.value)
      }else{
        navigator.clipboard.writeText(toText.value)
      }
    }else{
      let utterance;
      // if clicked icon has from id, speak the fromTextarea value else speak the toTextarea value
      if(target.id == "from"){
        utterance = new SpeechSynthesisUtterance(fromText.value); //setting utterance language to fromSelect tag value
        utterance.lang = selectTag[0].value;
      }else{
        utterance = new SpeechSynthesisUtterance(toText.value); //setting utterance language to toSelect  tag value
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);//Speak the passed utterance
    }
  })
})
