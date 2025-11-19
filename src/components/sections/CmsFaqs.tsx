import { useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

const initialFaqs: Faq[] = [
  {
    id: 1,
    question: "How do I create an account?",
    answer: "Click on the Sign Up button on the home page and follow the instructions.",
  },
  {
    id: 2,
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards, UPI, and various wallet options.",
  },
];

export default function CmsFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setFaqs([
      ...faqs,
      {
        id: Date.now(),
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
      },
    ]);
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleDelete = (id: number) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const startEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  const handleEditSave = (id: number) => {
    setFaqs((current) =>
      current.map((f) =>
        f.id === id ? { ...f, question: editQuestion, answer: editAnswer } : f
      )
    );
    setEditingId(null);
  };

  return (
    <div>
      <PageMeta
        title="FAQs | Admin Dashboard"
        description="Edit Frequently Asked Questions."
      />
      <PageBreadcrumb pageTitle="FAQs" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          FAQs Editor
        </h2>
        {/* FAQ List */}
        <div className="mb-8">
          {faqs.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400">No FAQs available.</div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {faqs.map((faq) =>
                editingId === faq.id ? (
                  <li key={faq.id} className="py-5">
                    <input
                      type="text"
                      className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 mb-2"
                      value={editQuestion}
                      onChange={(e) => setEditQuestion(e.target.value)}
                    />
                    <textarea
                      className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2"
                      rows={3}
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                    />
                    <div className="flex gap-3 mt-2">
                      <button
                        className="px-5 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        onClick={() => handleEditSave(faq.id)}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                ) : (
                  <li key={faq.id} className="py-5 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium mb-1 text-gray-800 dark:text-white">{faq.question}</p>
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                    <div className="flex gap-4 mt-3 md:mt-0">
                      <button
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => startEdit(faq)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline font-medium"
                        onClick={() => handleDelete(faq.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        {/* Add New FAQ */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-xl">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Add New FAQ</h3>
          <input
            type="text"
            placeholder="Question"
            className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 mb-2"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <textarea
            placeholder="Answer"
            className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 mb-2"
            rows={3}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button
            className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
            onClick={handleAddFaq}
          >
            Add FAQ
          </button>
        </div>
        <div className="text-gray-500 dark:text-gray-400 mt-8">
          Manage, add, or edit FAQ entries.
        </div>
      </div>
    </div>
  );
}
