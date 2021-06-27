import { useHistory, useParams } from 'react-router-dom';

import Modal from 'react-modal';

import logoSvg from '../assets/images/logo.svg';
import deleteSvg from '../assets/images/delete.svg';
import checkSvg from '../assets/images/check.svg';
import answerSvg from '../assets/images/answer.svg';
import emptyQuestionsSvg from '../assets/images/empty-questions.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss'
import { useState } from 'react';
import toast from 'react-hot-toast';

type RoomParams = {
  id: string,
}

Modal.setAppElement('#root');

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id
  const { questions, title } = useRoom(roomId)
  const history = useHistory()
  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>();
  const [closeRoomModalOpen, setcloseRoomModalOpen] = useState(false);

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    setQuestionIdModalOpen(undefined)
    toast.success('Pergunta excluída com sucesso')
  }

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    })

    toast.success('A Sala foi encerrada com sucesso, até mais! ;)')
    history.push('/')
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })

    toast.success('A pergunta foi sinalizada como respondida')
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true
    })

    toast.success('Você destacou esta pergunta com sucesso')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoSvg} alt="" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => setcloseRoomModalOpen(true)}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta(s)</span>
          )}
        </div>

        <div className="question-list">
          {questions.length > 0 ? (
            <>
              {questions.map(question => {
                return (
                  <Question
                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighLighted={question.isHighLighted}
                  >
                    {!question.isAnswered && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCheckQuestionAsAnswered(question.id)}
                        >
                          <img src={checkSvg} alt="Marcar pergunta como respondida" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleHighlightQuestion(question.id)}
                        >
                          <img src={answerSvg} alt="Dar destaque à pergunta" />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => setQuestionIdModalOpen(question.id)}
                    >
                      <img src={deleteSvg} alt="Remover pergunta" />
                    </button>

                  </Question>
                )
              })}
            </>
          ) : (
            <div className="question-list-empty">
              <img src={emptyQuestionsSvg} draggable="false" alt="Ilustração que representa lista de perguntas vazia" />
              <div className="list-empty__description">
                <h3>Nenhuma pergunta por aqui...</h3>
                <span>Envie o código desta sala para seus amigos e comece <br /> a responder perguntas!</span>
              </div>
            </div>
          )}

        </div>
        <Modal
          overlayClassName="modal-overlay"
          className="Modal"
          isOpen={!!questionIdModalOpen}
          onRequestClose={() => setQuestionIdModalOpen(undefined)}
        >

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.99988H5H21" stroke="#e73f5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#e73f5d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <h1>Excluir pergunta</h1>
          <p>Tem certeza que você deseja excluir esta pergunta?</p>
          <div className="modal-actions">
            <button
              className="secondary"
              onClick={() => setQuestionIdModalOpen(undefined)}
            >
              Cancelar
            </button>
            <button
              className="primary"
              onClick={() => handleDeleteQuestion(questionIdModalOpen || '')}
            >
              Sim, apagar
            </button>
          </div>
        </Modal>

        <Modal
          overlayClassName="modal-overlay"
          className="Modal"
          isOpen={closeRoomModalOpen}
          onRequestClose={() => setcloseRoomModalOpen(false)}
        >

          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.66 18.3398L18.34 29.6598" stroke="#E73F5D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M29.66 29.6598L18.34 18.3398" stroke="#E73F5D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 42V42C14.058 42 6 33.942 6 24V24C6 14.058 14.058 6 24 6V6C33.942 6 42 14.058 42 24V24C42 33.942 33.942 42 24 42Z" stroke="#E73F5D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>


          <h1>Encerrar sala</h1>
          <p>Tem certeza que você deseja encerrar esta sala?</p>
          <div className="modal-actions">
            <button
              className="secondary"
              onClick={() => setcloseRoomModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="primary"
              onClick={handleCloseRoom}
            >
              Sim, encerrar
            </button>
          </div>
        </Modal>
      </main>
    </div>
  )
}