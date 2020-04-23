export function read() {
  const data = window.localStorage.getItem('ds-contacts'); //localStorage tine String-uri
  return data === null ? [] : JSON.parse(data); //nu putem da push la null
}

export function write(contacts) {
  const data = JSON.stringify(contacts);
  window.localStorage.setItem('ds-contacts', data);
}

export function append(contact) {
  const contacts = read();
  contacts.push(contact);
  write(contacts);
}

export function remove(contact) {
  const contacts = read();
  const index=contacts.findIndex(element=>element.id===contact.id);
  if(index!==-1){
    contacts.splice(index,1);
  }
  write(contacts);
}

export function edit(contact, edit) {
  const contacts = read();
  const id = contacts.findIndex(element => element.id === contact);
  if (id !== -1) {
    contacts.splice(id, 1, edit);
    write(contacts);
  }
}
