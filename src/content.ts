const messageContainerClass = "_body_s95f3_1._element_1rhtv_27";
const targetDivClass = "_container_19vp7_1._mainViewWrapper_1kcg8_28";
const DEFAULT_COLOR = "#FCBC05";

let messages = new Map();
console.log("Defined messages map")

function extractMessageText(element: Element) {
    let result = '';

    function traverse(node: any) {
        if (node.nodeType === Node.TEXT_NODE) {
            result += node.textContent.trim();
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'button') {
            Array.from(node.childNodes).forEach(childNode => {
                traverse(childNode);
            });
        }
    }

    traverse(element);
    return result;
}

function extractPath(element: Element) {
    const pathParts: string[] = [];

    function processElement(el: Element) {
        if (el.classList.contains('_current_1w237_27')) {
            pathParts.push(el.textContent ?? '');
        } else if (el.classList.contains('_ancestorHash_1w237_38')) {
            pathParts.push(el.textContent ?? '');
        } else if (el.classList.contains('_ancestor_1w237_8')) {
            pathParts.push(el.textContent ?? '');
        }
    }

    function traverseChildren(node: any) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            processElement(node);
            Array.from(node.children).forEach(child => {
                traverseChildren(child);
            });
        }
    }

    traverseChildren(element);
    return pathParts.join('');
}

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
        const pathContainer = document.querySelector('._container_1w237_1');
        const path = extractPath(pathContainer);

        if (usernameElement.innerHTML === username &&
            timeElement.innerHTML === time &&
            extractMessageText(messageTextElement) === messageText &&
            path === channelName) {
            container = messageContainer;
        } else {
            // console.debug("Username", usernameElement.innerHTML, username);
            // console.debug("Time", timeElement.innerHTML, time);
            // console.debug("Message text");
            // console.debug(`${extractMessageText(messageTextElement).length} ||| ${messageText.length}`);
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
    const messageTextElement = innerContainer.querySelector('span.markdown-body._content_9fzpt_1');
    const messageText = extractMessageText(messageTextElement);
    // console.debug(messageText);
    const pathContainer = document.querySelector('._container_1w237_1');
    const path = extractPath(pathContainer);
    const channelName = path;
    console.debug(channelName);
    // console.debug(channelName);

    const messageID = {
        username,
        time,
        messageText,
        channelName
    };
    return messageID;
}

function button(createNote) {
    // Create the button element
    const button = document.createElement('button');

    button.innerHTML = '+';
    button.style.width = '24px';
    button.style.height = '24px';
    // add round border
    button.style.border = '2px solid #000';
    button.style.borderRadius = '25%';
    button.style.borderColor = 'black';
    // align font in center
    button.style.textAlign = 'center';
    // mouse
    button.style.cursor = 'pointer';
    button.style.color = 'black';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';

    button.onclick = function () {
        createNote();
    }

    button.style.backgroundColor = 'gray';

    button.onpointerdown = function () {
        button.style.backgroundColor = 'darkgray';
    }

    button.onpointerup = function () {
        button.style.backgroundColor = 'gray';
    }

    button.onpointerenter = function () {
        button.style.backgroundColor = 'lightgray';
    }

    button.onpointerleave = function () {
        button.style.backgroundColor = 'gray';
    }

    button.style.display = 'flex';
    button.style.flexDirection = 'row';

    return button;
}

function createNoteTextarea(onInput, color) {
    const note = document.createElement('textarea');
    note.classList.add('note-textarea');
    note.style.backgroundColor = color ?? DEFAULT_COLOR;
    // note.style.resize = 'none';
    note.style.border = '2px solid #977103';
    note.style.borderRadius = '5px';
    note.style.padding = '5px';
    note.style.color = 'white';
    note.style.minWidth = '100px';
    note.style.minHeight = '50px';
    note.style.maxWidth = '300px';
    note.style.maxHeight = '200px';
    note.oninput = function () {
        onInput(note.value);
    }
    return note;
}

function createColorPicker(onInput, color) {
    function injectColorInputStyles(component) {
        // Create a new <style> element
        const styleElement = document.createElement('style');

        // Set the type attribute
        styleElement.setAttribute('type', 'text/css');

        // Define the CSS styles
        const styles = `
            input[type="color"] {
                -webkit-appearance: none;
                border: none;
            }
            input[type="color"]::-webkit-color-swatch-wrapper {
                padding: 0;
            }
            input[type="color"]::-webkit-color-swatch {
                border: none;
            }
        `;

        // Set the content of the <style> element
        styleElement.textContent = styles;

        // Append the <style> element to the component's element
        component.appendChild(styleElement);
    }

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = color ?? DEFAULT_COLOR;
    colorPicker.style.border = '2px solid #000';
    colorPicker.style.borderRadius = '0%';
    colorPicker.style.width = '24px';
    colorPicker.style.height = '24px';
    colorPicker.oninput = function () {
        onInput(colorPicker.value);
    }
    injectColorInputStyles(colorPicker)
    return colorPicker;
}

function updateUI() {
    console.log('Updating UI...');
    messages.forEach((state, hash) => {
        const id = state.id;
        const container = getContainerById(id);

        if (container) {
            const innerContainer = container.querySelector('div._container_11fv0_1._messageContents_s95f3_27');
            innerContainer.style.gridTemplateColumns = '42px 1fr 1fr';

            const notesDiv = document.createElement('div');
            notesDiv.classList.add('notes-container');
            // notesDiv.style.background = 'lightgray';
            notesDiv.style.gridRow = '1 / span 3';
            notesDiv.style.display = 'flex';
            notesDiv.style.flexDirection = 'row';
            notesDiv.style.justifyContent = 'left';
            notesDiv.style.alignItems = 'top';
            notesDiv.style.gap = '20px';
            notesDiv.style.marginLeft = '10px';

            const toolbarDiv = document.createElement('div');
            toolbarDiv.style.display = 'flex';
            toolbarDiv.style.flexDirection = 'column';
            toolbarDiv.style.gap = '10px';
            notesDiv.appendChild(toolbarDiv);

            toolbarDiv.appendChild(button(() => {
                if (state.note) {
                    return;
                }
                console.log('Create note');
                // Create note
                const note = createNoteTextarea((value) => {
                    state.note = value;
                }, state.color);
                state.note = "new note";
                note.innerHTML = state.note;
                notesDiv.appendChild(note);
                note.focus();
            }));

            toolbarDiv.appendChild(createColorPicker((value) => {
                state.color = value;
                const note = notesDiv.querySelector('.note-textarea');
                note.style.backgroundColor = value;
            }, state.color));

            let existingNoteDiv = container.querySelector('div.notes-container');
            // if (existingNoteDiv && existingNoteDiv.offsetParent === null) {
            //     existingNoteDiv.remove();
            //     existingNoteDiv = null;
            //     console.log("Remove existing note");
            // }
            if (!existingNoteDiv) {
                // console.log("Add new note");
                innerContainer.appendChild(notesDiv);
            }
            let existingNoteTextarea = container.querySelector('.note-textarea');
            if (!existingNoteTextarea && state.note) {
                const note = createNoteTextarea((value) => {
                    state.note = value;
                }, state.color);
                note.innerHTML = state.note;
                notesDiv.appendChild(note);
            }

            // console.debug(messages);
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
        const idString = JSON.stringify(messageID);
        // Map message ID to DOM node messageContainer but only if it doesn't exist
        if (!messages.has(idString)) {
            const state = {
                id: messageID,
                note: null,
                color: null
            };
            messages.set(idString, state);
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
