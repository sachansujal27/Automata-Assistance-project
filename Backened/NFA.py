import numpy as np

class NFA:
    def __init__(self, states, alphabet, start_state, final_states):
        self.states = states
        self.alphabet = alphabet
        self.start_state = start_state
        self.final_states = final_states

        # Transition table: state × symbol → set(states)
        self.transition = {
            state: {symbol: set() for symbol in alphabet}
            for state in states
        }

    def add_transition(self, from_state, symbol, to_state):
        self.transition[from_state][symbol].add(to_state)

    def simulate(self, input_string):
        current_states = {self.start_state}

        for symbol in input_string:
            next_states = set()
            for state in current_states:
                next_states |= self.transition[state].get(symbol, set())
            current_states = next_states

        return any(state in self.final_states for state in current_states)
