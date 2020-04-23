import { read, append, remove, edit } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-delete').addEventListener('change', onChangeDelete);  

  navigator.serviceWorker.register("sw.js");

  render();
}


function onClickSave(event){
  const save = event.target;

  const fields = event.path[2].children[0];
  const name = fields.children[1];
  const email = fields.children[2];
  const phone = fields.children[3];
  const editable = { email: email.value, phone: phone.value, name: name.value };

  const { form } = event.path[2].children[0];
  const data = new FormData(form);
  const contacts = read();
  data.set('id', save.value);
  console.log(data);
  edit(contacts[save.value], editable);

  render();
}


function onClickEdit(event){
  const edit = event.target;
  const label = edit.closest('label');

  const save = label.children[5];
  const cancel = label.children[6];

  edit.hidden = true;
  save.hidden = false;
  cancel.hidden = false;

  const fields = event.path[2].children[0];
  const name = fields.children[1];
  const email = fields.children[2];
  const phone = fields.children[3];

  name.readOnly = false;
  email.readOnly = false;
  phone.readOnly = false;

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
        <button type="button" class="edit" value="${contact.id}"> Edit</button>
        <button hidden class="save" value="${contact.id}">Save</button>
        <button type="cancel" hidden class="cancel">Cancel</button>
      </label>
      </li>
    `
  );
  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-delete').hidden = contacts.length === 0;

  let elements = document.getElementsByClassName('edit');
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', onClickEdit);
  }
  elements = document.getElementsByClassName('save');
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', onClickSave);
  }
}