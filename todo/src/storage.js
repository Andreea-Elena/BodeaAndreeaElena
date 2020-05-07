 
function write(todo) {
  const data = JSON.stringify(todo);
  window.localStorage.setItem('todo', data);
}

export function read() {
  const data = window.localStorage.getItem('todo');
  return data === null ? [] : JSON.parse(data);
}
export function append(todo) {
  const data = read();
  data.push(todo);
  write(data);
}

export function remove(id) {
  const data = read();
  const index = data.findIndex(todo => todo.id === id);
  data.splice(index, 1);
  console.log(index, id, data);
  write(data);
  window.location.reload();
}