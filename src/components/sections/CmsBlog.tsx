import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";

type BlogPost = {
  id: number;
  title: string;
  body: string;
  date: string;
};

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to Our Platform",
    body:
      "<p>Discover the features of our freelance marketplace and get started today.</p>",
    date: "2025-11-17",
  },
  {
    id: 2,
    title: "Tips for Successful Freelancing",
    body:
      "<ul><li>Build a strong portfolio</li><li>Communicate clearly</li><li>Deliver work on time</li></ul>",
    date: "2025-11-10",
  },
];

export default function CmsBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const editorRef = useRef<any>(null);

  // Open modal for new post or editing
  const openModal = (post?: BlogPost) => {
    setModalOpen(true);
    if (post) {
      setEditId(post.id);
      setTitle(post.title);
      setTimeout(() => {
        if (editorRef.current) editorRef.current.setContent(post.body);
      }, 0);
    } else {
      setEditId(null);
      setTitle("");
      setTimeout(() => {
        if (editorRef.current) editorRef.current.setContent("");
      }, 0);
    }
  };

  // Save post (new or edit)
  const handleSave = () => {
    const content = editorRef.current ? editorRef.current.getContent() : "";
    if (!title.trim() || !content.trim()) return;

    if (editId) {
      // Edit existing
      setPosts((current) =>
        current.map((p) =>
          p.id === editId ? { ...p, title, body: content } : p
        )
      );
    } else {
      // Add new
      setPosts([
        {
          id: Date.now(),
          title: title.trim(),
          body: content,
          date: new Date().toISOString().slice(0, 10),
        },
        ...posts,
      ]);
    }

    setModalOpen(false);
    setEditId(null);
    setTitle("");
  };

  // Delete post
  const handleDelete = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div>
      <PageMeta
        title="Blog Management | Admin Dashboard"
        description="Manage blog posts."
      />
      <PageBreadcrumb pageTitle="Blog Management" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Blog Post Management</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm"
            onClick={() => openModal()}
          >
            + New Post
          </button>
        </div>
        {/* Blog Posts Table/List */}
        <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800 shadow mb-8">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td className="px-4 py-5 text-gray-500 dark:text-gray-400" colSpan={3}>
                    No blog posts found.
                  </td>
                </tr>
              ) : (
                posts.map(post => (
                  <tr key={post.id} className="bg-white even:bg-gray-50 dark:bg-gray-900 dark:even:bg-gray-800">
                    <td className="px-4 py-3 font-semibold">{post.title}</td>
                    <td className="px-4 py-3">{post.date}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => openModal(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline font-medium"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Edit/New Post Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-2xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4">
                {editId ? "Edit Post" : "Create New Post"}
              </h3>
              <input
                type="text"
                placeholder="Post Title"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 mb-4"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <Editor
                id="blog-editor"
                onInit={(_, editor) => (editorRef.current = editor)}
                initialValue={editId
                  ? posts.find(p => p.id === editId)?.body || ""
                  : ""}
                init={{
                  height: 250,
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
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-5 py-2 bg-gray-200 dark:bg-gray-800 rounded font-semibold"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 bg-blue-600 text-white rounded font-semibold"
                  onClick={handleSave}
                >
                  {editId ? "Save Changes" : "Create Post"}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="text-gray-500 dark:text-gray-400">
          Create, edit, and organize blog posts here.
        </div>
      </div>
    </div>
  );
}
