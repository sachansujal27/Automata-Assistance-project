import numpy as np
from itertools import combinations

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

    def minimize(self):
        # Step 1: Create distinguishability table
        n = len(self.states)
        table = {}
        state_pairs = list(combinations(self.states, 2))

        # Initialize: mark pairs where one is final and other is not
        for (s1, s2) in state_pairs:
            table[(s1, s2)] = (s1 in self.accept_states) != (s2 in self.accept_states)

        changed = True
        while changed:
            changed = False
            for (s1, s2) in state_pairs:
                if table[(s1, s2)]:
                    continue
                for a in self.alphabet:
                    t1 = self.transitions.get(s1, {}).get(a)
                    t2 = self.transitions.get(s2, {}).get(a)
                    if t1 == t2:
                        continue
                    key = tuple(sorted((t1, t2)))
                    if key in table and table[key]:
                        table[(s1, s2)] = True
                        changed = True
                        break

        # Step 2: Merge equivalent states
        groups = []
        for s in self.states:
            found = False
            for group in groups:
                if not table.get(tuple(sorted((s, group[0]))), False):
                    group.append(s)
                    found = True
                    break
            if not found:
                groups.append([s])

        # Step 3: Build new minimized DFA
        new_states = ['+'.join(group) for group in groups]
        new_start = next('+'.join(group) for group in groups if self.start_state in group)
        new_accept = [ '+'.join(group) for group in groups if any(s in self.accept_states for s in group)]
        new_transitions = {}

        for group in groups:
            rep = '+'.join(group)
            new_transitions[rep] = {}
            for a in self.alphabet:
                target = self.transitions.get(group[0], {}).get(a)
                if target is None:
                    continue
                # find the group containing target
                for g in groups:
                    if target in g:
                        new_transitions[rep][a] = '+'.join(g)
                        break

        return DFA(new_states, self.alphabet, new_transitions, new_start, new_accept)

# ------------------ Example Usage ------------------

if __name__ == "__main__":
    states = ["q0", "q1", "q2", "q3"]
    alphabet = ["0", "1"]

    transitions = {
        "q0": {"0": "q1", "1": "q0"},
        "q1": {"0": "q1", "1": "q2"},
        "q2": {"0": "q3", "1": "q0"},
        "q3": {"0": "q3", "1": "q3"},  # trap state
    }

    dfa = DFA(states, alphabet, transitions, "q0", ["q3"])

    print("Original DFA simulation for input '101':")
    path, accepted = dfa.simulate("101")
    print("Path:", " → ".join(path))
    print("Accepted:", accepted)

    # Minimize DFA
    min_dfa = dfa.minimize()
    print("\nMinimized DFA states:", min_dfa.states)
    print("Minimized DFA start state:", min_dfa.start_state)
    print("Minimized DFA accept states:", min_dfa.accept_states)
    print("Minimized DFA transitions:")
    for s, t in min_dfa.transitions.items():
        print(f" {s}: {t}")

    # Simulate minimized DFA
    path, accepted = min_dfa.simulate("101")
    print("\nMinimized DFA simulation for input '101':")
    print("Path:", " → ".join(path))
    print("Accepted:", accepted)
