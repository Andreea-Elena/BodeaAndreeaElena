const main = {

    users: [],

    error: "",

    async init(){
        const users1=await this.fetchUsers();
        if(users1){
            this.users=users1;
        }else{
            this.error="An error has occurred!";
        }
        this.render();
    },

    async fetchUsers(){
        const response=await fetch("https://jsonplaceholder.typicode.com/users");
        if(response.ok){
            const data= await response.json();
            return data;
        }
        return null;
    },

    render(){
        if(this.error){
            document.getElementById("error").textContent=this.error;
        } else{
            const items=this.users.map(user=>`<li>${user.name} ${user.email} </li>`);
            const list=document.getElementById("list");
            list.innerHTML = items.join("");
        }
    }
};
