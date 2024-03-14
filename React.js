class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: "Learn JavaScript", done: false },
        { id: 2, text: "Learn React", done: false },
        { id: 3, text: "Play around in JSFiddle", done: true },
        { id: 4, text: "Build something awesome", done: true }
      ]
    };
    this.addTask = this.addTask.bind(this);
    this.changeCheck = this.changeCheck.bind(this);
  }
  
  render() {
    return (
      <div>
        <h2>Todos:</h2>
        <ol>
          {this.state.items.map(item => (
            <li key={item.id}>
              <label>
                <input type="checkbox" onClick={() => this.changeCheck(item.id)} checked={item.done} /> 
                <span className={item.done ? "done" : ""}>{item.text} </span>
                <button onClick={() => this.delTask(item.id)}>-</button>
              </label>
            </li>
          ))}
        </ol>
        <input type="button" value="Ajouter" onClick={this.addTask}/>
        <h3> Il y a {this.state.items.length} tâches ({this.state.items.filter(item => !item.done).length} en attente) </h3> 
      </div>
    );
  }
  
  delTask(id) {
  if (confirm("Etes vous sûr de voilor supprimer cette tâche ?")){
  	this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }));
  }
    
  }
  
  addTask() {
    const taskTitle = prompt("Entrez le titre de la nouvelle tâche :"); // Demande le titre de la nouvelle tâche
    if (taskTitle) { // Vérifie si l'utilisateur a entré un titre
      const newItem = {
        id: Date.now(), // ID unique pour chaque tâche
        text: taskTitle, // Utilise le titre entré par l'utilisateur
        done: false // Nouvelle tâche n'est pas terminée initialement
      };
      this.setState(prevState => ({
        items: [...prevState.items, newItem]
      }));
    }
  }

  changeCheck(id) {
    this.setState(prevState => ({
      items: prevState.items.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    }));
  }
}

ReactDOM.render(<TodoApp />, document.querySelector("#app"))

