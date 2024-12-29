import axios from 'axios';

const baseUrl = 'http://localhost:3000'
// Configuração do Axios
const axiosInstance = axios.create({
    baseURL: baseUrl,  // Defina seu endpoint base
});

// Interceptor para checar a validade do token e renovar, se necessário
axiosInstance.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('accessToken');

        // Se o token de acesso não existir ou tiver expirado, renova
        if (!token || tokenIsExpired(token)) {
            await refreshAccessToken();  // Tenta renovar o token
            token = localStorage.getItem('accessToken');  // Pega o novo token
        }

        // Adiciona o token ao cabeçalho da requisição
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Função para verificar se o token de acesso expirou
const tokenIsExpired = (token) => {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT
    const expiryDate = new Date(payload.exp * 1000);  // Converte para data

    return expiryDate < new Date();  // Verifica se já expirou
};

// Função de renovação de token
/*const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.log('Não há refresh token disponível!');
        return;
    }

    try {
        const response = await axios.post(`${baseUrl}/refresh-token`, { refreshToken });
        const { token } = response.data;  // O novo access token

        // Armazene o novo access token
        localStorage.setItem('accessToken', token);

        console.log('Token de acesso renovado com sucesso!');
    } catch (error) {
        console.error('Erro ao renovar token:', error);
    }
};*/

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.log('Não há refresh token disponível!');
        return;
    }

    try {
        const response = await axios.post(`${baseUrl}/refresh-token`, { refreshToken });
        const { token } = response.data;  // O novo access token

        // Armazene o novo access token
        localStorage.setItem('accessToken', token);

        console.log('Token de acesso renovado com sucesso!');
    } catch (error) {
        console.error('Erro ao renovar token:', error);
    }
};


export default axiosInstance;