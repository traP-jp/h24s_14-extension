import type { note, noteId } from "./types/note";
import fontColorContrast from 'font-color-contrast'

const messageContainerClass = "_body_s95f3_1._element_1rhtv_27";
const targetDivClass = "_viewport_wzi8z_11";
const DEFAULT_COLOR = "#FCBC05";

let messagesNotes: Map<string, note> = new Map();

const extractedMessageTexts: Map<Element, string> = new Map();
let hitCount = 0;
let totalCount = 0;

function saveNotes() {
    const notes = Array.from(messagesNotes.values());
    const filtered = notes.filter((note) => {
        return note.text;
    });
    // console.debug(filtered);
    // TODO: Send to extension filtered.
}

function extractMessageText(element: Element) {
    function extractText(element: Element) {
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

    totalCount++;

    if (extractedMessageTexts.has(element)) {
        hitCount++;
        return extractedMessageTexts.get(element) as string;
    } else {
        const text = extractText(element);
        extractedMessageTexts.set(element, text);
        return text;
    }
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

function getContainerById(id: noteId, messageContainers: Element[], path: string): Element | null {
    const { username, time, messageText, channelName } = id;
    let container = null;

    messageContainers.forEach((messageContainer) => {
        const innerContainer = messageContainer.querySelector('div._container_11fv0_1._messageContents_s95f3_27');
        if (!innerContainer) {
            throw new Error('Inner container not found');
        }

        const usernameElement = innerContainer.querySelector('span._displayName_34zvk_7');
        const timeElement = innerContainer.querySelector('span._date_34zvk_33');
        const messageTextElement = innerContainer.querySelector('span.markdown-body._content_9fzpt_1');
        if (!usernameElement || !timeElement || !messageTextElement) {
            throw new Error('One or more elements not found');
        }

        if (usernameElement.innerHTML === username &&
            timeElement.innerHTML === time &&
            extractMessageText(messageTextElement) === messageText &&
            path === channelName) {
            container = messageContainer;
        }
    });

    return container;
}

function getIdByContainer(container: Element): noteId {
    const innerContainer = container.querySelector('div._container_11fv0_1._messageContents_s95f3_27');
    if (!innerContainer) {
        throw new Error('Inner container not found');
    }

    const username = innerContainer.querySelector('span._displayName_34zvk_7');
    const time = innerContainer.querySelector('span._date_34zvk_33');
    const messageTextElement = innerContainer.querySelector('span.markdown-body._content_9fzpt_1');
    const pathContainer = document.querySelector('._container_1w237_1');
    if (!username || !time || !messageTextElement || !pathContainer) {
        throw new Error('One or more elements not found');
    }

    const messageText = extractMessageText(messageTextElement);
    const path = extractPath(pathContainer);

    const messageID: noteId = {
        username: username.innerHTML,
        time: time.innerHTML,
        messageText,
        channelName: path
    };
    return messageID;
}

function createButton(action: () => void, content: string) {
    // Create the button element
    const button = document.createElement('button');

    button.innerHTML = content;
    button.style.width = '24px';
    button.style.height = '24px';
    // add round border
    button.style.border = '2px solid #000';
    button.style.borderRadius = '100%';
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
        action();
    }

    button.style.backgroundColor = '#F0F2F5';

    button.onpointerdown = function () {
        button.style.backgroundColor = 'darkgray';
    }

    button.onpointerup = function () {
        button.style.backgroundColor = '#F0F2F5';
    }

    button.onpointerenter = function () {
        button.style.backgroundColor = 'lightgray';
    }

    button.onpointerleave = function () {
        button.style.backgroundColor = '#F0F2F5';
    }

    button.style.display = 'flex';
    button.style.flexDirection = 'row';

    return button;
}

// const newShade = (hexColor: string, magnitude: number) => {
//     hexColor = hexColor.replace(`#`, ``);
//     if (hexColor.length === 6) {
//         const decimalColor = parseInt(hexColor, 16);
//         let r = (decimalColor >> 16) + magnitude;
//         r > 255 && (r = 255);
//         r < 0 && (r = 0);
//         let g = (decimalColor & 0x0000ff) + magnitude;
//         g > 255 && (g = 255);
//         g < 0 && (g = 0);
//         let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
//         b > 255 && (b = 255);
//         b < 0 && (b = 0);
//         return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
//     } else {
//         return hexColor;
//     }
// };

function createNoteTextarea(onInput: (value: string) => void, color: string | null) {

    const note = document.createElement('textarea');
    note.classList.add('note-textarea');
    note.style.backgroundColor = color ?? DEFAULT_COLOR;
    note.style.color = fontColorContrast(color ?? DEFAULT_COLOR);
    // // border color is background color but darker
    // const borderColor = newShade(note.style.backgroundColor, -100);
    // note.style.border = `2px solid ${borderColor}`;
    note.style.borderRadius = '5px';
    note.style.padding = '5px';
    note.style.minWidth = '100px';
    note.style.minHeight = '50px';
    note.style.maxWidth = '300px';
    note.style.maxHeight = '200px';
    note.placeholder = "メモを書いて";
    note.oninput = function () {
        onInput(note.value);
    }
    return note;
}

function createColorPicker(onInput: (value: string) => void, color: string | null) {
    function injectColorInputStyles(component: Element) {
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
    // let containerTime = 0;
    const messageContainers = document.querySelectorAll(`div.${messageContainerClass}`);
    const pathContainer = document.querySelector('._container_1w237_1');
    if (!pathContainer) {
        throw new Error('Path container not found');
    }

    const path = extractPath(pathContainer);

    messagesNotes.forEach((note, _) => {
        const id = note.id;
        // const start = new Date().getTime();
        const container = getContainerById(id, messageContainers as any as Element[], path);
        // const end = new Date().getTime();
        // containerTime += end - start;

        if (container) {
            const innerContainer = container.querySelector('div._container_11fv0_1._messageContents_s95f3_27') as HTMLElement;
            if (!innerContainer) {
                throw new Error('Inner container not found');
            }
            innerContainer.style.gridTemplateColumns = '42px 4fr 1fr';

            function createNotesDiv() {
                const notesDiv = document.createElement('div');
                notesDiv.classList.add('notes-container');
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

                const addButton = createButton(() => {
                    if (note.text) {
                        return;
                    }

                    const textarea = createNoteTextarea((value) => {
                        note.text = value;
                    }, note.color);
                    note.text = "";
                    textarea.innerHTML = note.text;
                    notesDiv.appendChild(textarea);
                    textarea.focus();

                    // addButton.disabled = true;
                    // removeButton.disabled = false;
                    removeButton.style.display = 'flex';

                    saveNotes();
                }, "+");
                toolbarDiv.appendChild(addButton);

                const removeButton = createButton(() => {
                    const noteTextarea = container!.querySelector('.note-textarea') as HTMLElement;
                    if (noteTextarea) {
                        noteTextarea.remove();

                        messagesNotes.get(JSON.stringify(id))!.text = null;

                        // addButton.disabled = false;
                        // removeButton.disabled = true;
                        removeButton.style.display = 'none';
                    }

                    saveNotes();
                }, "-");
                removeButton.style.display = 'none';
                toolbarDiv.appendChild(removeButton);

                const changeColor = createColorPicker((value) => {
                    const textarea = notesDiv.querySelector('.note-textarea') as HTMLTextAreaElement;
                    if (!textarea) {
                        throw new Error('Note textarea not found');
                    }

                    textarea.style.backgroundColor = value;
                    textarea.style.color = fontColorContrast(value);

                    // const borderColor = newShade(value, -100);
                    // textarea.style.border = `2px solid ${borderColor}`;

                    note.color = value;

                    saveNotes();
                }, note.color);
                toolbarDiv.appendChild(changeColor);

                notesDiv.appendChild(toolbarDiv);

                return notesDiv;
            }

            let existingNoteDiv = container.querySelector('div.notes-container');
            if (!existingNoteDiv) {
                const notesDiv = createNotesDiv();
                innerContainer.appendChild(notesDiv);
            }

            let existingNoteTextarea = container.querySelector('.note-textarea');
            if (!existingNoteTextarea && note.text) {
                const textarea = createNoteTextarea((value) => {
                    note.text = value;
                    saveNotes();
                }, note.color);
                textarea.innerHTML = note.text;

                const notesDiv = container.querySelector('div.notes-container') as HTMLElement;
                notesDiv.appendChild(textarea);
            }
        }
    });
    // print in ms
    // console.log(`containerTime ${containerTime}ms`);

    // console.log(`hitCount: ${hitCount} / totalCount: ${totalCount} and in percent: ${hitCount / totalCount * 100}%`)
}

function findMessages() {
    document.querySelectorAll(`div.${messageContainerClass}`).forEach((container) => {
        const messageID = getIdByContainer(container);
        const idString = JSON.stringify(messageID);
        if (!messagesNotes.has(idString)) {
            const n: note = {
                id: messageID,
                text: null,
                color: null,
                creationTimestamp: new Date().toISOString()
            };
            messagesNotes.set(idString, n);
        }
    });
}

function observeTargetDiv() {
    const targetDiv = document.querySelector(`div.${targetDivClass}`);

    if (targetDiv) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    // measure time
                    // console.time('findMessages');
                    findMessages();
                    // console.timeEnd('findMessages');
                    // console.time('updateUI');
                    updateUI();
                    // console.timeEnd('updateUI');
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
        setTimeout(observeTargetDiv, 500);
    }
}

// Start observing the target div when the page loads
window.addEventListener('load', observeTargetDiv);

// TODO: Consider more cases for example what happens when a trap message disappears? What if text changes?
// TODO: Currently everything is always save. add save button
// TODO: Load notes from extension on load.
