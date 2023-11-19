// JavaScript for opening the popup
const applyButton = document.getElementById('applyButton');
const applyPopup = document.getElementById('applyPopup');

applyButton.addEventListener('click', () => {
    applyPopup.style.display = 'block';
});

// JavaScript for closing the popup
applyPopup.addEventListener('click', (event) => {
    if (event.target === applyPopup) {
        applyPopup.style.display = 'none';
    }
});
