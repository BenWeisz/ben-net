from typing import Callable, List
from enum import Enum

class StateMachine:
    """ A generic state machine. """

    def __init__(self, data_store, start_state, action_func: Callable, transition_func: Callable) -> None:
        self.data_store = data_store # Additional data to be saved and read after all actions are parsed
        self.curr_state = start_state # The current state of the state machine
        self.action_func = action_func # The function that generates the next state from the current state and an action
        self.transition_func = transition_func # The function that manipulates the data store based on the current state, action and the next state

    def progress_state(self, action) -> None:
        """ Take an action from the current state. """
        curr_state = self.curr_state
        next_state = self.action_func(curr_state, action)
        
        self.data_store = self.transition_func(curr_state, action, next_state, self.data_store)
        self.curr_state = next_state

    def get_data_store(self) -> None:
        """ Get the data_store. """
        return self.data_store
    
"""
    Post raw data parser state machine.
"""

class PostRawDataState(Enum):
    """ Enum representing the various states of the post raw data parser. """
    BLANK = 0
    SECTION = 1
    COMMENT = 2
    TEXT = 3
    LATEX = 4
    CODE_START = 5
    CODE_END = 6
    BULLETS = 7

def post_raw_data_transition_func(curr_state: PostRawDataState, action: str, next_state: PostRawDataState, data_store: List):
    """ Return an updated data_store based on the current transition. """
    if curr_state != PostRawDataState.TEXT and curr_state != PostRawDataState.BULLETS and curr_state != PostRawDataState.CODE_START:
        if next_state == PostRawDataState.SECTION:
            return data_store + [{ "type": "section", "content": action[1:-1] }]
        elif next_state == PostRawDataState.TEXT:
            return data_store + [{ "type": "text", "content": action + " " }]
        elif next_state == PostRawDataState.LATEX:
            return data_store + [{ "type": "latex", "content": action}]
        elif next_state == PostRawDataState.CODE_START:
            return data_store + [{ "type": "code", "content": action[3:] + "\n"}]
        elif next_state == PostRawDataState.BULLETS:
            return data_store + [{ "type": "bullets", "content": action[2:] + "\n"}]
        else:
            return data_store
    elif curr_state == PostRawDataState.TEXT:
        data_store[-1]["content"] += action + " "
        return data_store
    elif curr_state == PostRawDataState.BULLETS:
        data_store[-1]["content"] += action[2:] + "\n"
        return data_store
    elif curr_state == PostRawDataState.CODE_START:
        if next_state == PostRawDataState.CODE_START:
            data_store[-1]["content"] += action + "\n"
        return data_store

def post_raw_data_action_func(curr_state: PostRawDataState, action: str) -> PostRawDataState:
    """ Returns the next state from the curr_state, taking the action. """
    if curr_state != PostRawDataState.CODE_START:
        if action.startswith('-') and action.endswith('-'):
            return PostRawDataState.SECTION
        elif action.startswith('#'):
            return PostRawDataState.COMMENT
        elif action.startswith('$') and action.endswith('$'):
            return PostRawDataState.LATEX
        elif action.startswith('- '):
            return PostRawDataState.BULLETS
        elif action.startswith('```'):
            return PostRawDataState.CODE_START
        elif len(action) == 0:
            return PostRawDataState.BLANK
        else:
            return PostRawDataState.TEXT
    else: # CODE_START
        if action.startswith("```"):
            return PostRawDataState.CODE_END
        else:
            return PostRawDataState.CODE_START
        
class PostRawDataStateMachine(StateMachine):
    def __init__(self) -> None:
        super().__init__([], PostRawDataState.BLANK, post_raw_data_action_func, post_raw_data_transition_func)    