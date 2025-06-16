"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { SubmitComment } from "./submitComment";

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY; // Replace this with your OpenRouter API key
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.NEXT_PUBLIC_MODEL; // You can also use "gpt-4" or "claude-3-opus"

export const NewComment = ({ previousComments, studentName, setNewComment, studentId, teacherName, setFetchData }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [generatedComment, setGeneratedComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        generatedComment && generatedCommentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [generatedComment])

    // Function to fetch AI-generated questions
    const fetchQuestions = async () => {
        setLoading(true);
        setQuestions([])
        setAnswers({})
        setGeneratedComment("")
        try {
            const response = await fetch(OPENROUTER_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: "system", content: "You are a helpful assistant for teachers. Always return valid JSON arrays." },
                        {
                            role: "user",
                            content: `Based on the student's previous comments for student with name ${studentName}: "${previousComments}", generate 7 multiple-choice questions for the teacher to assess the student's progress. last 2 questions should not be related to the previous comments, it should be new general questions out of context of the previous comments to know how the student is doing generally, the first 5 should be from the previous comments. Please if the previous comments are empty, please ask general 7 questions for the student about his/her progress in class, these questions are answered by the teacher about the student whose name ${studentName} to generate assessment, and please use words like your,you've referring to the teachers class.

                            i also have complains the questions are similar, please try to bring some uniqueness in each question.
                            
                            - Each question should have 4 **detailed** answer choices.
                            - **Return the response as a plain JSON array, without any introductory text, explanation, or extra formatting.**
                            - The response should always **start and end with square brackets** [ ].
                            - Do **not** add words like "Sure" or "Here is your response". Just return the JSON array.
                            - Also make the english very simple and easy vocabs to understand making it seem real.
                            - Don't add anything like ok this your raw response or anything just array, should strictly start with [] am very keen on this please very important, because am getting the response in my code and any twist of the response would result in an error, and in each array should be an object with key question, and the sub object for the answers should strictly have a key called options.
                            should follow this format exactly:

                            [
  {
    "question": "What is the student's greatest strength in class?",
    "options": [
      "Actively participates in class discussions and asks insightful questions.",
      "Prefers to work alone and avoids engaging in class activities.",
      "Completes assignments but struggles with group projects."
    ]
  },
  {
    "question": "How has the student improved their time management skills?",
    "options": [
      "Submits assignments on time and plans study schedules effectively.",
      "Often forgets to complete assignments and misses deadlines.",
      "Occasionally manages time well but still struggles with consistency."
    ]
  }
]
  `,
                        },
                    ],
                    max_tokens: 1000,
                }),
            });

            const data = await response.json();
            // console.log(data)
            // console.log("Raw Response:", data.choices[0].message.content);

            try {
                let rawContent = data.choices[0].message.content.trim();

                // Find the first '['
                let startIdx = rawContent.indexOf("[");
                if (startIdx === -1) throw new Error("Invalid response format: No opening bracket found");

                // Find the correct closing ']'
                let openBrackets = 0;
                let endIdx = -1;

                for (let i = startIdx; i < rawContent.length; i++) {
                    if (rawContent[i] === "[") openBrackets++;
                    if (rawContent[i] === "]") openBrackets--;

                    if (openBrackets === 0) {
                        endIdx = i;
                        break;
                    }
                }

                if (endIdx === -1) throw new Error("Invalid response format: No matching closing bracket found");

                // Extract the valid JSON array
                rawContent = rawContent.substring(startIdx, endIdx + 1);

                // Parse JSON
                const parsedQuestions = JSON.parse(rawContent);

                // Validate structure
                if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
                    throw new Error("Invalid response structure: Not a valid questions array");
                }

                parsedQuestions.forEach((question, index) => {
                    if (!question.question || !Array.isArray(question.options) || question.options.length === 0) {
                        throw new Error(`Invalid question format at index ${index}`);
                    }
                });

                // Set questions
                setQuestions(parsedQuestions);
            } catch (error) {
                console.error("Error parsing AI response:", error.message);
            }

        } catch (error) {
            console.error("Error generating questions:", error);
        }
        setLoading(false);
    };


    // Handle answer selection
    const handleAnswerChange = (questionIndex, selectedOption) => {
        setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
    };

    const [gLoading, setGLoading] = useState(false)

    const generatedCommentRef = useRef(null);

    // Function to generate a comment based on selected answers
    const generateComment = async () => {
        setGLoading(true);
        try {
            const selectedAnswersText = Object.values(answers).join(", ");

            // Check if selectedAnswersText is empty
            if (!selectedAnswersText.trim()) {
                toast.error("Please select at least one answer before proceeding.");
                setGLoading(false);
                return;
            }

            const response = await fetch(OPENROUTER_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: "system", content: "You are an AI that generates teacher comments based on student performance." },
                        {
                            role: "user",
                            content: `Based on the following teacher's responses: "${selectedAnswersText}", generate a concise and professional teacher comment assessing the student's progress.  

- The comment should be written **as if a teacher is directly evaluating the student by referencing the student name, which is ${studentName} and please do not use vocabs, use simple words for easy understanding to all making it seem real**, avoiding phrases like "we will focus on" or "we are working on."  
- Structure it in this format:  
  1. **Highlight strengths**: Mention the student’s strong areas.  
  2. **Note areas for improvement**: Point out what they need to improve.  
  3. **Encouragement**: Encourage them to keep up their efforts.  
- Return the response **strictly** as a JSON object in this format:  

\`\`\`json  
{ "comment": "Your well-structured teacher comment here." }  
\`\`\`  

- Do **not** include extra text, explanations, or formatting—only the JSON object.`,
                        },
                    ],
                    max_tokens: 600,
                }),
            });

            const data = await response.json();

            // console.log(data)

            // ✅ Extract raw content
            let rawContent = data.choices[0]?.message?.content || "";

            // ✅ Remove any unwanted markdown (backticks, extra text, etc.)
            rawContent = rawContent.replace(/```json|```/g, "").trim();

            // ✅ Attempt to parse JSON
            try {
                const parsedComment = JSON.parse(rawContent);
                setGeneratedComment(parsedComment.comment || "No comment generated.");
            } catch (parseError) {
                console.error("Error parsing comment JSON:", parseError);
                setGeneratedComment("Invalid response format.");
            }

        } catch (error) {
            console.error("Error generating comment:", error);
            toast.error("Comment not generated, please retry!")
        }
        setGLoading(false);
    };

    const [sLoading, setSLoading] = useState(false)

    const submitComments = async () => {
        try {

            setSLoading(true)
            const response = await fetch(`/api/students/${studentId}/comments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ studentId, comment: generatedComment, by: teacherName }),
            })

            const responseData = await response.json()
            if (!response.ok) {
                toast.error(responseData.message)
                return
            }

            toast.success(responseData.message)
            setFetchData(true)
            setNewComment(false)
        }
        catch (e) {
            console.log(e)
        } finally {
            setSLoading(false)
        }
    }

    const [submitComment, setSubmitComment] = useState(false)

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-black/20 backdrop-blur-sm pt-10 z-40">

            {submitComment && <SubmitComment generatedComment={generatedComment} setSubmitComment={setSubmitComment} />}

            <div className="max-w-4xl transition duration-1000 bg-white h-full overflow-y-auto mx-auto rounded-t-xl p-3">
                <div className="flex justify-between items-center">
                    <h1 className="font-medium">
                        Generate New Comment
                    </h1>
                    <button onClick={() => setNewComment(false)} type="button" className="bg-red-200 text-black p-2 rounded-full hover:bg-red-800 hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>

                {/* Button to fetch AI-generated questions */}
                {questions.length === 0 && (
                    <div className="flex justify-center items-center p-2 mt-2">
                        <button
                            onClick={fetchQuestions}
                            className="bg-indigo-600 disabled:bg-indigo-300 text-white px-4 py-2 rounded mt-3 flex items-center justify-center gap-2 text-sm w-full"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                        ></path>
                                    </svg>
                                    Generating Questions...
                                </>
                            ) : (
                                <span>Generate Questions</span>
                            )}
                        </button>
                    </div>
                )}

                {questions.length > 0 && (
                    <div className="flex items-center justify-between mt-2 gap-2 p-4 bg-gray-100 rounded-md text-xs">
                        <p>Do the generated questions seem out of context? Would you like to regenerate them?</p>
                        <button
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 disabled:bg-blue-300 flex items-center justify-center gap-2 text-white rounded-md hover:bg-blue-700"
                            onClick={fetchQuestions} // Ensure fetchQuestions is defined and working
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                        ></path>
                                    </svg>
                                    Generating Questions...
                                </>
                            ) : (
                                <span>Regenerate Questions</span>
                            )}
                        </button>
                    </div>
                )}


                {/* Show generated questions with answer choices */}
                {questions.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-medium text-sm">Please answer these questions about the student:</h3>
                        {questions.map((q, index) => (
                            <div key={index} className="mt-3">
                                <p className="text-gray-700 text-sm font-semibold">{q.question}</p>
                                {q.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center mt-1 text-sm">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            onChange={() => handleAnswerChange(index, option)}
                                            className="mr-2"
                                        />
                                        <label className="text-gray-600">{option}</label>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Button to generate the final AI comment */}
                        <button
                            onClick={generateComment}
                            className="bg-lime-700 disabled:bg-lime-200 text-sm text-white px-4 py-2 rounded mt-4 flex justify-center items-center gap-2"
                            disabled={gLoading}
                        >

                            {gLoading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                        ></path>
                                    </svg>
                                    Generating Comment...
                                </>
                            ) : (
                                <span>Generate Comment</span>
                            )}
                        </button>
                    </div>
                )}

                {/* Show the final AI-generated comment */}
                {generatedComment && (
                    <div ref={generatedCommentRef} className="my-4 p-3 bg-gray-100 rounded-md">
                        <h3 className="font-medium">Generated Comment:</h3>
                        <p className="text-gray-700 text-sm">{generatedComment}</p>

                        <div className="flex justify-between items-center">

                            <button onClick={() => setSubmitComment(true)} type="button" className="flex items-center justify-center gap-2 bg-lime-600 disabled:bg-gray-700 text-white p-2 rounded-md mt-2 text-xs">
                                Accept Comment
                            </button>

                            <button disabled={gLoading} onClick={generateComment} type="button" className="flex items-center justify-center gap-2 bg-blue-600 disabled:bg-gray-700 text-white p-2 rounded-md mt-2 text-xs"> {gLoading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                        ></path>
                                    </svg>
                                    Generating Comment...
                                </>
                            ) : (
                                <span>Regenerate Comment</span>
                            )}
                            </button>

                            <button disabled={loading} onClick={fetchQuestions} type="button" className="flex items-center justify-center gap-2 bg-red-600 disabled:bg-gray-700 text-white p-2 rounded-md mt-2 text-xs">
                                {loading ? (
                                    <>
                                        <svg
                                            className="w-5 h-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                            ></path>
                                        </svg>
                                        Generating Questions...
                                    </>
                                ) : (
                                    <span>Regenerate Questions</span>
                                )}
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};
