import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function FeeManager() {
  return (
    <>
      <PageMeta
        title="Fee Manager | Edit Commission & Membership Rate"
        description="Manage and edit commission and membership rates from the Fee Manager table view."
      />
      <PageBreadcrumb pageTitle="Fee Manager" />
      <div className="space-y-6">
        <ComponentCard title="Edit Commission & Membership Rate">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
