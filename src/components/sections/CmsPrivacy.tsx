import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";

export default function CmsPrivacy() {
  const editorRef = useRef<any>(null);
  const [saving, setSaving] = useState(false);

  // Default content (can be fetched from API or CMS later)
  const initialContent =
    "<p>Edit your <strong>Privacy Policy</strong> with full formatting tools. Make sure all legal requirements are addressed.</p>";

  // Save handler
  const handleSave = () => {
    setSaving(true);
    const content = editorRef.current ? editorRef.current.getContent() : initialContent;
    setTimeout(() => {
      setSaving(false);
      alert("Privacy Policy has been saved!\n\n" + content);
    }, 1200);
  };

  return (
    <div>
      <PageMeta
        title="Privacy Policy | Admin Dashboard"
        description="Edit Privacy Policy content."
      />
      <PageBreadcrumb pageTitle="Privacy Policy" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Privacy Policy Editor
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-8">
          <div>
            <label htmlFor="privacy-editor" className="block mb-3 font-medium text-gray-700 dark:text-gray-200">
              Privacy Policy Content
            </label>
            <Editor
              id="privacy-editor"
              onInit={(_, editor) => (editorRef.current = editor)}
              initialValue={initialContent}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline | ' +
                  'alignleft aligncenter alignright alignjustify | bullist numlist | ' +
                  'link table code fullscreen',
                skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
                content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
              }}
            />
          </div>
          <div className="flex justify-end mt-5">
            <button
              className={`px-8 py-2 bg-blue-600 text-white rounded-lg font-medium shadow transition
                ${saving ? "opacity-70 cursor-wait" : "hover:bg-blue-700"}`}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          Edit or update the Privacy Policy using a full rich text editor. Notify your legal advisor of any major changes.
        </div>
      </div>
    </div>
  );
}
