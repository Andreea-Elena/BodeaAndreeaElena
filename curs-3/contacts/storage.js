export function read(){
    const data=window.localStorage.getItem("ds-contacts"); //localStorage tine String-uri
    return data === null ? [] : JSON.parse(data); //nu putem da push la null
}

export function write(contacts){
    const data=JSON.stringify(contacts);
    window.localStorage.setItem("ds-contacts",data);
}

export function append(contact){
    const contacts=read();
    contacts.push(contact);
    write(contacts);
}

export function del(contact){
    const contacts=read();
    contacts.pop(contact);
    write(contacts);
}