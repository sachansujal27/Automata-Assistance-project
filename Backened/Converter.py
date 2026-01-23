import numpy as np
from collections import deque

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

    # 🔹 NEW METHOD: Convert NFA to DFA
    def to_dfa(self):
        dfa_states = []
        dfa_transitions = {}
        dfa_final_states = []

        start = frozenset([self.start_state])
        queue = deque([start])
        visited = set([start])

        while queue:
            current = queue.popleft()
            dfa_states.append(current)

            for symbol in self.alphabet:
                next_state = set()
                for state in current:
                    next_state |= self.transition[state][symbol]

                next_state = frozenset(next_state)
                dfa_transitions[(current, symbol)] = next_state

                if next_state not in visited:
                    visited.add(next_state)
                    queue.append(next_state)

        # DFA final states
        for state_set in dfa_states:
            if any(s in self.final_states for s in state_set):
                dfa_final_states.append(state_set)

        return dfa_states, dfa_transitions, start, dfa_final_states


# ---------------- EXAMPLE ----------------

states = {0, 1, 2}
alphabet = {'a', 'b'}
start_state = 0
final_states = {2}

nfa = NFA(states, alphabet, start_state, final_states)

nfa.add_transition(0, 'a', 0)
nfa.add_transition(0, 'a', 1)
nfa.add_transition(0, 'b', 0)
nfa.add_transition(1, 'b', 2)

dfa_states, dfa_transitions, dfa_start, dfa_finals = nfa.to_dfa()

print("DFA States:")
for s in dfa_states:
    print(s)

print("\nDFA Transitions:")
for k, v in dfa_transitions.items():
    print(k, "->", v)

print("\nDFA Start State:", dfa_start)
print("DFA Final States:", dfa_finals)
