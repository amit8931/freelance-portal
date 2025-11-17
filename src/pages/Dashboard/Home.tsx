import PageMeta from "../../components/common/PageMeta";
import AdminMetrics from "../../components/admin/AdminMetrics";


export default function Home() {
  return (
    <>
      <PageMeta
        title="Admin Dashboard | Super Admin Portal"
        description="Admin Dashboard - Manage users, projects, revenue, and disputes"
      />
     
      <div className="flex flex-col gap-6">
        <AdminMetrics />
      </div>
    </>
  );
}
