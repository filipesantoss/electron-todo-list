'use strict';

const { ipcRenderer } = require('electron');

const form = document.querySelector('form');
form.addEventListener('submit', submit);

function submit(event) {
   event.preventDefault();

   const TODO = document.querySelector('#todo').value;
   ipcRenderer.send('todo:add', TODO);
}