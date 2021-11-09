import * as React from "react";
class LastAttemptsComponent extends React.Component {
    render() {
        return (
            <table>
                <thread>
                    <tr>
                        <th>Challenge</th>
                        <th>Your Guess</th>
                        <th>Correct</th>
                    </tr>
                </thread>
                <tbody>
                    {this.props.lastAttempts.map(a =>
                        <tr key={a.id} style={{color: a.correct ? 'green':'red' }}>
                            <td>{a.factorA} X {a.factorB}</td>
                            <td>{a.resultAttempt}</td>
                            <td>{a.correct ? "Correct" : ("Incorrect (" + a.factorA * a.factorB + ")")}</td>
                        </tr>
                        )}
                </tbody>
            </table>
            
        );
    }
}
export default LastAttemptsComponent;