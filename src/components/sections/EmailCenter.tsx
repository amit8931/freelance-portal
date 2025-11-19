import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";

type SentEmail = {
  id: number;
  subject: string;
  audience: string;
  date: string;
};

export default function EmailCenter() {
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState("All Users");
  const editorRef = useRef<any>(null);
  const [sending, setSending] = useState(false);
  const [sentList, setSentList] = useState<SentEmail[]>([]);

  // Send handler (simulated)
  const handleSend = () => {
    if (!subject.trim() || !(editorRef.current && editorRef.current.getContent().trim())) {
      alert("Subject and body are required.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentList([
        {
          id: Date.now(),
          subject,
          audience,
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
        },
        ...sentList,
      ]);
      setSubject("");
      setAudience("All Users");
      if (editorRef.current) editorRef.current.setContent("");
      alert("Email sent successfully!");
    }, 1200);
  };

  return (
    <div>
      <PageMeta
        title="Email Center | Admin Dashboard"
        description="Send alerts and promotional emails to users."
      />
      <PageBreadcrumb pageTitle="Email Center" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Email Campaigns & Alerts
        </h2>
        {/* Email Composer */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-8 max-w-2xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">Compose Email</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">To</label>
            <select
              className="w-full px-4 py-2 border rounded mb-3 bg-white dark:bg-gray-800 dark:border-gray-700"
              value={audience}
              onChange={e => setAudience(e.target.value)}
            >
              <option>All Users</option>
              <option>Freelancers</option>
              <option>Employers</option>
              <option>Subscribers</option>
            </select>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Subject</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded mb-3 bg-white dark:bg-gray-800 dark:border-gray-700"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Message</label>
            <Editor
              id="email-body"
              onInit={(_, editor) => (editorRef.current = editor)}
              initialValue={"<p>Start composing your email here...</p>"}
              init={{
                height: 220,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'table', 'help', 'wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline | bullist numlist | link | code | fullscreen',
                skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
                content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
              }}
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              className={`px-8 py-2 bg-blue-600 text-white rounded-lg font-medium shadow transition
                ${sending ? "opacity-70 cursor-wait" : "hover:bg-blue-700"}`}
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>
        {/* Sent Emails Log */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">Sent Emails</h3>
          <div className="overflow-x-auto rounded border border-gray-100 dark:border-gray-700 shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Date</th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Subject</th>
                  <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Audience</th>
                </tr>
              </thead>
              <tbody>
                {sentList.length === 0 ? (
                  <tr>
                    <td className="px-3 py-4 text-gray-500 dark:text-gray-400" colSpan={3}>
                      No email campaigns sent yet.
                    </td>
                  </tr>
                ) : (
                  sentList.map(email => (
                    <tr key={email.id} className="bg-white even:bg-gray-50 dark:bg-gray-900 dark:even:bg-gray-800">
                      <td className="px-3 py-2">{email.date}</td>
                      <td className="px-3 py-2">{email.subject}</td>
                      <td className="px-3 py-2">{email.audience}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          Compose and send system alerts or promotional emails to your users.
        </div>
      </div>
    </div>
  );
}
