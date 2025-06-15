class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      age: '',
      birthDate: '',
      acceptTerms: false,
      gender: '',
      favoriteColor: 'blue', // Valor por defecto
      comments: '',
      searchQuery: '',
      phoneNumber: '',
      website: '',
      favoriteTime: '',
      birthMonth: '',
      startWeek: '',
      volume: '50', // Valor inicial para range
      selectedColor: '#000000', // Valor inicial para color
      hiddenValue: 'secret123',
      profilePicture: null, // Para manejar el archivo

      // --- Nuevos estados para los mensajes de error específicos ---
      usernameError: '',
      emailError: '',
      passwordError: '',
      ageError: '',
      birthDateError: '',
      acceptTermsError: '',
      genderError: '',
      favoriteColorError: '',
      commentsError: '',
      searchQueryError: '',
      phoneNumberError: '',
      websiteError: '',
      favoriteTimeError: '',
      birthMonthError: '',
      startWeekError: '',
      volumeError: '',
      selectedColorError: '',
      // No necesitas un error para hiddenValue
      // Para profilePictureError, se manejaría de forma diferente, quizás en el handleChange o submit si hay un archivo.

      // Error general para campos obligatorios o validaciones iniciales
      generalError: '',
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Manejo especial para checkboxes
    if (type === 'checkbox') {
      this.setState({
        [name]: checked,
        error: ''
      });
    } else {
      this.setState({
        [name]: value,
        error: ''
      });
    }
  }

handleSubmit = (e) => {
  e.preventDefault();

  // --- Limpiar todos los errores al inicio ---
  this.setState({
    usernameError: '',
    emailError: '',
    passwordError: '',
    ageError: '',
    birthDateError: '',
    acceptTermsError: '',
    genderError: '',
    favoriteColorError: '',
    commentsError: '',
    searchQueryError: '',
    phoneNumberError: '',
    websiteError: '',
    favoriteTimeError: '',
    birthMonthError: '',
    startWeekError: '',
    volumeError: '',
    selectedColorError: '',
    generalError: '', // Limpiar el error general también
  });

  const {
    email, password, username, age, birthDate, acceptTerms, gender, favoriteColor, comments,
    searchQuery, phoneNumber, website, favoriteTime, birthMonth, startWeek, volume, selectedColor, hiddenValue,
  } = this.state;

  let isValid = true; // Una bandera para verificar si todo es válido

  // --- 1. Validaciones de Campos Requeridos Generales ---
  // (Puedes combinar estas en un solo chequeo o tenerlas individualmente)
  if (!username) { this.setState({ usernameError: 'El nombre de usuario es obligatorio.' }); isValid = false; }
  if (!email) { this.setState({ emailError: 'El correo electrónico es obligatorio.' }); isValid = false; }
  if (!password) { this.setState({ passwordError: 'La contraseña es obligatoria.' }); isValid = false; }
  if (!age) { this.setState({ ageError: 'La edad es obligatoria.' }); isValid = false; }
  if (!birthDate) { this.setState({ birthDateError: 'La fecha de nacimiento es obligatoria.' }); isValid = false; }
  if (!gender) { this.setState({ genderError: 'Por favor, selecciona tu género.' }); isValid = false; }
  if (favoriteColor === 'blue' || favoriteColor === '') { // Si 'blue' es el valor por defecto que no quieres que se envíe
    this.setState({ favoriteColorError: 'Por favor, selecciona un color favorito.' }); isValid = false;
  }
  if (!comments) { this.setState({ commentsError: 'Los comentarios son obligatorios.' }); isValid = false; }
  if (!phoneNumber) { this.setState({ phoneNumberError: 'El número de teléfono es obligatorio.' }); isValid = false; }
  if (!website) { this.setState({ websiteError: 'La URL del sitio web es obligatoria.' }); isValid = false; }
  if (!favoriteTime) { this.setState({ favoriteTimeError: 'La hora favorita es obligatoria.' }); isValid = false; }
  if (!birthMonth) { this.setState({ birthMonthError: 'El mes y año de nacimiento es obligatorio.' }); isValid = false; }
  if (!startWeek) { this.setState({ startWeekError: 'La semana de inicio es obligatoria.' }); isValid = false; }


  // --- 2. Validaciones Específicas por Tipo de Campo ---

  // Validación para 'username' (ejemplo: longitud mínima)
  if (username && username.length < 3) {
    this.setState({ usernameError: 'El nombre de usuario debe tener al menos 3 caracteres.' });
    isValid = false;
  }

  // Validación de Correo Electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email && !emailRegex.test(email)) {
    this.setState({ emailError: 'Por favor, introduce un correo electrónico válido.' });
    isValid = false;
  }

  // Validaciones de Contraseña
  if (password) {
    if (password.length < 8) {
      this.setState({ passwordError: 'La contraseña debe tener al menos 8 caracteres.' });
      isValid = false;
    }
    const numbersInPassword = (password.match(/\d/g) || []).length;
    if (numbersInPassword < 2) {
      this.setState({ passwordError: 'La contraseña debe contener al menos 2 números.' });
      isValid = false;
    }
    if (!/[A-Z]/.test(password)) {
      this.setState({ passwordError: 'La contraseña debe contener al menos una letra mayúscula.' });
      isValid = false;
    }
  }

  // Validación para el campo 'age' (edad numérica positiva)
  const parsedAge = parseInt(age);
  if (age && (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120)) {
    this.setState({ ageError: 'La edad debe ser un número positivo entre 1 y 120.' });
    isValid = false;
  }

  // Validación para 'birthDate' (asegura que la fecha no sea en el futuro)
  if (birthDate && new Date(birthDate) > new Date()) {
    this.setState({ birthDateError: 'La fecha de nacimiento no puede ser en el futuro.' });
    isValid = false;
  }

  // Validación para el checkbox 'acceptTerms'
  if (!acceptTerms) {
    this.setState({ acceptTermsError: 'Debes aceptar los términos y condiciones para continuar.' });
    isValid = false;
  }

  // Validación para 'comments' (ejemplo: longitud mínima/máxima)
  if (comments && (comments.length < 10 || comments.length > 200)) {
    this.setState({ commentsError: 'Los comentarios deben tener entre 10 y 200 caracteres.' });
    isValid = false;
  }

  // Validación para 'searchQuery' (ejemplo: no puede estar vacío si es obligatorio)
  if (searchQuery && !searchQuery.trim()) {
    this.setState({ searchQueryError: 'La consulta de búsqueda no puede estar vacía.' });
    isValid = false;
  }

  // Validación para 'phoneNumber' (formato específico, e.g., 10 dígitos)
  const phoneRegex = /^\d{10}$/; // Ejemplo: solo 10 dígitos numéricos
  if (phoneNumber && !phoneRegex.test(phoneNumber)) {
    this.setState({ phoneNumberError: 'Por favor, introduce un número de teléfono válido (10 dígitos).' });
    isValid = false;
  }

  // Validación para 'website' (formato de URL)
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (website && !urlRegex.test(website)) {
    this.setState({ websiteError: 'Por favor, introduce una URL de sitio web válida (ej: https://ejemplo.com).' });
    isValid = false;
  }

  // Validación para 'volume' (ejemplo: que esté dentro de un rango aceptable)
  const parsedVolume = parseInt(volume);
  if (volume && (isNaN(parsedVolume) || parsedVolume < 0 || parsedVolume > 100)) {
    this.setState({ volumeError: 'El volumen debe ser un número entre 0 y 100.' });
    isValid = false;
  }

  // Validación para 'selectedColor' (ejemplo: que no sea el color inicial si es un placeholder)
  if (selectedColor === '#000000') {
    this.setState({ selectedColorError: 'Por favor, selecciona un color diferente al predeterminado.' });
    isValid = false;
  }


  // Si alguna validación falló, detén el envío del formulario
  if (!isValid) {
    this.setState({ generalError: 'Por favor, corrige los errores en el formulario.' });
    return;
  }

  // Si todas las validaciones pasan
  console.log('Datos enviados:', {
    email, password, username, age: parseInt(age), birthDate, acceptTerms, gender, favoriteColor, comments,
    searchQuery, phoneNumber, website, favoriteTime, birthMonth, startWeek, volume: parseInt(volume), selectedColor, hiddenValue
  });
  alert(`¡Formulario enviado con éxito, ${username}!`);
};

  render() {
  return (
    <div className="login-container" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Formulario de Registro de Usuario</h2>

      {/* Error general del formulario */}
      {this.state.generalError && <div className="error" style={{ color: 'red', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>{this.state.generalError}</div>}

      <form onSubmit={this.handleSubmit}>

        {/* Campo de Texto (Username) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="tu_usuario"
            // Estilo condicional para el borde del input si hay error
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.usernameError ? 'red' : '#ddd'}`, // Borde rojo si hay error
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {/* Mostrar mensaje de error específico para username */}
          {this.state.usernameError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.usernameError}</div>}
        </div>

        {/* Campo de Correo Electrónico */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo electrónico:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="tu@email.com"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.emailError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.emailError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.emailError}</div>}
        </div>

        {/* Campo de Contraseña */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.passwordError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.passwordError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.passwordError}</div>}
        </div>

        {/* Campo Numérico (Age) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="age" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Edad:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
            placeholder="Ej: 30"
            min="1"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.ageError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.ageError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.ageError}</div>}
        </div>

        {/* Campo de Fecha (Birth Date) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="birthDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={this.state.birthDate}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.birthDateError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.birthDateError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.birthDateError}</div>}
        </div>

        {/* Checkbox (Accept Terms) */}
        <div className="form-group checkbox-group" style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={this.state.acceptTerms}
            onChange={this.handleChange}
            style={{ marginRight: '10px', border: `1px solid ${this.state.acceptTermsError ? 'red' : '#ddd'}` }}
          />
          <label htmlFor="acceptTerms" style={{ fontWeight: 'bold' }}>Acepto los términos y condiciones</label>
          {this.state.acceptTermsError && <div style={{ color: 'red', fontSize: '0.85em', marginLeft: '10px' }}>{this.state.acceptTermsError}</div>}
        </div>

        {/* Radio Buttons (Gender) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Género:</label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div>
              <input type="radio" id="genderMale" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange} />
              <label htmlFor="genderMale">Masculino</label>
            </div>
            <div>
              <input type="radio" id="genderFemale" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange} />
              <label htmlFor="genderFemale">Femenino</label>
            </div>
            <div>
              <input type="radio" id="genderOther" name="gender" value="other" checked={this.state.gender === 'other'} onChange={this.handleChange} />
              <label htmlFor="genderOther">Otro</label>
            </div>
          </div>
          {this.state.genderError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.genderError}</div>}
        </div>

        {/* Select (Dropdown - Favorite Color) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="favoriteColor" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Color Favorito:</label>
          <select
            id="favoriteColor"
            name="favoriteColor"
            value={this.state.favoriteColor}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.favoriteColorError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">-- Selecciona un color --</option> {/* Opción para forzar selección */}
            <option value="red">Rojo</option>
            <option value="blue">Azul</option>
            <option value="green">Verde</option>
            <option value="yellow">Amarillo</option>
          </select>
          {this.state.favoriteColorError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.favoriteColorError}</div>}
        </div>

        {/* Textarea (Comments) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="comments" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Comentarios:</label>
          <textarea
            id="comments"
            name="comments"
            value={this.state.comments}
            onChange={this.handleChange}
            placeholder="Escribe tus comentarios aquí..."
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.commentsError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          ></textarea>
          {this.state.commentsError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.commentsError}</div>}
        </div>

        ---

        <h3>Tipos de Input HTML5 Adicionales</h3>

        {/* Campo de Búsqueda */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="searchQuery" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Consulta de Búsqueda:</label>
          <input
            type="search"
            id="searchQuery"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
            placeholder="Introduce término de búsqueda"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.searchQueryError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.searchQueryError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.searchQueryError}</div>}
        </div>

        {/* Campo de Teléfono */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Número de Teléfono:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            placeholder="ej: 123-456-7890"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.phoneNumberError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.phoneNumberError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.phoneNumberError}</div>}
        </div>

        {/* Campo de URL */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="website" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>URL del Sitio Web:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={this.state.website}
            onChange={this.handleChange}
            placeholder="https://ejemplo.com"
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.websiteError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.websiteError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.websiteError}</div>}
        </div>

        {/* Campo de Hora */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="favoriteTime" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hora Favorita:</label>
          <input
            type="time"
            id="favoriteTime"
            name="favoriteTime"
            value={this.state.favoriteTime}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.favoriteTimeError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.favoriteTimeError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.favoriteTimeError}</div>}
        </div>

        {/* Campo de Mes */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="birthMonth" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mes y Año de Nacimiento:</label>
          <input
            type="month"
            id="birthMonth"
            name="birthMonth"
            value={this.state.birthMonth}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.birthMonthError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.birthMonthError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.birthMonthError}</div>}
        </div>

        {/* Campo de Semana */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="startWeek" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Semana de Inicio:</label>
          <input
            type="week"
            id="startWeek"
            name="startWeek"
            value={this.state.startWeek}
            onChange={this.handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${this.state.startWeekError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.startWeekError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.startWeekError}</div>}
        </div>

        {/* Campo de Rango (Volumen) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="volume" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Volumen: {this.state.volume}</label>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="100"
            value={this.state.volume}
            onChange={this.handleChange}
            style={{
              width: '100%',
              border: `1px solid ${this.state.volumeError ? 'red' : 'transparent'}` // Range inputs are tricky with borders
            }}
          />
          {this.state.volumeError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.volumeError}</div>}
        </div>

        {/* Campo de Color */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="selectedColor" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Selecciona un Color:</label>
          <input
            type="color"
            id="selectedColor"
            name="selectedColor"
            value={this.state.selectedColor}
            onChange={this.handleChange}
            style={{
              width: '100%',
              height: '40px',
              border: `1px solid ${this.state.selectedColorError ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {this.state.selectedColorError && <div style={{ color: 'red', fontSize: '0.85em', marginTop: '5px' }}>{this.state.selectedColorError}</div>}
        </div>

        {/* Input Oculto (para datos no visibles al usuario) */}
        <input
          type="hidden"
          name="hiddenValue"
          value={this.state.hiddenValue}
        />

        {/* Campo de Archivo (no usa la prop 'value' directamente) */}
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="profilePicture" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subir Imagen de Perfil:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={this.handleChange} // Necesitarás manejar esto en handleChange si quieres acceder al archivo antes de submit
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
          />
          {/* Si quieres validar el tipo/tamaño del archivo, necesitarás un estado de error para 'profilePictureError' y manejarlo en handleChange o handleSubmit */}
        </div>

        {/* Botones - type="button", type="submit", type="reset", type="image" */}
        <div className="form-group" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => alert('¡Botón personalizado clickeado!')}
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Botón Personalizado
          </button>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Registrarse
          </button>
          <button
            type="reset"
            onClick={() => this.setState({
              email: '', password: '', username: '', age: '', birthDate: '',
              acceptTerms: false, gender: '', favoriteColor: 'blue', comments: '',
              searchQuery: '', phoneNumber: '', website: '', favoriteTime: '',
              birthMonth: '', startWeek: '', volume: '50', selectedColor: '#000000',
              hiddenValue: 'secret123',
              profilePicture: null, // Resetear también el archivo
              // --- Limpiar también todos los errores al resetear ---
              usernameError: '', emailError: '', passwordError: '', ageError: '', birthDateError: '',
              acceptTermsError: '', genderError: '', favoriteColorError: '', commentsError: '',
              searchQueryError: '', phoneNumberError: '', websiteError: '', favoriteTimeError: '',
              birthMonthError: '', startWeekError: '', volumeError: '', selectedColorError: '',
              generalError: '',
            })}
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Restablecer Formulario
          </button>
          {/* Imagen como botón de envío (requiere un 'src') */}
          <input
            type="image"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIVFhUXFRcVFxYYFhUYFRUWFxUXFxgYFxcYHSggGBolGxUYITEhJSorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mICYvLS8rMS0tLS0tLS0tLS0tLTUtLS8tLS0tLS0tLS0tLS0tLS4tLS0tLS0uLS0tLS0tLf/AABEIALwBDAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgcBAAj/xABGEAACAAMEBgcFBQYFAwUAAAABAgADEQQSITEFBkFRYXETIjKBkaGxB0JSwdEjYnKC8BRDkqKy4RUzY8LxZNLiFiRTk6P/xAAaAQACAwEBAAAAAAAAAAAAAAACBAEDBQAG/8QAMREAAgIBBAAEAwcEAwAAAAAAAAECAxEEEiExE0FRYQUigTJxkaGx8PEUI8HhJELR/9oADAMBAAIRAxEAPwDjIiQjxYmI1Cs+AiQEeqImBEZIwRCxILE1WJhYjcdtKgkSCRcEiQSI3E7CkS4+6OChLgzRuiZ09rsmUzmtMB1QfvMeqveRAytUVlsnwxT0cfdHHVtX/ZguDWx73+lLJC/mmYE8lpzMPdM+zixThWWpkPSlZfZNPilnA91Cd8Zs/jOnjPblv3XRb/Syxk4Z0cfdHHRZvsunqaNaZFK9U0mXm/Jdw5AmEmtGqM2xXC5Do+AcAgBhjdIqaGmI347ocr11Nj2xlllUqWvIyvRx90cF9HHvRwypFLiB9HH3RwX0cedHBpgME6OPujgro4+6OJK3IFuR90cFdHH1yCA3glyPrkFFIjcjjt4Pcjy5BNyPCkcTvByseXYvKRG7HBKRTSPKRaViJEcSmV0jyJkRExwR5HkemPI4JFaiLFEQWLVEUsZweqItURFBFyiAbCUT5Vi0LGi1P1TmW164pIQ/aTaeKp8T+QrjsB2GifZegN60zi2P+XKwHJpjYnuA5wlfrqaXiT5Lo1N9HMZcokhQCWOAABJJ3ADExrdC+zy2z6FkEhDtmYNThLHWrwa7HV9F6Ms1lFJElJeGLDFyPvOase8x5aLeWwGC+ZjIt+LzlxVHHu//AD+S5U47MzYNRrDZ8ZlbRMGd/CUDt6i4EcGLQ4skysxFACqKhVUBVAoclGAimfNrgMvWElt0uVako0I97DwH1hT+7e/meX7kuUYLJu5k9JY6xod23wgB9Iu5pLF0fEc/oIxH+LTsywPMDGLhrDPAorKo4KvzrHR0Ml6C8tXE29ls4BqSSdrHM/2gXTr2ebKeTN66sKELiQdjA5Ag490Ym0aXtDjGa1N1FA8AIolTrQ/ZZjxqAIbq0so855Frdcl0gQak/wDUf/l/5xMai/8AVD/6j/3wxSyzj2prDkzH6Rclkpm8xubH5Q//AFFy7l+Qk9TkUzNQ6AsbUoUCpJl0AAzJN+MnaJKhiEa8oODXbt7jdqaR0+zWdaGoBBwxxrzrAtq0DZXzlqp3qbvkMPKHaLZNZmUvUrOGc26OPOjjZ2nVJP3c6nB6HzFPSFFp1fnJkFf8DqfI0J8IbjOLBdsX0xFcj65BkyQVJVgVYGgBBBB3EHERC5FyAcgUy48MuC7kRKRIO8EuREpBZSK2WOCUwUpESsEssVsscWKQOwisiCGWKmEcWplJEQMWsIraOLEQMRiRiBjixHyiLlEVLF6CFmxyKLEEbPUPUiZbW6R6pZlPWfIzCM1l/NtmWeQOoGrv7ba1lsD0SDpJxFR1BktRkWag30vEZR3HSM4SpQSUoVQAihQAqgCgoBkNgjI+Ia11fJD7T/IZqryDS1lhpdmkKFlS6dVcB1caePmYOtD4+sLdDLS852Cg78flFdrtJbAZeseblmT5HcJcHlrtN7AZesCzptBQd8Z3WfWDonFnlGs09ZzslLmPzHdsGO6MvbtY7Qw6MPzN1anhgI0KNBZOKl0mJ36qEHtNTpLSF6qocNp38BwhO1qljC8Cdwx9MozzBmxmOabi2H0EXrMlqM+5R88o1YaaNawjLsvc3ljR7cNgJ8o8DzDuX1hadJU7CgcTiYHmW129492HpBqr2KXIczGVcWap4nHuEQ0RpMy5hLHqMetw3EcvSEyyyeESZQuJPyiVHDK5x3rDOjVwrsitpm6MCmlpwAUTGAGAG4esSGlZpzZj+ZoNwkI/0r9TbtLBzEUTJIG0d8ZD9rrmW74kk+VtYV3UPzEFVGbeEDKjCzn8jY2GxmaaBkUDNiwoOQriY1Gj7JZ5OIZS3xEgnu3d0cvl2yWMnXxEHSNIr8YHEN9DDctPu/7A12eFzsyzeaasVktIpNpeAwdah15EDEcDURz/AEzq80kko3Sy/iAIYfiU+o8oaSrTM912I51HnBEu1TtrDvA+UTXVOvp8Ez1XidxMTdjwpGj0rYkNG6qMTQkAheZGPiPOE9pszIbrChz4EbCDkRxhlPIO4BKxW6wUVit1gglIEKxWywUyxUyxxbGQKwiphBTrFLLHF8ZAzCKmEXsIqYRBfFlDRWYsaKjHF8S1BF6RRLghVqKQpIegjvXs10B+y2MFxSbOpNmbwKfZp3Kakb2aNBaaGoOVPKKdCWrpLJZ5m15EpvFFJ84V6zWe1uOjlSmEsjrPUdb7uBqBv38s/MTi7LHntvkcT2rIh0prhKk1liXMdanri6FY8DWuQ3Qjtmv7XW6OzhTQ0ZnrQ0wN0KK8qwyOrMxgVcpTaCSflFdh9mnSNQ2mik0oJdSB+It8ocr0+ljzJfqUTlqH1/g59ZrQavMdiXfNjmSTUmu+LAX9wovG8C3p8o2umvZda5QPQlLQm5epMp+FjQ9zE8IwFtsk2S5lzJbq/wADIysRvukVpGpGUJ8xZmzrknyi86NdsWYHvJ+UfGyXM5oHClfKseWSzTzlImc6Ff6qCDJerc+Yfdl1zLEFhyC1BPfEltPDZ2yT8hVN0iFN0dbecvLGJrpJvduDmDXxrSHFo1JVZd5ZrFh2iVF2m8Ln5wjn6EnLkA44HHwPyrBf25LhnSrSLHts7lyAP1itLe3vY9wrFCSJoyRx+VvmIKlpNPalE9tPIxDil6AuHsXy7TXKkWCfwgedZCqGYZbgDAkDs86YDvgL/EKe6SN9cYFQ3dFTq9hsJ43RGYynPDjC9LbLObFea/MVgmXLDdl1PIxOzHYDht7CLJZA+bqo8T3CHFmschPvHe2PlSkI1kMIkk5hkT+uEXwkhe2Ep9SNUlrUZNTxi9NJjaQfERlUt52gHyi9LYp4c4tUkxR6eUTQW22I6gKca1p3GJ2K0Iw6GeKp7rbZZ4HYISS3ByIPKCQ0HhNYAacWFaW0I8rrDrJ8Q2fiGznlCh0jVaE0qAOimHqnBSdnA8P1y80loNWJu9Vv5T3bO6IU2niQWM8oyDLFLLDK2WN5Zo603HYeRgJxFgUWCOsUOIMcQO4ji+DBHEUOIKcQPMEcNQYM8UmL3gcxA1EIlwSkDSoPsMtWdFfBS6qx3KWAY+FYSmzRrR+jNS7IZdhsqN2hJlg7wSoNO6tO6HzNdamw09IpslBwC+AAhJpvWRJTBmMsKTdAZgrHOhFfpHn8OcngPPPJop9nU9pQeYBjDazayCxlHlKqqzFWDVFcK4E9k4GNJYNOy5ouAkMcgdo4HIwn09oeVaVMmcl5b1RiQVIyKkYg0MFBJS+fosinhleitcJc/suK7VDYjjTaOUMLcQ0y4wDC7kQCK1O/hHHOtYdXp1gtCrKJNWvSpuFSBsb7uFAXjSNBo20vMSXOmAK11LwBqL10AgE7MzF9tUYJSi8plcJ7201hl1o0DIb3Lv4TTyy8oWzdWTX7OZ3MPmPpGubonJZSKqa8ePy5RUrGugnFGGtdheUbrgVIrgagjL5QmGiqzRTsHE8KbO/8AWUdA1jst9AdoNPH/AI84zVoklUNO0Ot3jPyrDELuEU+Dl8iTWmwUCzlGHYfn7p8MO4QiskoTGuh0DbiSCeWGMa/SNtT9knu2QlnA/Fkv8xWMA7S7PMlvNS/LYkEnEqcCGpk23CGqVuWCmz5Z8dM2ugtFFC1WqGAHZNKjKprxIgXTWoUubVpYEt969knihw8KQ21Ttj2uzGbeuhZpWXezdVVesaZYkgco1kiyk4nDhCsrZVzfPIxGuMon5907qxabKazJZuE0DrihTduHhCEj0m/vIDywsE/KqCJgpy5RjF7OOUMZT8hJtpfbLZdq07COdKeIgySSNvwg22FsmYy307o0ujrA7Yt7QoyRSp2v3Q1l0WzS5dEFAoAA2AARh6hS7+Jb2NfR6Z4dZOTpDV97QYwMv1Gz0jU6Ls4lg0yUoTw2nvjVWCykyV/2j84HtnR4Y0p+UeTVUu/i7xJ9E9O2eE+Rzd20G+gWJm9WkYg5xqtLqPjPksZg3E0PlGO0rrA+vSS2+9T70vFf9Qd/MecW43Ie/wAlv09Xk5Z1WlXlYd4Pyiw0rK2wDziC9FojfA/0H1g1NmtBwoK98a0kcx10xR5e0gI0+idHzJb3bSlJmEih91Nrb3dwwg5ugwV602I+2gA7q8fQxRpaU/hA/y0+hjpbX7Qv3eRzN39v/k577V60tFqF8pZ7XlA/4eYlT/8Acg8eJjMW4u8fSN77WNCmU+3yT7rA+mQ/mAjly3hXjSod4jR0j5Ucl6mE8b/AKyR5e0YmKpm0U+kP/Z"
            alt="Enviar"
            style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
          />
        </div>

        {/* Este botón de "Registrarse" es duplicado, puedes eliminarlo si ya tienes el anterior */}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
  }
}

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginForm />);