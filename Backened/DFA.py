import numpy as np

class DFA:
    def __init__(self, states, alphabet, transitions, start_state, accept_states):
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.start_state = start_state
        self.accept_states = accept_states

    def simulate(self, input_string):
        current_state = self.start_state
        path = [current_state]

        for symbol in input_string:
            if symbol not in self.alphabet:
                return path, False

            if symbol not in self.transitions[current_state]:
                return path, False

            current_state = self.transitions[current_state][symbol]
            path.append(current_state)

        return path, current_state in self.accept_states

# Example DFA
if __name__ == "__main__":
    states = ["q0", "q1", "q2", "q3"]
    alphabet = ["0", "1"]

    transitions = {
        "q0": {"0": "q1", "1": "q0"},
        "q1": {"0": "q1", "1": "q2"},
        "q2": {"0": "q3", "1": "q0"},
        
    }

    dfa = DFA(states, alphabet, transitions, "q0", ["q3"])

    path, accepted = dfa.simulate("101")
    print("Path:", " → ".join(path))
    print("Accepted:", accepted)
