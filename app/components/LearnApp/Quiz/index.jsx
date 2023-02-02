import { Form } from "@remix-run/react"
import { useEffect, useState } from "react"

export default function Quiz({
    metadata,
    setLoading,
    params,
    session,
    userData,
    loading,
    ...props
}) {
    const questions = metadata?.lesson?.questions

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [numCorrect, setNumCorrect] = useState(0)
    const [formError, setFormError] = useState(null)
    const [formSuccess, setFormSuccess] = useState(null)
    const [allowContinue, setAllowContinue] = useState(false)
    const [choiceBank, setChoiceBank] = useState([]) // Done to scramble the options only once
    const [answerStatus, setAnswerStatus] = useState(
        Array(questions[currentQuestion]?.options?.length).fill(false)
    )
    const [allowSubmit, setAllowSubmit] = useState(false)

    useEffect(() => {
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Reset the form error and success
        setFormError(null)
        setFormSuccess(null)
        // Reset the allowContinue and allowSubmit
        setAllowSubmit(false)
        setAllowContinue(false)
        // Scramble the options (only once!!)
        setChoiceBank(
            questions?.[currentQuestion]?.options?.sort((a, b) =>
                questions?.[currentQuestion]?.config?.scramble ? 0.5 - Math.random() : a - b
            )
        )
        // Reset the answer status
        setAnswerStatus(Array(questions[currentQuestion]?.options?.length).fill(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestion])

    function handleSubmit(e, question) {
        e.preventDefault()

        // Get all the answers
        const form = new FormData(e.target)
        const res = form.getAll("answer")

        // Check if there are no answers
        if (res == null && res.length == 0) return

        // Check if the answers are correct
        let correct = true
        if (question?.type == "multiple_choice" || question?.type == "dropdown") {
            // Check that the number of answers is correct
            if (res.length != question?.options?.filter(option => option?.correct).length)
                correct = false

            // Check that all the answers are correct
            res.forEach(answer => {
                if (!question?.options?.find(option => option?.value == answer)?.correct)
                    correct = false
            })
        } else if (question?.type == "fill_in") {
            let value = question?.value

            // Apply transforms from the config
            if (question?.config?.ignore_case) {
                value = value.toLowerCase()
                res[0] = res[0].toLowerCase()
            }
            if (question?.config?.ignore_whitespace) {
                value = value.replace(/\s/g, "")
                res[0] = res[0].replace(/\s/g, "")
            }

            if (res[0] != value) correct = false
        }

        // If the answers are correct, increment the number of correct
        // answers and allow the user to continue
        if (correct) {
            setNumCorrect(numCorrect + 1)
            setAllowSubmit(false)
            setAllowContinue(true)
            setFormError(null)
            setFormSuccess("Correct!")
        } else {
            setFormError("Incorrect")
        }
    }

    return (
        !loading && (
            <main className="flex max-h-full w-full flex-grow flex-row overflow-hidden">
                <div className="mx-auto my-auto flex w-full max-w-2xl flex-grow flex-col rounded-md bg-gray-700 px-8 py-4">
                    {currentQuestion < questions?.length &&
                        questions?.map((question, index) => {
                            // Check if the question has multiple correct answers
                            const multipleCorrect =
                                question?.options?.filter(option => option?.correct)?.length > 1

                            return (
                                <Form
                                    key={index}
                                    className=""
                                    hidden={index != currentQuestion}
                                    onSubmit={e => handleSubmit(e, question)}>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row">
                                            Question {index + 1} of {questions?.length}
                                        </div>
                                        <div className="flex flex-row">
                                            {Math.floor((numCorrect / questions?.length) * 100)}%
                                        </div>
                                    </div>
                                    <h1> {question?.title} </h1>
                                    <p> {question?.content} </p>
                                    {formError && (
                                        <div className="rounded-md bg-red-500 p-2 text-white">
                                            {formError}
                                        </div>
                                    )}
                                    {formSuccess && (
                                        <div className="rounded-md bg-green-500 p-2 text-white">
                                            {formSuccess}
                                        </div>
                                    )}
                                    {question?.type == "multiple_choice" && (
                                        <div>
                                            {choiceBank?.map((option, index) => (
                                                <div key={index}>
                                                    <input
                                                        type={
                                                            multipleCorrect ? "checkbox" : "radio"
                                                        }
                                                        name="answer"
                                                        value={option?.value}
                                                        onChange={e => {
                                                            // While this technically works, it's not
                                                            // the best way to do it for single choice
                                                            // questions
                                                            let s = [...answerStatus]
                                                            s[index] = e.target.checked
                                                            setAnswerStatus(s)
                                                            setFormError(null)
                                                            setAllowSubmit(s.includes(true))
                                                        }}
                                                    />
                                                    <label>{option?.value}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {question?.type == "fill_in" && (
                                        <div>
                                            <input
                                                type="text"
                                                name="answer"
                                                onChange={e => {
                                                    setFormError(null)
                                                    if (e.target.value.length > 0)
                                                        setAllowSubmit(true)
                                                    else setAllowSubmit(false)
                                                }}
                                            />
                                        </div>
                                    )}
                                    {question?.type == "dropdown" && (
                                        <div>
                                            <select
                                                name="answer"
                                                defaultValue="default"
                                                onChange={e => {
                                                    setFormError(null)
                                                    if (e.target.value != "default")
                                                        setAllowSubmit(true)
                                                    else setAllowSubmit(false)
                                                }}>
                                                <option disabled value="default"></option>
                                                {choiceBank?.map((option, index) => (
                                                    <option key={index} value={option?.value}>
                                                        {option?.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    {allowContinue ? (
                                        <button
                                            onClick={e => {
                                                e.preventDefault()
                                                setCurrentQuestion(index + 1)
                                            }}>
                                            {index < questions?.length - 1 ? "Next" : "Finish"}
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={formError || !allowSubmit}>
                                            Submit
                                        </button>
                                    )}
                                </Form>
                            )
                        })}
                    {currentQuestion >= questions?.length && (
                        <div>
                            <h1>Lesson Complete!</h1>
                            <p>
                                You got {numCorrect} out of {questions?.length} questions correct.
                            </p>
                            <p>
                                You got {Math.floor((numCorrect / questions?.length) * 100)}%
                                correct.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        )
    )
}
