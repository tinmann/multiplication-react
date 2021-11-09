class GameApiClient {
    static SERVER_URL = 'http://localhost:8081';
    static GET_LEADERBOARD = '/leaders';

    static leaderboard(): Promise<Response> {
        return fetch(GameApiClient.SERVER_URL + GameApiClient.GET_LEADERBOARD);
    }
}

export default GameApiClient;