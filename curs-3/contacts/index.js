import {append, read} from "./storage.js"

export function init(){
    window.addEventListener("DOMContentLoaded", onLoad);

    function onLoad(){
        document.getElementById("form-add").addEventListener("submit",onSubmitAdd);         
        document.getElementById("form-delete").addEventListener("submit",onSubmitDelete);
        render();
    }

    function onSubmitAdd(event){
        event.preventDefault();
        console.log(event.target);
        const fd=new FormData(event.target);
        const contact=Object.fromEntries(fd);
        append(contact);
        render();
    }

    function onSubmitDelete(event){
        
    }

    function render(){
        const contacts=read();
        const list=document.getElementById("list");
        const items = contacts.map(contact=>`<li><input type="checkbox" name="delete"/>
        ${contact.name} &lt;${contact.email}&gt; {${contact.phone}}</li>`);

        list.innerHTML=items.join("");
        const formDelete=document.getElementById("form-delete");
        formDelete.hidden=contacts.length === 0;
    }

}