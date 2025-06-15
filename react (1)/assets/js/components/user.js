class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: '' // Limpia el error al cambiar cualquier campo
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    // Validación de campos requeridos
    if (!email || !password) {
      this.setState({ error: 'Todos los campos son requeridos' });
      return;
    }

    // --- Validación de Correo Electrónico ---
    // Esta regex es un estándar para verificar el formato básico de un email.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      this.setState({ error: 'Por favor, introduce un correo electrónico válidos.' });
      return;
    }

    // --- Validaciones de Contraseña ---
    // 1. Longitud mínima de 8 caracteres
    if (password.length < 8) {
      this.setState({ error: 'La contraseña debe tener al menos 8 caracteres.' });
      return;
    }

    // 2. Al menos 2 números
    const numbersInPassword = (password.match(/\d/g) || []).length;
    if (numbersInPassword < 2) {
      this.setState({ error: 'La contraseña debe contener al menos 2 números.' });
      return;
    }

    // 3. Al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      this.setState({ error: 'La contraseña debe contener al menos una letra mayúscula.' });
      return;
    }

    // Si todas las validaciones pasan
    console.log('Datos enviados:', {
      email: email,
      password: password
    });

    // Aquí normalmente harías una petición HTTP a tu backend
    alert(`Bienvenido, ${email}`);
  }

  render() {
    return (
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {this.state.error && <div className="error">{this.state.error}</div>}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Correo electrónico:</label>
            <input
              type="text" // 'type="email"' ya ofrece una validación básica del navegador.
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="pedrito.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit">Ingresar</button>
        </form>

      </div>
    );
  }
}

// Renderizar la aplicación
const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(<User />);