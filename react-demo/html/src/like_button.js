class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: 'true' };
  }
  render() {
    let { liked } = this.state;
    return <button onClick={() => this.setState({ liked: 'false' })}>{liked}</button>;
  }
}
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);
