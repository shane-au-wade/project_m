import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import {
    Button,
    Text,
    InputGroup,
    Colors,
    ButtonGroup,
} from '@blueprintjs/core'
import { server } from '../../public/config';

// Setup Blueprint
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
// Turn off focus styling for blueprint components
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import { createUseStyles } from 'react-jss'

import { correctWordUpdate, incorrectWordUpdate, initTestState } from '../../public/typingTest/reducers'

const TOP_BAR_HEIGHT = '50px'
const TEST_TIME = 60

const wordToKey = (word: string, index: number) => {
    const strippedWord = word.replace('\'', '')
    return `${strippedWord}-${index}`
}

const defaultWordStyle = {
    fontSize: '28px',
    padding: '10px',
    display: 'inline-flex',

}

const useStyles = createUseStyles({
    topBar: {
        TOP_BAR_HEIGHT
    },
    typingTestContainer: {
        height: `calc(100%-${TOP_BAR_HEIGHT})`,
        width: '100%',
    },
    wordsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '900px',
        height: '180px',
        margin: '0 auto',
        overflow: 'hidden',
        marginTop: '10%'
    },
    rowCentered: {
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

type Results = {
    wpm: number
}

export type AppState = {
    wordMap: Record<string, {
        word: string,
        status: wordStatus
    }>,
    firstWord: boolean,
    wordKey: string,
    index: number,
    correct: number,
    incorrect: number,
}

const TypingTest: InferGetStaticPropsType<typeof getStaticProps> = (props: typingTestProps) => {
    const { words } = props

    const router = useRouter()

    const classes = useStyles()

    const STYLE_MAP = {
        default: classes.word,
        selected: classes.wordSelected,
        correct: classes.wordCorrect,
        incorrect: classes.wordIncorrect,
    }

    const initWordMap = useWordMap(words)

    const first_key = Object.keys(initWordMap)[0]
    const APP_INIT_STATE: AppState = {
        wordMap: {
            ...initWordMap,
            [first_key]: {
                ...initWordMap[first_key],
                status: 'selected'
            }
        },
        firstWord: true,
        wordKey: first_key,
        index: 0,
        correct: 0,
        incorrect: 0,
    }

    // app state
    const [state, setState] = React.useState<AppState>(APP_INIT_STATE)

    // input state
    const [input, setInput] = React.useState<string>('')
    const [isDisabled, setDisabled] = React.useState(false)

    // results state
    const [results, setResults] = React.useState<Results | null>(null)

    // timer state
    const timerIdRef = React.useRef<number | null>(null);
    const [count, setCount] = React.useState(0);

    // timer controls
    const startTimer = () => {
        if (timerIdRef.current) { return; }
        timerIdRef.current = setInterval(() => setCount(c => c + 1), 1000)
    };
    const stopTimer = () => {
        clearInterval(timerIdRef.current);
        timerIdRef.current = 0;
    };

    const showTestResults = () => {
        const minutes = count / 60
        setResults({
            wpm: state.correct / minutes
        })
    }

    // timer cleanup
    React.useEffect(() => {
        return () => clearInterval(timerIdRef.current);
    }, []);

    // timer update
    React.useEffect(() => {
        if (count === TEST_TIME) {
            // test is complete
            stopTimer()
            showTestResults()
            setDisabled(true)
            setInput('')
        }
    }, [count])

    // input update
    React.useEffect(() => {
        if (input.indexOf(' ') < 0) return // do nothing if no space is present

        const { wordMap, wordKey, index, firstWord } = state

        if (firstWord) {
            startTimer()
        }

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


    // scroll effect to move next line of words into view
    React.useEffect(() => {
        document.querySelector(`div#${state.wordKey}`)?.scrollIntoView()
    }, [state])


    // results display component
    type ResultsDisplayProps = {
        showResults: boolean
    }

    function ResultsDisplay(props: ResultsDisplayProps) {
        const { showResults } = props
        if (showResults) {
            return (
                <div className={classes.rowCentered}>
                    <Text style={{ margin: '0 auto' }}
                        tagName='h3'>
                        {`${results ? results.wpm : ''}wpm`}
                    </Text>
                </div>

            )
        }
        return <div></div>
    }

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

            <div className={classes.rowCentered}>
                <InputGroup
                    className={classes.textInput}
                    value={input}
                    disabled={isDisabled}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    fill
                    large
                />
                <Button
                    style={{ width: '70px' }}
                    icon='reset'
                    intent='primary'
                    onClick={() => {
                        setCount(0)
                        setInput('')
                        setState(initTestState(initWordMap))
                        setResults(null)
                        setDisabled(false)
                    }}
                />
            </div>

            {/* divider */}
            <div style={{ height: '20px' }} />

            <div className={classes.rowCentered}>
                <ButtonGroup style={{ margin: '0 auto' }}>
                    {/* empty button to affect blue print js styling */}
                    <Button style={{ display: 'none' }} />
                    <Button
                        intent='success'
                        text={JSON.stringify(state.correct)}
                        style={{ pointerEvents: 'none' }}
                        large
                        minimal
                        outlined
                    />
                    <Button
                        intent='danger'
                        text={JSON.stringify(state.incorrect)}
                        style={{ pointerEvents: 'none', marginLeft: '5px' }}
                        large
                        minimal
                        outlined
                    />
                    {/* empty button to affect blue print js styling */}
                    <Button style={{ display: 'none' }} />
                </ButtonGroup>
            </div>

            {/* divider */}
            <div style={{ height: '20px' }} />

            <div className={classes.rowCentered}>
                <ButtonGroup style={{ margin: '0 auto' }}>
                    <Button
                        text={`${count}s`}
                        large
                        minimal
                    />
                </ButtonGroup>
            </div>

            {/* divider */}
            <div style={{ height: '20px' }} />

            <ResultsDisplay showResults={(results ? true : false)}></ResultsDisplay>
        </div>
    )
}
export default TypingTest

export const getStaticProps: GetStaticProps = async (context) => {
    type Data = {
        words: Array<String>
    }

    const words_array = ["live", "after", "went", "great", "from", "story", "up", "until", "change", "she", "face", "over", "paper", "got", "land", "make", "here", "near", "picture", "could", "need", "work", "are", "three", "while", "stop", "we", "earth", "any", "move", "just", "keep", "still", "sentence", "has", "but", "eye", "than", "hand", "along", "down", "young", "air", "two", "leave", "has", "had", "he", "men", "far", "food", "see", "last", "hard", "want", "different", "must", "begin", "line", "spell", "should", "it's", "year", "food", "soon", "sometimes", "his", "were", "are", "three", "does", "man", "these", "point", "second", "run", "boy", "no", "more", "life", "little", "time", "on", "tell", "point", "family", "sometimes", "change", "together", "get", "miss", "before", "well", "of", "way", "cut", "every", "the", "small", "animal", "father", "group", "way", "could", "me", "sentence", "keep", "follow", "say", "both", "those", "sound", "find", "book", "some", "earth", "often", "even", "quickly", "open", "out", "good", "very", "follow", "study", "off", "try", "grow", "always", "back", "do", "white", "mountain", "people", "earth", "home", "his", "it's", "each", "all", "give", "many", "America", "know", "run", "him", "been", "read", "air", "it", "left", "begin", "call", "to", "give", "near", "are", "high", "white", "carry", "walk", "been", "light", "word", "off", "go", "such", "right", "miss", "really", "all", "boy", "part", "don't", "quick", "why", "young", "next", "miss", "add", "city", "begin", "important", "way", "thought", "try", "they", "book", "big", "give", "need", "say", "thing", "name", "come", "under", "few", "sea", "book", "make", "set", "own", "car", "try", "only", "every", "different", "first", "is", "below", "must", "new", "through", "new", "also", "important", "your", "long", "close", "world", "thing", "we", "thought", "know", "then", "come", "over", "once", "keep", "around", "form", "two", "end", "like", "but", "these", "may", "watch", "end", "city", "to", "really", "long", "play", "almost", "more", "add", "after", "for", "open", "away", "feet", "number", "some", "list", "America", "car", "be", "letter", "every", "go", "paper", "might", "he", "those", "before", "which", "help", "mother", "girl", "there", "do", "live", "you", "use", "water", "list", "ask", "got", "think", "them", "into", "point", "page", "have", "about", "time", "or", "often", "how", "away", "different", "near", "she", "her", "spell", "only", "state", "never", "children", "think", "night", "start", "people", "seem", "cut", "city", "Indian", "in", "we", "let", "through", "next", "change", "tree", "will", "idea", "around", "not", "took", "show", "back", "much", "want", "good", "before", "read", "year", "mean", "day", "back", "she", "made", "between", "where", "turn", "other", "began", "mile", "life", "good", "made", "between", "along", "so", "own", "tree", "had", "country", "mile", "grow", "hard", "her", "about", "by", "each", "small", "sound", "see", "example", "often", "something", "many", "house", "off", "close", "both", "talk", "put", "form", "mother", "three", "any", "still", "Indian", "her", "soon", "found", "sch"]

    return {
        props: { "words": words_array }, // will be passed to the page component as props
    }
}
