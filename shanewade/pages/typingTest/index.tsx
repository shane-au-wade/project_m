import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import {
    Button,
    Text,
    InputGroup,
    Colors,
} from '@blueprintjs/core'
import { server } from '../config';

// Setup Blueprint
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
// Turn off focus styling for blueprint components
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import { createUseStyles } from 'react-jss'

import { correctWordUpdate, incorrectWordUpdate } from './reducers'
import { route } from 'next/dist/server/router';

const TOP_BAR_HEIGHT = '50px'

const wordToKey = (word: string, index: number) => {
    const strippedWord = word.replace('\'', '')
    return `${strippedWord}-${index}`
}

const defaultWordStyle = {
    // height: '40px',
    fontSize: '28px',
    padding: '10px',
    display: 'inline-flex',

}

const useStyles = createUseStyles({
    typingTestContainer: {
        height: `calc(100%-${TOP_BAR_HEIGHT})`,
        width: '100%',
    },
    topBar: {
        TOP_BAR_HEIGHT
    },
    wordsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // height: '100%',
        width: '900px',
        height: '180px',
        margin: '0 auto',
        overflow: 'hidden',
        // padding: '10px',
        // paddingTop: '40px'
        marginTop: '10%'
    },
    inputContainer: {
        width: '400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row'
    },
    textInput: {
        marginRight: '10px'
    },
    word: {
        ...defaultWordStyle
    },
    wordCorrect: {
        ...defaultWordStyle,
        color: "green",
    },
    wordIncorrect: {
        ...defaultWordStyle,
        color: "red",
    },
    wordSelected: {
        ...defaultWordStyle,
        // color: Colors.WHITE,
        backgroundColor: Colors.GRAY5,
        borderRadius: '5px'
    }
})

function useWordMap(words: Array<string>) {
    const wordsMap: Record<string, {
        word: string,
        status: wordStatus
    }> = {}
    words.forEach((word, index) => {
        wordsMap[wordToKey(word, index)] = {
            'word': word,
            'status': 'default',
        }
    })
    return wordsMap
}

type typingTestProps = {
    words: Array<string>
}

type wordStatus = 'default' | 'selected' | 'correct' | 'incorrect'

export type AppState = {
    wordMap: Record<string, {
        word: string,
        status: wordStatus
    }>,
    inProgress: boolean,
    wordKey: string,
    index: number,
    correct: number,
    incorrect: number,
}

const typingTest: InferGetStaticPropsType<typeof getStaticProps> = (props: typingTestProps) => {
    const { words } = props


    // console.log(words)
    const classes = useStyles()

    const router = useRouter()

    const defaultWordMap = useWordMap(words)

    const STYLE_MAP = {
        default: classes.word,
        selected: classes.wordSelected,
        correct: classes.wordCorrect,
        incorrect: classes.wordIncorrect,
    }

    function initTestState(): AppState {
        const first_key = Object.keys(defaultWordMap)[0]
        return {
            wordMap: {
                ...defaultWordMap,
                [first_key]: {
                    ...defaultWordMap[first_key],
                    status: 'selected'
                }
            },
            inProgress: false,
            wordKey: first_key,
            index: 0,
            correct: 0,
            incorrect: 0,
        }
    }

    const [state, setState] = React.useState<AppState>(initTestState())

    const [input, setInput] = React.useState('')

    React.useEffect(() => {
        const { wordMap, wordKey, index } = state

        if (input.indexOf(' ') < 0) return // do nothing if no space

        const strippedInput = input.replace(/\s+/g, '')
        const word = wordMap[state.wordKey].word

        if (strippedInput === word) {
            // correct word
            setInput('')
            setState(correctWordUpdate(wordKey, index))
        } else {
            // incorrect word
            setInput('')
            setState(incorrectWordUpdate(wordKey, index))
        }

    }, [input, state])

    React.useEffect(() => {
        document.querySelector(`div#${state.wordKey}`)?.scrollIntoView()
    }, [state])

    return (
        <div className={classes.typingTestContainer}>
            <div className={classes.topBar}>
                <Button
                    style={{ margin: '10px' }}
                    text={'back'}
                    icon={'undo'}
                    intent={'primary'}
                    onClick={() => {
                        router.push('/')
                    }}
                />
            </div>

            <div className={classes.wordsContainer}>
                {
                    Object.keys(state.wordMap).map(key => {
                        const { word, status } = state.wordMap[key]
                        return (
                            <Text
                                className={STYLE_MAP[status]}
                                id={key}
                                key={key}
                                tagName={'div'}
                            >
                                {word}
                            </Text>
                        )
                    })
                }
            </div>

            <div className={classes.inputContainer}>
                <InputGroup
                    className={classes.textInput}
                    value={input}
                    fill={true}
                    large={true}
                    onChange={(e) => {
                        // console.log(e.target.value)
                        setInput(e.target.value)
                    }}
                />
                {/* <Button
                    style={{ width: '80px' }}
                    text={'Start'}
                    intent='primary'
                /> */}
            </div>

            <h1>
                {JSON.stringify(state.correct)}
            </h1>
        </div>
    )
}
export default typingTest

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await fetch(`${server}/api/getWords`)
    const json: typingTestProps = await response.json()

    return {
        props: { "words": json.words }, // will be passed to the page component as props
    }
}
