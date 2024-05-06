import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container max-w-md mx-auto px-4 py-8">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label className="block mb-2 font-semibold">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none" required />
            <label className="block mb-2 font-semibold">Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none" required />
            <label className="block mb-2 font-semibold">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none" required />
            <label className="block mb-2 font-semibold">Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none" required />
            <button type="submit" disabled={disable} className="block w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed">SIGN UP</button>
          </form>
        </div>
        <p className="error-message text-red-600">{this.state.error}</p>
      </div>
    );
  }
}
