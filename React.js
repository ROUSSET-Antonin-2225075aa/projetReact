class Header extends React.Component {
  render() {
    const { totalTasks, remainingTasks } = this.props;
    const progress = 100 - Math.round((remainingTasks / totalTasks) * 100);

    return (
      <div>
        <h2>Progression :</h2>
        <p>Nombre de tâches restantes : {remainingTasks} / {totalTasks}</p>
        <p>Progression : {progress}%</p>
      </div>
    );
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleAddTask() {
    const taskTitle = this.state.inputValue.trim();
    if (taskTitle) {
      this.props.addTask(taskTitle);
      this.setState({ inputValue: '' });
    }
  }

  handleSearch(event) {
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Recherche..."
          value={this.props.searchText}
          onChange={this.handleSearch}
        />
        <input
          type="text"
          placeholder="nom de la tache"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleAddTask}>Ajouter une tâche</button>
      </div>
    );
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: 'Learn JavaScript', done: false },
        { id: 2, text: 'Learn React', done: false },
        { id: 3, text: 'Play around in JSFiddle', done: true },
        { id: 4, text: 'Build something awesome', done: true },
      ],
      searchText: '',
    };
    this.changeCheck = this.changeCheck.bind(this);
    this.delTask = this.delTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.getTotalTasks = this.getTotalTasks.bind(this);
    this.getRemainingTasks = this.getRemainingTasks.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }

  getTotalTasks() {
    return this.state.items.length;
  }

  getRemainingTasks() {
    return this.state.items.filter((item) => !item.done).length;
  }

  handleSearch(searchText) {
    this.setState({ searchText });
  }

  render() {
    const filteredItems = this.state.items.filter((item) =>
      item.text.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    return (
      <div>
        <Header
          totalTasks={this.getTotalTasks()}
          remainingTasks={this.getRemainingTasks()}
        />
        <h2>Todos:</h2>
        <ol>
          {filteredItems.map((item, index) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  onClick={() => this.changeCheck(item.id)}
                  checked={item.done}
                />
                <span className={item.done ? 'done' : ''}>{item.text}</span>
                <button onClick={() => this.delTask(item.id)}>-</button>
                {index > 0 && (
                  <button onClick={() => this.changeOrder(index, index - 1)}>
                    ⬆️
                  </button>
                )}
                {index < filteredItems.length - 1 && (
                  <button onClick={() => this.changeOrder(index, index + 1)}>
                    ⬇️
                  </button>
                )}
              </label>
            </li>
          ))}
        </ol>
        <Footer
          addTask={this.addTask}
          onSearch={this.handleSearch}
          searchText={this.state.searchText}
        />
      </div>
    );
  }

  delTask(id) {
    if (window.confirm('Etes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.setState((prevState) => ({
        items: prevState.items.filter((item) => item.id !== id),
      }));
    }
  }

  addTask(title) {
    const newItem = {
      id: Date.now(),
      text: title,
      done: false,
    };
    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
    }));
  }

  changeCheck(id) {
    this.setState((prevState) => ({
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      ),
    }));
  }

  changeOrder(currentIndex, newIndex) {
    this.setState((prevState) => {
      const items = [...prevState.items];
      const movedItem = items.splice(currentIndex, 1)[0];
      items.splice(newIndex, 0, movedItem);
      return { items };
    });
  }
}

ReactDOM.render(<TodoApp />, document.querySelector('#app'));