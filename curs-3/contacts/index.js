import { read, append, remove } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  data.set('id', Date.now());
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onSubmitDelete(event) {
  event.preventDefault();
  const form=event.target;
  const data = new FormData(form);
  const contacts = read();
  data.getAll('id').forEach(id=>{
      const contact=contacts.find(contact=> contact.id===id);
      if(contact){
        remove(contact);
      }
  });
  render();
}

function render() {
  const contacts = read();
  const items = contacts.map(
    contact => `
      <li>
      <label>
        <input type="checkbox" name="id" value="${contact.id}">
        ${contact.name} &lt;${contact.email || "NA"}&gt; [${contact.phone || "NA"}]
        </label>
      </li>
    `
  );
  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-delete').hidden = contacts.length === 0;
}