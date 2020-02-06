class DetailToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggle: false
    };
  }

  toggle() {
    this.setState(prev => {
      return { toggle: !prev.toggle };
    });
  }

  render() {
    return (
      <div>
        <h1>Toggle your detail.</h1>
        <button onClick={this.toggle}>{this.state.toggle ? 'Hide your detail.' : 'Show your detail.'}</button>
        {this.state.toggle && <h3>This is your fucking detail.</h3>}
      </div>
    );
  }
}

ReactDOM.render(<DetailToggle />, document.getElementById('app'));
