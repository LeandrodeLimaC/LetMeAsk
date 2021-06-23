import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { firebase, auth } from './services/firebase'

import { BrowserRouter, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

import './styles/global.scss'

type User = {
  id: string;
  name: string;
  photo: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

function App() {
  const [user, setUser] = useState<User>()

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const { user } = await auth.signInWithPopup(provider);

    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error('Missing informations from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        photo: photoURL
      })
    }

  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
