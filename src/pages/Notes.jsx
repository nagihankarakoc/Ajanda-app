import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

export default function Notes() {
    const user = localStorage.getItem("user");

    const [notes, setNotes] = useState(() => {
        const storageKey = user ? `notes_${user}` : null;
        if (!storageKey) return [];
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : [];
    });
    const [input, setInput] = useState("");

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const storageKey = user ? `notes_${user}` : null;

    // save
    useEffect(() => {
        if (!storageKey) return;
        localStorage.setItem(storageKey, JSON.stringify(notes));
    }, [notes, storageKey]);

    // add
    const addNote = () => {
        if (!input) return;

        const newNote = {
            id: Date.now(),
            text: input,
            color: getRandomColor()
        };

        setNotes([...notes, newNote]);
        setInput("");
    };

    // delete
    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    // edit save
    const saveEdit = (id) => {
        setNotes(notes.map(n =>
            n.id === id ? { ...n, text: editText } : n
        ));
        setEditId(null);
    };


    const getRandomColor = () => {
        const colors = [
            "bg-yellow-200",
            "bg-green-200",
            "bg-blue-200",
            "bg-pink-200",
            "bg-purple-200"
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex-1 bg-gray-100 p-6 overflow-auto">

                <h1 className="text-2xl font-bold mb-4">Notlarım</h1>

                {/* INPUT */}
                <input
                    className="border p-2 w-full rounded"
                    placeholder="Not yaz..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    onClick={addNote}
                    className="bg-blue-500 text-white p-2 mt-2 w-full rounded"
                >
                    Not Ekle
                </button>

                {/* GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                    {notes.map(note => (
                        <div
                            key={note.id}
                            className={`${note.color} p-4 rounded shadow-md relative transition duration-300 hover:scale-105 hover:rotate-1`}
                        >

                            {/* EDIT / TEXT */}
                            {editId === note.id ? (
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="border w-full p-1"
                                />
                            ) : (
                                <p className="break-words">{note.text}</p>
                            )}

                        
                            <div className="absolute top-2 right-2 flex gap-2">

                                {editId === note.id ? (
                                    <button onClick={() => saveEdit(note.id)}>
                                        <FaSave className="hover:text-green-600 transition cursor-pointer" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditId(note.id);
                                            setEditText(note.text);
                                        }}
                                    >
                                        <FaEdit className="hover:text-blue-600 transition cursor-pointer" />
                                    </button>
                                )}

                                <button onClick={() => deleteNote(note.id)}>
                                    <FaTrash className="hover:text-red-500 transition cursor-pointer" />
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}