const messageContainerClass = "_body_s95f3_1._element_1rhtv_27";
const targetDivClass = "_container_19vp7_1._mainViewWrapper_1kcg8_28";

let messages = new Map();
console.log("Defined messages map")

function getContainerById(id) {
    const { username, time, messageText, channelName } = id;
    const messageContainers = document.querySelectorAll(`div.${messageContainerClass}`);
    let container = null;

    // console.debug(messages);

    messageContainers.forEach((messageContainer) => {
        const innerContainer = messageContainer.querySelector('div._container_11fv0_1._messageContents_s95f3_27');
        const usernameElement = innerContainer.querySelector('span._displayName_34zvk_7');
        const timeElement = innerContainer.querySelector('span._date_34zvk_33');
        const messageTextElement = innerContainer.querySelector('span.markdown-body._content_9fzpt_1');

        if (usernameElement.innerHTML === username &&
            timeElement.innerHTML === time &&
            messageTextElement.innerHTML === messageText) {
            container = messageContainer;
        } else {
            // console.debug("Username", usernameElement.innerHTML, username);
            // console.debug("Time", timeElement.innerHTML, time);
            // console.debug("Message text");
            // console.debug(`${messageTextElement.innerHTML} ||| ${messageText}`);
        }
    });

    return container;
}

function getIdByContainer(container) {
    const innerContainer = container.querySelector('div._container_11fv0_1._messageContents_s95f3_27');
    // console.debug(innerContainer);
    // Find ID information and if not exists add to messages and log
    const username = innerContainer.querySelector('span._displayName_34zvk_7').innerHTML;
    // console.debug(username);
    const time = innerContainer.querySelector('span._date_34zvk_33').innerHTML;
    // console.debug(time);
    const messageText = innerContainer.querySelector('span.markdown-body._content_9fzpt_1').innerHTML;
    // console.debug(messageText);
    const channelName = "TODO";
    // console.debug(channelName);

    const messageID = {
        username,
        time,
        messageText,
        channelName
    };
    return messageID;
}

function updateUI() {
    console.log('Updating UI...');
    messages.forEach((id, hash) => {
        const container = getContainerById(id);

        if (container) {
            const notesDiv = document.createElement('div');
            notesDiv.classList.add('notes-container');

            const notesLabel = document.createElement('label');
            notesLabel.textContent = 'Notes:';
            notesDiv.appendChild(notesLabel);

            const notesInput = document.createElement('input');
            notesInput.type = 'text';
            notesInput.classList.add('notes-input');
            notesDiv.appendChild(notesInput);

            let existingNoteDiv = container.querySelector('div.notes-container');
            // if (existingNoteDiv && existingNoteDiv.offsetParent === null) {
            //     existingNoteDiv.remove();
            //     existingNoteDiv = null;
            //     console.log("Remove existing note");
            // }
            if (!existingNoteDiv) {
                // console.log("Add new note");
                container.appendChild(notesDiv);
            }
        }
    });
}

/*
Information that identifies a message as unique:
- Username
- Time
- Message text
- Full channel name
*/

function findMessages() {
    const messageContainers = document.querySelectorAll(`div.${messageContainerClass}`);

    let newMessages = 0;
    messageContainers.forEach((container) => {
        const messageID = getIdByContainer(container);
        const hash = JSON.stringify(messageID);
        // Map message ID to DOM node messageContainer but only if it doesn't exist
        if (!messages.has(hash)) {
            messages.set(hash, messageID);
            // console.log(`Added message ${messageID} to messages map`);
            newMessages++;
        }
    });

    console.log(`Found ${newMessages} new messages`);
    // console.debug(messages);
}

function observeTargetDiv() {
    const targetDiv = document.querySelector(`div.${targetDivClass}`);

    if (targetDiv) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    console.log('Target div updated. Finding messages...');
                    findMessages();
                    updateUI();
                }
            });
        });

        const observerOptions = {
            childList: true,
            characterData: true,
            subtree: true
        };

        observer.observe(targetDiv, observerOptions);
    } else {
        console.warn('Target div not found. Retrying in 0.5 seconds...');
        setTimeout(observeTargetDiv, 500);
    }
}

// Start observing the target div when the page loads
window.addEventListener('load', observeTargetDiv);