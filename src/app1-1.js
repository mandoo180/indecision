class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleNumChange = this.handleNumChange.bind(this);
    this.state = {
      name: 'faye',
      count: 0
    };
  }

  handleNumChange(e) {
    const id = e.target.id;

    // you can do it in various ways
    // const prevCount = this.state.count;
    // const count = id === 'addition' ? prevCount + 1 : id === 'subtract' ? prevCount - 1 : 0;
    // this.setState({ count });

    // but this one is preferred
    this.setState(prevState => {
      const count = id === 'addition' ? prevState.count + 1 : id === 'subtract' ? prevState.count - 1 : 0;
      return { count };
    });
  }

  render() {
    return (
      <div>
        {this.state.name}
        <h1>Count: {this.state.count}</h1>
        <button id="addition" onClick={this.handleNumChange}>
          +1
        </button>
        <button id="subtract" onClick={this.handleNumChange}>
          -1
        </button>
        <button id="reset" onClick={this.handleNumChange}>
          0
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
