API_KEY = "AIzaSyARN2jUp0wYY2L_6zHmQjCqNvnDYNJ7KNY"
API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const userinput = document.querySelector('.userinput');
const container = document.querySelector('.container');
const mic = document.querySelector('#mic');


let chatHistory = [];
let userMessage;

window.addEventListener('keydown',(e)=>{
  // console.log(e)
 if(e.key === 'Enter'){
  console.log(userinput.value)
  if(userinput.value){
    userMessage = userinput.value;
    let div = document.createElement('div');
    let user = document.createElement('div');
  
    div.innerHTML = userMessage;
    div.classList.add('query')
    user.classList.add('user')
    user.append(div)
    container.append(user)
    userinput.value = null;
    fun();
  }
 }
})
async function fun() {
    chatHistory.push({
        role: "user",
        parts: [{text: userMessage}]
    });

    let response =  await fetch(API_URL,{
        method: "Post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({contents: chatHistory})
        // body:JSON.stringify(
        //     {
        //       "contents": [{
        //       "parts":[{"text": "Explain how AI works"}]
        //       }]
        //     }
        //     )
    })
    let data = await response.json()
    // console.log(data)
    let div = document.createElement('div');
    let ai = document.createElement('div');

  let  AIresponse = data.candidates[0].content.parts[0].text
  console.log(AIresponse)



  div.innerText = AIresponse;
  div.classList.add('info')
  ai.classList.add('ai')
  ai.append(div)
  container.append(ai)
  container.scrollTop = container.scrollHeight;
}

let SpeechRecognition = window.webkitSpeechRecognition
let Recognition = new SpeechRecognition;

function speak(){
  if(mic.classList.contains("fa-microphone-slash")){
    Recognition.start()
    mic.classList.add("fa-microphone")
    mic.classList.remove("fa-microphone-slash")
  }
  else{
    Recognition.stop()
    mic.classList.remove("fa-microphone")
    mic.classList.add("fa-microphone-slash")
  }
}

Recognition.onresult = function(e){
    let content = e.results[0][0].transcript
   userinput.value = content
   mic.classList.remove("fa-microphone")
   mic.classList.add("fa-microphone-slash")
}