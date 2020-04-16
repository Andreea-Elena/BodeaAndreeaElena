import { read, append, remove } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-delete').addEventListener('change', onChangeDelete);  

  document.getElementById('form-delete').addEventListener('click', onClickSave);
  document.getElementById('form-delete').addEventListener('click', onClickSave);
  document.getElementById('form-delete').addEventListener('click', onClickCancel);

  navigator.serviceWorker.register("sw.js");

  render();
}


function onClickSave(event){

}

function onClickCancel(event){

}

function onClickEdit(event){
  const {form} =event.target;
  const data=new FormData(form);
  form.elements.name.readonly=false;

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
  event.target.elements.delete.disabled = true;
}

function onChangeDelete(event){
  const data = new FormData(event.target.form);
  const hasChecked = data.getAll('id').length > 0;
  event.target.form.elements.delete.disabled = !hasChecked;
  
}

function render() {
  const contacts = read();
  const items = contacts.map(
    contact => `
      <li>
      <label>
        <input type="checkbox" name="id" value="${contact.id}">
        <input type="text" value="${contact.name}" readonly name="name">
        <input type="text" value="${contact.email || "NA"}" readonly name="email">
        <input type="text" value="${contact.phone || "NA"}" readonly name="phone">
        <button name="edit">Edit</button>
        <button hidden name="save">Save</button>
        <button hidden name="cancel">Cancel</button>
      </label>
      </li>
    `
  );
  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-delete').hidden = contacts.length === 0;
}