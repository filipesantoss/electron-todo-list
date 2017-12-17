'use strict';

const { ipcRenderer } = require('electron');

const ul = document.querySelector('ul');

// Add a TODO. 
ipcRenderer.on('todo:add', (event, todo) => {
    // Create a list item and add a text node to it.
    const li = document.createElement('li');
    li.className = 'list-group-item';
    const text = document.createTextNode(todo);
    li.appendChild(text);

    // Append list item to unordered list.
    ul.appendChild(li);
});

// Remove a TODO by doubleclicking it.
ul.addEventListener('dblclick', (event) => {
    event.target.remove();
});