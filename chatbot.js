const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
let userMessage;

const API_KEY ="Paste your API key here";

const creatChatLi = (message, className)=>{
    // creat a chat li element with passed message and class name
   const chatLi = document.createElement("li");
   chatLi.classList.add("chat", className);
   let chatContent = className ==="outgoing" ? `<p>${message}</p>`:`<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
   chatLi.innerHTML = chatContent;
   return chatLi; 
}



const generateResponse = () =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method:"POST",
        Headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-16k",
           messages: [{role: "user", content: "my message"}],


            // messages: [
            //     {
            //       'role': 'system',
            //       'content': 'You are a helpful assistant.',
            //     },
            //     {
            //       'role': 'user',
            //       'content': userMessage,
            //     },
            //   ]


           
            
        })
    }

    // sending POST requests to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        console.log(data);
    }).catch((error) =>{
        console.log(error);
    })
}



const handleChat = () =>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    //append the user's message to the chat box
    chatbox.appendChild(creatChatLi(userMessage,"outgoing"));
    
    setTimeout(()=>{
        chatbox.appendChild(creatChatLi("thinking...","incoming"));
        generateResponse();
    },600);
}

sendChatBtn.addEventListener("click", handleChat);
