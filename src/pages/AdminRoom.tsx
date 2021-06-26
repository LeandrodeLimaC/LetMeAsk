import { useHistory, useParams } from 'react-router-dom';

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

type RoomParams = {
  id: string,
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id
  const { questions, title } = useRoom(roomId)
  const history = useHistory()

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    })

    history.push('/')
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoSvg} alt="" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleCloseRoom}>Encerrar sala</Button>
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
                      onClick={() => handleDeleteQuestion(question.id)}
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
      </main>
    </div>
  )
}