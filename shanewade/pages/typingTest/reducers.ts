// APP_STATE
// wordMap: defaultWordMap,
// inProgress: false,
// wordKey: Object.keys(defaultWordMap)[0],
// index: 0,
// correct: 0,
// incorrect: 0,

import type {AppState} from './index'

export type Reducer = (arg0: AppState) => AppState

export function correctWordUpdate(key: string, index: number): Reducer {
    return (state) => {
        // the specified input was correct
        const next_key = Object.keys(state.wordMap)[index + 1]

        return {
            ...state,
            wordMap: {
                ...state.wordMap,
                [key]: {
                    ...state.wordMap[key],
                    status: 'correct'
                },
                [next_key]: {
                    ...state.wordMap[next_key],
                    status: 'selected'
                }
            },
            wordKey: next_key,
            index: (index + 1),
            correct: (state.correct + 1)
        }
    }
}

export function incorrectWordUpdate(key: string, index: number): Reducer {
    return (state) => {
        // the specified input was correct
        const next_key = Object.keys(state.wordMap)[index + 1]

        return {
            ...state,
            wordMap: {
                ...state.wordMap,
                [key]: {
                    ...state.wordMap[key],
                    status: 'incorrect'
                },
                [next_key]: {
                    ...state.wordMap[next_key],
                    status: 'selected'
                }
            },
            wordKey: next_key,
            index: (index + 1),
            incorrect: (state.incorrect + 1)
        }
    }
}