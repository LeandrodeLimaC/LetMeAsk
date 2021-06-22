import illustrationSvg from '../assets/images/illustration.svg';
import logoSvg from '../assets/images/logo.svg';
import googleIconSvg from '../assets/images/google-icon.svg';


export function Home() {
    return (
        <div>
            <aside>
                <img src={illustrationSvg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div>
                    <img src={logoSvg} alt="Logo LetMeAsk" />
                    <button>
                        <img src={googleIconSvg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div>Ou entre em uma sala</div>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <button type="submit">
                            Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}