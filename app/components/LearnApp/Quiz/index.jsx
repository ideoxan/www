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
    const quizOpts = metadata?.lesson?.environment
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
    const [numQuestionAttempts, setNumQuestionAttempts] = useState(0)

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
        if (loading || !question || !allowSubmit) return
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
            setNumQuestionAttempts(numQuestionAttempts + 1)
        } else {
            setFormError("Incorrect")
            setNumQuestionAttempts(numQuestionAttempts + 1)
            if (
                quizOpts?.max_question_attempts != 0 ||
                numQuestionAttempts >= quizOpts?.max_question_attempts
            ) {
                setAllowSubmit(false)
                setAllowContinue(true)
                setFormError("Incorrect")
            } else {
                setFormError("Try Again!")
            }
        }
    }

    if (loading) return null

    return (
        <main className="flex max-h-full w-full flex-grow flex-row overflow-hidden">
            <div className="mx-auto my-auto flex w-full max-w-3xl flex-grow flex-col rounded-lg border-1 border-gray-500/20 bg-gray-700 px-10 py-8 shadow-lg">
                {currentQuestion < questions?.length &&
                    questions?.map((question, index) => {
                        // Check if the question has multiple correct answers
                        const multipleCorrect =
                            question?.options?.filter(option => option?.correct)?.length > 1
                        let questionTypeString = ""
                        if (question?.type == "multiple_choice") {
                            if (multipleCorrect) questionTypeString = "Multiple Choice"
                            else if (
                                question?.options[0] == "true" &&
                                question?.options[1] == "false"
                            )
                                questionTypeString = "True or False"
                            else questionTypeString = "Single Choice"
                        } else if (question?.type == "dropdown") {
                            questionTypeString = "Dropdown"
                        } else if (question?.type == "fill_in") {
                            questionTypeString = "Fill in the Blank"
                        }

                        return (
                            <Form
                                key={index}
                                className={
                                    (index == currentQuestion ? "flex " : "hidden ") + "flex-col"
                                }
                                onSubmit={e => handleSubmit(e, question)}>
                                <div className="mb-2 flex flex-row justify-between font-sans text-xs font-bold tracking-tight text-gray-50/60">
                                    <div className="flex flex-row">
                                        Question {index + 1} / {questions?.length}
                                    </div>
                                    {(quizOpts?.show_score_after || quizOpts?.show_score) && (
                                        <div className="flex flex-row">
                                            Score:{" "}
                                            {Math.floor((numCorrect / questions?.length) * 100)}%
                                        </div>
                                    )}
                                </div>
                                <h1 className="text-left font-sans text-2xl font-extrabold tracking-tight text-gray-50">
                                    {question?.title}
                                </h1>
                                <p className="mt-1 font-sans text-sm font-normal leading-5 text-gray-50/80">
                                    {"(" + questionTypeString + ") " + question?.content}
                                </p>

                                <div className="mt-4 "></div>
                                {question?.type == "multiple_choice" && (
                                    <>
                                        {choiceBank?.map((option, optIndex) => (
                                            <div key={optIndex} className="w-full">
                                                <input
                                                    type={multipleCorrect ? "checkbox" : "radio"}
                                                    className="peer my-auto hidden h-4 w-4 rounded-md border-gray-500/20 bg-gray-500/20 text-primary focus:ring-2 focus:ring-primary"
                                                    name="answer"
                                                    value={option?.value}
                                                    id={"quiz-" + index + "-" + optIndex}
                                                    onChange={e => {
                                                        // While this technically works, it's not
                                                        // the best way to do it for single choice
                                                        // questions
                                                        let s = [...answerStatus]
                                                        s[optIndex] = e.target.checked
                                                        setAnswerStatus(s)
                                                        setFormError(null)
                                                        setAllowSubmit(s.includes(true))
                                                    }}
                                                    disabled={allowContinue}
                                                />
                                                <label
                                                    className="my-auto mb-2 flex w-full cursor-pointer space-x-4 rounded-lg border-2 border-gray-500/20 px-6 py-4 font-sans text-sm font-medium text-gray-50/80 hover:border-primary/50 peer-checked:border-primary peer-checked:text-gray-50/100"
                                                    htmlFor={"quiz-" + index + "-" + optIndex}>
                                                    {option?.value}
                                                </label>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {question?.type == "fill_in" && (
                                    <input
                                        type="text"
                                        name="answer"
                                        className="mb-2 w-full rounded-lg border border-gray-500/50 bg-gray-800 px-5 py-3 font-sans text-xs font-medium text-gray-50/70 outline-offset-0 focus:border-1 focus:border-primary focus:text-gray-50/100 focus:outline-none"
                                        onChange={e => {
                                            setFormError(null)
                                            if (e.target.value.length > 0) setAllowSubmit(true)
                                            else setAllowSubmit(false)
                                        }}
                                        disabled={allowContinue}
                                    />
                                )}
                                {question?.type == "dropdown" && (
                                    <select
                                        name="answer"
                                        defaultValue="default"
                                        className="mb-2 w-full rounded-lg border border-gray-500/50 bg-gray-800 px-5 py-3 font-sans text-xs font-medium text-gray-50/70 outline-offset-0 focus:border-1 focus:border-primary focus:text-gray-50/100 focus:outline-none"
                                        onChange={e => {
                                            setFormError(null)
                                            if (e.target.value != "default") setAllowSubmit(true)
                                            else setAllowSubmit(false)
                                        }}
                                        disabled={allowContinue}>
                                        <option disabled value="default"></option>
                                        {choiceBank?.map((option, index) => (
                                            <option key={index} value={option?.value}>
                                                {option?.value}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <button
                                    className={
                                        "bttn bttn-square bttn-normal disabled:bttn-disabled mt-4 ml-auto text-gray-50 hover:opacity-90 " +
                                        (formError
                                            ? "bg-red-500"
                                            : formSuccess
                                            ? "bg-green-500"
                                            : "bg-primary")
                                    }
                                    onClick={e => {
                                        if (!allowContinue) return
                                        e.preventDefault()
                                        setCurrentQuestion(index + 1)
                                    }}
                                    type={allowContinue ? "button" : "submit"}
                                    disabled={!allowContinue && (formError || !allowSubmit)}>
                                    {allowContinue
                                        ? formError
                                            ? formError
                                            : index < questions?.length - 1
                                            ? "Next"
                                            : "Finish"
                                        : formError || "Submit"}
                                </button>
                            </Form>
                        )
                    })}
                {currentQuestion >= questions?.length && (
                    <div>
                        <h1 className="text-left font-sans text-2xl font-extrabold tracking-tight text-gray-50">
                            Quiz Complete!
                        </h1>
                        {quizOpts?.show_score_after ? (
                            <>
                                <p className="font-sans text-sm font-normal leading-5 text-gray-50">
                                    You got {numCorrect} out of {questions?.length} questions
                                    correct.
                                </p>
                                <p className="font-sans text-sm font-normal leading-5 text-gray-50">
                                    You got {Math.floor((numCorrect / questions?.length) * 100)}%
                                    correct.
                                </p>
                            </>
                        ) : (
                            <p className="font-sans text-sm font-normal leading-5 text-gray-50">
                                Your final score has been recorded. You can continue on to the next
                                lesson.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}
