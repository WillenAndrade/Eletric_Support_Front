import "./PrivacyPolicy.css"
import { Link } from "react-router-dom"

const PrivacyPolicy = () => {
    return(
        <>
           <div className="policyHeader">
           <Link to="/signup" className="get-start-btn-container">ES</Link>
           </div>
            <div className="generalPolicy">
            <h1>Política de Privacidade</h1>

            <h2>Informações que Coletamos</h2>
            <h3>Ao criar uma conta em nossa plataforma, coletamos as seguintes informações:</h3>
            <ul>
                <li><span>Nome ou Nome de Usuário:</span> Para identificar sua conta e personalizar sua experiência.</li>
                <li><span>Endereço de E-mail:</span> Para verificação da conta, comunicação e notificações sobre sua conta e projetos.</li>
                <li><span>Senha:</span> Para garantir a segurança da sua conta e permitir o acesso aos seus projetos pessoais.</li>
            </ul>

            <h2>Como Usamos Suas Informações</h2>
            <h3>Utilizamos as informações coletadas para os seguintes propósitos:</h3>
            <ul>
                <li><span>Gerenciamento de Conta:</span> Para criar e gerenciar seu perfil de usuário e projetos.</li>
                <li><span>Comunicação:</span> Para enviar informações essenciais sobre sua conta e atualizações.</li>
                <li><span>Segurança:</span> Para ajudar a proteger sua conta e evitar acessos não autorizados.</li>
            </ul>

            <h2>Como Protegemos Suas Informações</h2>
            <p>Levamos a segurança dos seus dados a sério. As informações pessoais fornecidas são armazenadas de forma segura e utilizamos práticas padrão da indústria para protegê-las, incluindo criptografia quando apropriado. No entanto, nenhuma transmissão de dados pela internet pode ser garantida como 100% segura.</p>

            <h2>Compartilhamento de Informações</h2>
            <h3>Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:</h3>
            <ul>
                <li><span>Fornecedores de Serviço:</span> Podemos compartilhar seus dados com fornecedores terceirizados confiáveis que nos auxiliam com serviços técnicos (ex.: hospedagem), mas eles não têm permissão para usar seus dados para outros fins.</li>
                <li><span>Requisitos Legais:</span> Podemos divulgar suas informações para cumprir obrigações legais ou solicitações de autoridades.</li>
            </ul>

            <h2>Seus Direitos</h2>
            <h3>Você tem os seguintes direitos em relação às suas informações pessoais:</h3>
            <ul>
                <li><span>Acesso:</span> Você pode solicitar acesso às informações pessoais que possuímos sobre você.</li>
                <li><span>Atualização/Correção:</span> Você pode atualizar ou corrigir qualquer informação fornecida.</li>
                <li><span>Exclusão da Conta:</span> Você pode solicitar a exclusão de sua conta e informações pessoais a qualquer momento, entrando em contato pelo e-mail Willen_Developer@outlook.com.</li>
            </ul>

            <h2>Cookies e Rastreamento</h2>
            <p>Não utilizamos cookies ou outras tecnologias de rastreamento para fins publicitários ou analíticos no momento. Caso passemos a utilizar cookies para esses propósitos, esta política será atualizada.</p>

            <h2>Alterações nesta Política</h2>
            <p>Podemos atualizar esta Política de Privacidade periodicamente. Quando isso ocorrer, atualizaremos a "Data de Vigência" no topo da página e notificaremos você, se necessário. Recomendamos revisar esta página periodicamente para se manter informado sobre como protegemos suas informações.</p>

            <h2>Contato</h2>
            <p>Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato pelo e-mail: Willen_Developer@outlook.com</p>
        </div>
        <Link className="link-to-signup" to="/signup">Entendi!</Link>
        </>
        
    )
}

export default PrivacyPolicy