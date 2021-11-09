import * as React from 'react';
import ApiClient from './services/ApiClient';
import GameApiClient from './services/GameApiClient';

class LeaderboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderboard: [],
            serverError: flase
        }
    }

    componentDidMount() {
        this.refreshLeaderboard();
        // set time interval to refreshLeaderboard every 5 seconds
        setInterval(this.refreshLeaderboard.bind(this), 5000);
    }

    getLeaderboardData(): Promise {
        return GameApiClient.leaderboard().then(
            lbRes => {
                if(lbRes.ok) {
                    return lbRes.json();
                } else {
                    return Promise.reject("Gamification: Error response");
                }
            }
        );
    }

    getUserAliasData(userIds: number[]): Promise {
        return ApiClient.getUsers(userIds).then(
            usRes => {
                if(usRes.ok) {
                    return usRes.json();
                } else {
                    return Promise.reject("Multiplication: error response");
                }
            }
        )
    }

    updateLeaderBoard(lb) {
        this.setState({
            leaderboard: lb,
            serverError: false
        });
    }

    refreshLeaderboard() {
        this.getLeaderboardData().then(
            lbData => {
                let userIds = lbData.map(row => row.userId);
                this.getUserAliasData(userIds).then(data => {
                    let userMap = new Map();
                    data.forEach(idAlias => {
                        userMap.set(idAlias.id, idAlias.alias);
                });

                lbData.forEach(row => 
                    row['alias'] = userMap.get(row.userId)
                    );
                this.updateLeaderBoard(lbData);
            }).catch(reason => {
                console.log('Error mapping user id', reason);
                this.updateLeaderBoard(lbData);
            });
    }
        ).catch(reason => {
            this.setState({serverError: true});
            console.log('Gamification server error', reason);
        });
    }

    render() {
        if(this.state.serverError) {
            return (
            <div>We're sprry, but we can't display game statistics at this moment.</div>
            );
        }
        return(
            <div>
                <h3>Leaderboard</h3>
                <table>
                    <thread>
                        <tr>
                            <th>User</th>
                            <th>Score</th>
                            <th>Badges</th>
                        </tr>
                    </thread>
                <tbody>
                {this.state.leaderboard.map(row => <tr key={row.userId}>
                    <td>{row.alias ? row.alias : row.userId}</td>
                    <td>{row.totalScore}</td>
                    <td>{row.badges.map(
                        b => <span className="badge" key={b}>{b}</span>)}
                    </td>
    
                </tr>)}
                </tbody>
                </table>
            </div>
        );
    }

}

export default LeaderBoardComponent;