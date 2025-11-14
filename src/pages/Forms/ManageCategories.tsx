import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function CategoryManager() {
  return (
    <div>
      <PageMeta
        title="Super Admin - Category Manager | Dashboard"
        description="Manage skills and categories: create, view, edit, and delete in the super admin dashboard."
      />
      <PageBreadcrumb pageTitle="Category Manager" />

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        {/* Left: Category/Skill Creation & Editing */}
        <div className="space-y-8 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold">Add / Edit Category or Skill</h2>
          <form>
            <FloatingLabelInput label="Name *" type="text" placeholder="Enter category or skill name" />
            <FloatingLabelTextarea label="Description" placeholder="Describe this category or skill" />
            <FloatingLabelSelect label="Parent Category" >
              <option value="">Select Parent (optional)</option>
              {/* Map your category list here */}
            </FloatingLabelSelect>
            <FloatingLabelInput label="Icon Upload" type="file" accept="image/*" />
            <div className="mb-4 flex items-center">
              <input type="checkbox" className="mr-2" id="isActive" />
              <label htmlFor="isActive" className="select-none">Is Active</label>
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" className="mr-2" id="showFrontend" />
              <label htmlFor="showFrontend" className="select-none">Show on Frontend</label>
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
            >
              Add Category/Skill
            </button>
          </form>
        </div>

        {/* Right: List / Management */}
        <div className="space-y-8 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold">Manage Categories & Skills</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Parent</th>
                <th className="px-4 py-2">Icon</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Web Development</td>
                <td className="px-4 py-2">Frontend & backend projects</td>
                <td className="px-4 py-2">None</td>
                <td className="px-4 py-2">[Icon]</td>
                <td className="px-4 py-2">Active</td>
                <td className="px-4 py-2">
                  <button className="mr-2 text-blue-600">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FloatingLabelInput({ label, type, placeholder, accept }: { label: string; type: string; placeholder?: string; accept?: string }) {
  return (
    <label className="relative block w-full mb-6 group">
      <input
        type={type}
        placeholder=" "
        accept={accept}
        className="peer block w-full rounded border border-gray-300 bg-transparent px-3 pt-6 pb-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
      />
      <span className="absolute left-3 top-2 text-sm text-gray-500 transition-all transform scale-100 origin-left scale-100 pointer-events-none peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:text-blue-600">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-focus-within:w-full"></span>
    </label>
  );
}

function FloatingLabelTextarea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="relative block w-full mb-6 group">
      <textarea
        placeholder=" "
        className="peer block w-full rounded border border-gray-300 bg-transparent px-3 pt-6 pb-2 text-gray-900 placeholder-transparent resize-y focus:border-blue-500 focus:outline-none focus:ring-0"
      />
      <span className="absolute left-3 top-2 text-sm text-gray-500 transition-all transform scale-100 origin-left scale-100 pointer-events-none peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:text-blue-600">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-focus-within:w-full"></span>
    </label>
  );
}

function FloatingLabelSelect({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="relative block w-full mb-6 group">
      <select
        className="peer block w-full rounded border border-gray-300 bg-transparent px-3 pt-6 pb-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
        defaultValue=""
      >
        {children}
      </select>
      <span className="absolute left-3 top-2 text-sm text-gray-500 transition-all transform origin-left scale-100 pointer-events-none peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-focus-within:w-full"></span>
    </label>
  );
}
