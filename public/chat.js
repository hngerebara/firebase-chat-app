var myFirebase = new Firebase("https://chatapp-60ca7.firebaseio.com/");
var usernameInput = document.querySelector('#username');
var chatMsgInput = document.querySelector('#chatMsg');
var sendButton = document.querySelector('#sendButton');

sendButton.addEventListener("click", function(){
    var username = usernameInput.value;
    var chatMsg = chatMsgInput.value;
    myFirebase.push({username:username, chatMsg:chatMsg});
    chatMsgInput.value = "";
})

function toBottom(){
    var chatsWindow  = document.getElementById("chats");
    chatsWindow.scrollTop = chatsWindow.scrollHeight;
}

var beginListening = function() {
    myFirebase.on('child_added', function(snapshot){ 
        var avatar = "https://cdn.pixabay.com/photo/2013/07/13/12/08/girl-159245__340.png";      
        var chat = snapshot.val();
        var msgUsernameElement = document.createElement("b");
        msgUsernameElement.textContent = chat.username;
        var msgChatElement = document.createElement("p");
        msgChatElement.textContent = chat.chatMsg;
        var msgElement = document.createElement("li");
        var avatarElement = document.createElement("img");
        avatarElement.src = avatar;
        avatarElement.className = "avatar";
        msgElement.appendChild(avatarElement)
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgChatElement);
        msgElement.className = "chat";
        document.getElementById("chats").appendChild(msgElement); 
        toBottom();  
    })
}
beginListening();

document.getElementById("chatMsg")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("sendButton").click();
    }
});