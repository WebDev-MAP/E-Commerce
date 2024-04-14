// api.js

// Array zur Speicherung von Benutzerdaten im Arbeitsspeicher
const users = [];

const registerUser = async (userData) => {
  try {
    // Überprüfen, ob ein Benutzer mit derselben E-Mail-Adresse bereits vorhanden ist
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Diese E-Mail-Adresse ist bereits registriert');
    }

    // Benutzerdaten hinzufügen
    users.push(userData);

    return { success: true, message: 'Benutzer erfolgreich registriert' };
  } catch (error) {
    console.error('Fehler bei der Registrierung:', error.message);
    return { success: false, message: error.message };
  }
};

const loginUser = async (userData) => {
  try {
    // Benutzer in der Liste suchen
    const user = users.find(user => user.email === userData.email && user.password === userData.password);
    if (!user) {
      throw new Error('Benutzer nicht gefunden oder falsches Passwort');
    }

    return { success: true, message: 'Benutzer erfolgreich angemeldet' };
  } catch (error) {
    console.error('Fehler bei der Anmeldung:', error.message);
    return { success: false, message: error.message };
  }
};

export { registerUser, loginUser };


