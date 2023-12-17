  // Connecting to the socket server here.
  const socket = io.connect("http://localhost:3000");
  // Avatars arrays.
  const dp = [
    "../assets/batman.png",
    "../assets/dinosaur.png",
    "../assets/koala.png",
    "../assets/ninja.png",
    "../assets/superhero.png",
  ];

  // Function to getting random avatars.
  function getRandomAvatar() {
    return dp[Math.floor(Math.random() * dp.length)];
  }

  // When new user is joined
  // Getting username and displaying username and online.
  let username;
  let userAvatar;
  function gettingUsername() {
    const username = prompt("Enter Your Name");
    userAvatar = getRandomAvatar();

    const userDetails = document.getElementById("user-details");
    if (username) {
      // socket emitting that new user is joined
      socket.emit("user-joined", { username, avatar: userAvatar });

      const welcomeSpan = document.createElement("span");
      welcomeSpan.classList.add("fs-5", "text-success");
      welcomeSpan.textContent = `Welcome ${username}`;

      const userImage = document.createElement("img");
      userImage.src = userAvatar;
      userImage.alt = "User Avatar";
      userImage.id = "user-image";
      userImage.classList.add("ms-2", "avatar");

      userDetails.appendChild(welcomeSpan);
      userDetails.appendChild(userImage);

      // Initializing chats.
      initializeChat(username);
    } else {
      document
        .getElementById("send-message")
        .addEventListener("click", gettingUsername);
    }
  }

  // All chatting is starting here in this function after user provides his or her name.
  function initializeChat(username) {
    // Fetching Elements
    const userChats = document.getElementById("user-chats");
    const textInput = document.getElementById("text-msg");
    const sendMessage = document.getElementById("send-message");
    const userDetails = document.getElementById("user-details");

    // When user types it shows typing in header.
    let typingTimer;

    textInput.addEventListener("input", () => {
      clearTimeout(typingTimer);
      // Emit username to server to broadcast to everyone.
      socket.emit("user-typing", username);
    });

    // Broadcasting here
    socket.on("user-typing", (username) => {
      const typingIndicator = document.createElement("span");
      typingIndicator.textContent = `${username} Typing...`;
      typingIndicator.id = "typing-indicator";
      typingIndicator.classList.add("ms-2");

      const existingTypingIndicator =
        document.getElementById("typing-indicator");
      if (existingTypingIndicator) {
        existingTypingIndicator.remove();
      }

      userDetails.appendChild(typingIndicator);

      // Set a timeout to remove the typing indicator after 2 seconds of inactivity
      typingTimer = setTimeout(() => {
        typingIndicator.remove();
      }, 500); // Adjust the time (in milliseconds) as needed
    });

    // Adding event listener for Enter key press to send the message
    textInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendMessage.click();
      }
    });

    // Displaying and updating users count here.
    socket.on("users-count", (userCount) => {
      // Update the displayed user count
      const usersCountDisplay = document.getElementById(
        "users-count-display"
      );
      usersCountDisplay.innerText = `Users connected ${userCount}`;
    });

    const incomingMessageSound = document.getElementById("incomingMessageSound");

    // Listen for the "new-message-received" event
    socket.on('new-message-received', () => {
        // Play the incoming message sound
        incomingMessageSound.play();
    });


    // Displaying users name, avatar, and online status
    socket.on("users-list", (userList) => {
      const usersDisplay = document.getElementById("users-display");
      usersDisplay.innerHTML = "";

      userList.forEach((user) => {
        const userDisplayBox = document.createElement("div");
        userDisplayBox.classList.add("alert", "alert-success", "w-100");

        const userContent = document.createElement("div");
        userContent.classList.add("d-flex", "align-items-center");

        const avatarImg = document.createElement("img");
        avatarImg.src = user.avatar;
        avatarImg.classList.add("avatar", "me-2");
        userContent.appendChild(avatarImg);

        const userInfo = document.createElement("div");
        const userName = document.createElement("span");
        userName.textContent = user.username;
        userInfo.appendChild(userName);

        const greenDot = document.createElement("i");
        greenDot.classList.add(
          "fa-solid",
          "fa-circle",
          "text-success",
          "ms-2"
        );
        userInfo.appendChild(greenDot);

        userContent.appendChild(userInfo);
        userDisplayBox.appendChild(userContent);

        usersDisplay.appendChild(userDisplayBox);
      });
    });

    // Displaying previous chats of the users or chat history.
    socket.on("chat-history", (chats) => {
      chats.forEach((chat) => {
        const newMessage = document.createElement("div");
        newMessage.className = "message";

        // Creating an image element for the avatar
        const avatarImg = document.createElement("img");
        avatarImg.src = chat.avatar; // Set the source of the image to the avatar URL
        avatarImg.classList.add("avatar", "ms-2"); // Add a class for styling
        newMessage.appendChild(avatarImg); // Append the avatar image

        const messageContent = document.createElement("div");
        messageContent.className = "message-content";

        const usernameSpan = document.createElement("span");
        usernameSpan.className = "username";
        usernameSpan.textContent = chat.user;
        messageContent.appendChild(usernameSpan);

        const timeSpan = document.createElement("span");
        timeSpan.className = "time";
        const messageTime = new Date(chat.createdAt).toLocaleTimeString();
        timeSpan.textContent = messageTime;
        messageContent.appendChild(timeSpan);

        const messageP = document.createElement("p");
        messageP.textContent = chat.message;
        messageContent.appendChild(messageP);

        newMessage.appendChild(messageContent);

        userChats.appendChild(newMessage);

        // Scroll to the bottom of chats when we send new message.
        userChats.scrollTop = userChats.scrollHeight;
      });
    });

    // Displaying Broadcast messages in the chat.
    socket.on("broadcast-messages", (message) => {
      const newMessage = document.createElement("div");
      newMessage.className = "message";

      const usernameSpan = document.createElement("span");
      usernameSpan.className = "username";
      usernameSpan.textContent = message.user;
      newMessage.appendChild(usernameSpan);

      const avatarImg = document.createElement("img");
      avatarImg.src = message.avatar;
      avatarImg.classList.add("avatar", "ms-2");
      newMessage.appendChild(avatarImg);

      const timeSpan = document.createElement("span");
      timeSpan.className = "time";
      timeSpan.textContent = new Date(
        message.createdAt
      ).toLocaleTimeString();
      newMessage.appendChild(timeSpan);

      const messageP = document.createElement("p");
      messageP.textContent = message.message;
      newMessage.appendChild(messageP);

      userChats.appendChild(newMessage);

      // Scroll to the bottom of chats when we send new message.
      userChats.scrollTop = userChats.scrollHeight;
    });

    // Adding message to the user-chats lists on click of send button.
    sendMessage.addEventListener("click", (event) => {
      event.preventDefault();

      // Text message
      const textMessage = textInput.value;
      if (textMessage != "") {
        // Sending username, avatar, and message to server
        socket.emit("new-message", {
          user: username,
          avatar: userAvatar,
          message: textMessage,
        });

        // Displaying message in the chats.
        const newMessage = document.createElement("div");
        newMessage.classList.add(
          "message",
          "align-right",
          "message-bg-blue"
        );

        const usernameSpan = document.createElement("span");
        usernameSpan.className = "username";
        usernameSpan.classList.add("white");
        usernameSpan.textContent = username;
        newMessage.appendChild(usernameSpan);

        const avatarImg = document.createElement("img");
        avatarImg.src = userAvatar;
        avatarImg.classList.add("avatar", "ms-2"); // Apply the avatar class for styling
        newMessage.appendChild(avatarImg);

        const timeSpan = document.createElement("span");
        timeSpan.className = "time-white";
        const currentTime = new Date().toLocaleTimeString(); // Get current time
        timeSpan.textContent = currentTime;
        newMessage.appendChild(timeSpan);

        const messageP = document.createElement("p");
        messageP.textContent = textMessage;
        messageP.classList.add("white");
        newMessage.appendChild(messageP);

        userChats.appendChild(newMessage);
        textInput.value = "";

        // Scroll to the bottom of chats when we send new message.
        userChats.scrollTop = userChats.scrollHeight;
      }
    });
  }

  // Intitializing Function.
  gettingUsername();