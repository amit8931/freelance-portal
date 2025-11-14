import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email Address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  randomuser@pimjo.com
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Professional Title
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Full Stack Developer
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Languages
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  English, Spanish
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                 KYC Verification
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Uploaded
                </p>
              </div>
            </div>
          </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          {/* Edit icon svg */}
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="custom-scrollbar h-[600px] overflow-y-auto px-2 pb-3">
              {/* Social Links section (existing) */}

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <Label>Profile Photo Upload</Label>
                <input type="file" accept="image/*" className="w-full border border-gray-300 rounded-md p-2" />
              </div>

            <div>
              <Label>Professional Title</Label>
              <Input type="text" placeholder="Full Stack Developer" />
            </div>

            <div className="col-span-2">
              <Label>Profile Description</Label>
              <textarea
                rows={4}
                placeholder="Summary of expertise (more than 100 words)"
                className="w-full border border-gray-300 rounded-md p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div>
              <Label>Languages Spoken</Label>
              <Input type="text" placeholder="e.g., English, Spanish" />
            </div>

            <div>
              <Label>Portfolio (URLs or Upload)</Label>
              <Input type="text" placeholder="https://portfolio.com" />
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <Label>Certifications (optional)</Label>
              <Input type="text" placeholder="Certification names or upload" />
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <Label>Education (optional)</Label>
              <Input type="text" placeholder="School, Degree, Year" />
            </div>

            <div className="col-span-2">
              <Label>KYC Verification (ID proof upload) <span className="text-red-500">*</span></Label>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
