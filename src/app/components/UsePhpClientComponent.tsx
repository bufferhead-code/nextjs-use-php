'use client'

import {useState} from "react";
import {phpHelloWorld} from "../actions";

export default function UsePhpClientComponent() {

    const [output, setOutput] = useState<string>('');

    async function onClick() {
        const out: string = await phpHelloWorld();
        setOutput(out);
    }

    return (
        <div>
            <div>
                <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                    Add your comment
                </label>
                <div className="mt-2">
        <textarea
            rows={4}
            name="comment"
            id="comment"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={output}
        />
                </div>
            </div>
            <button
                type="button"
                onClick={onClick}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Execute PHP
            </button>
        </div>
    )

}