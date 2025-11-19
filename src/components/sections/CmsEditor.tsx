import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";

export default function CmsEditor() {
  const cmsItems = [
    {
      title: "Terms & Conditions",
      description: "Edit terms that govern site usage and contracts.",
      path: "/components/sections/cms-terms",
    },
    {
      title: "Privacy Policy",
      description: "Manage site privacy policy, data and user privacy content.",
      path: "/components/sections/cms-privacy",
    },
    {
      title: "FAQs",
      description: "Add, remove, or update frequently asked questions.",
      path: "/components/sections/cms-faqs",
    },
    {
      title: "Blog",
      description: "Post, manage, or delete blog articles and announcements.",
      path: "/components/sections/cms-blog",
    },
  ];

  return (
    <div>
      <PageMeta
        title="CMS Content Management | Admin Dashboard"
        description="Edit and manage CMS pages: Terms, Privacy, FAQs, Blog."
      />
      <PageBreadcrumb pageTitle="CMS Content Management" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          CMS Content Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {cmsItems.map(item => (
            <div
              key={item.title}
              className="flex flex-col justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 mb-4 text-sm">{item.description}</p>
              </div>
              <div>
                <a
                  href={item.path}
                  className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm text-center transition"
                >
                  Manage {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-6">
          Use this section to manage core CMS pages and content.
        </p>
      </div>
    </div>
  );
}
