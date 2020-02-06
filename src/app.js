const obj = {
  name: 'Mkid',
  getName() {
    return this.name;
  }
};

console.log(obj.getName());

// obj.bind()...
const getName = obj.getName.bind({ name: 'Tom' });
const getName2 = obj.getName.bind(obj);

console.log(getName());
console.log(getName2());

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePickOption = this.handlePickOption.bind(this);
    this.state = {
      title: 'Indecision',
      subtitle: 'Put your life in the hands of a computer.',
      options: []
    };
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item...';
    } else if (this.state.options.includes(option)) {
      return 'This option already exists';
    }

    this.setState(prev => {
      // or prev.options.concat(option)
      // not to use push
      return {
        options: [...prev.options, option]
      };
    });
  }

  handlePickOption() {
    const ranNum = Math.floor(Math.random() * this.state.options.length);
    const pickedOption = this.state.options[ranNum];
    alert(pickedOption);
  }

  render() {
    const options = this.state.options;
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <Action hasOptions={this.state.options.length > 0} handlePickOption={this.handlePickOption} />
        <Options options={options} handleDeleteOptions={this.handleDeleteOptions} />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  // handlePick() {
  //   alert('Handle Pick!!');
  // }
  render() {
    return (
      <div>
        <button onClick={this.props.handlePickOption} disabled={!this.props.hasOptions}>
          What should I do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleRemoveAll = this.handleRemoveAll.bind(this);
  // }
  // // need to do this to get props

  // handleRemoveAll() {
  //   // this cause an error, cannot get 'this' in a function
  //   // this.props.options;
  //   alert('I will remove all of them.');
  // }
  render() {
    const options = this.props.options.map((option, index) => <Option option={option} key={index} />);
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove all</button>
        {options.length > 0 ? <ul>{options}</ul> : <p>No options here...</p>}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <li>{this.props.option}</li>;
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();
    const inputOption = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(inputOption);

    e.target.elements.option.value = '';

    this.setState(() => {
      return { error };
    });
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add an option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
