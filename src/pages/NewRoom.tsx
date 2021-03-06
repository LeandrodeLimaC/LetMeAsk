
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationSvg from '../assets/images/illustration.svg';
import logoSvg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast';

export function NewRoom() {
  const history = useHistory()
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return toast.error('A Sala precisa de um nome')
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    toast.success(`Bem vindo a sua sala ${newRoom}`)
    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img draggable="false" src={illustrationSvg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoSvg} alt="Logo LetMeAsk" />
          <h2> Criar uma nova sala </h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">
              Criar na sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}