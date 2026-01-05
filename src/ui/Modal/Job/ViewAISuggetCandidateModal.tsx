/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Modal, Checkbox } from "antd";
import { IJob, ITopApplication } from "../../../types";
import { HiOutlineSparkles } from "react-icons/hi";
import ReuseButton from "../../Button/ReuseButton";
import { TbSend } from "react-icons/tb";
import {
  useGetAllAITopPlacementCandidatesQuery,
  useSendMultipleCvMutation,
} from "../../../redux/features/jobBoard/jobBoardApi";
import ReuseInput from "../../Form/ReuseInput";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import SpinLoader from "../../SpinLoader";
import ReusableForm from "../../Form/ReuseForm";

interface ViewAISuggetCandidateModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IJob | null;
}

const ViewAISuggetCandidateModal: React.FC<ViewAISuggetCandidateModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const [sendMultipleCv] = useSendMultipleCvMutation();

  const { data, isFetching } = useGetAllAITopPlacementCandidatesQuery(
    { path: currentRecord?._id },
    {
      skip: !currentRecord?._id || !isViewModalVisible,
      refetchOnMountOrArgChange: true,
    }
  );

  const topCandidate = data?.data || [];

  console.log(topCandidate)

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  const isSelected = (id: string) => selectedIds.includes(id);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );

    if (!checked) {
      setAdminNotes((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleAdminNoteChange = (id: string, value: string) => {
    setAdminNotes((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSendCVs = async () => {
    if (!selectedIds.length) {
      return Modal.warning({
        title: "No candidate selected",
        content: "Please select at least one candidate.",
      });
    }

    const hasEmptyNote = selectedIds.some((id) => !adminNotes[id]?.trim());

    if (hasEmptyNote) {
      return Modal.warning({
        title: "Admin note required",
        content: "Please add admin notes for all selected candidates.",
      });
    }

    const payload = {
      applications: selectedIds.map((id) => ({
        applicationId: id,
        adminNotes: adminNotes[id],
      })),
    };

    const res = await tryCatchWrapper(
      sendMultipleCv,
      { body: payload },
      "Sending..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      setSelectedIds([]);
      setAdminNotes({});
      handleCancel();
    }
  };

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      centered
      width={1000}
      className="max-w-[90vw]"
      footer={null}
      closeIcon={<span className="text-2xl text-gray-500">×</span>}
    >
      <div className="py-10">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
          Send CVs: {currentRecord?.title}
        </h1>

        <div className="text-sm sm:text-base lg:text-lg text-[#505050] font-semibold mb-4">
          Select candidates to forward to{" "}
          {currentRecord?.employerId?.companyName}
        </div>

        <div className="flex items-start gap-2 mb-6 text-sm sm:text-base lg:text-lg text-secondary-color border-2 border-secondary-color bg-[#EDF7FF] rounded-lg p-4">
          <HiOutlineSparkles className="text-2xl mt-1" />
          <div>
            <p className="font-bold">AI Suggestion:</p>
            <p>
              The three most suitable candidates have been identified for this
              role.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 my-6" />

        <ReusableForm handleFinish={() => { }} form={form}>
          {isFetching ? (
            <SpinLoader />
          ) : (
            topCandidate.map((candidate: ITopApplication) => (
              <div
                key={candidate._id}
                className={`relative mb-6 p-6 rounded-lg border-2 transition-all ${isSelected(candidate._id)
                  ? "border-secondary-color bg-blue-50"
                  : "border-gray-300 bg-white"
                  }`}
              >
                <div className="flex gap-2">
                  <Checkbox
                    checked={isSelected(candidate._id)}
                    onChange={(e) =>
                      handleCheckboxChange(candidate._id, e.target.checked)
                    }
                  />{" "}
                  <h4 className="text-xl lg:text-2xl font-bold text-secondary-color">
                    {candidate?.candidateId?.name}
                  </h4>
                </div>

                <div className="font-semibold text-gray-600 mb-2">
                  {candidate?.jobId?.title}
                </div>

                <div className="text-sm text-base-color space-y-1">
                  <div>
                    <strong>Experience:</strong>{" "}
                    {candidate?.candidateId?.yearsOfExperience}
                  </div>
                  <div>
                    <strong>Location:</strong>{" "}
                    {candidate?.candidateId?.location}
                  </div>
                  <div>
                    <strong>Area:</strong>{" "}
                    {candidate?.candidateId?.area}
                  </div>
                  <div>
                    <strong>County:</strong>{" "}
                    {candidate?.candidateId?.county}
                  </div>
                  <div>
                    <strong>Postal Code:</strong>{" "}
                    {candidate?.candidateId?.postalCode}
                  </div>
                  <div>
                    <strong>Availability:</strong>{" "}
                    {candidate?.candidateId?.availability}
                  </div>
                  <div>
                    <strong>Matched Skills:</strong>{" "}
                    {candidate?.matchedSkills?.join(", ")}
                  </div>
                </div>

                <div className="mt-4 font-bold text-secondary-color">
                  AI Match: {candidate.aiScore}% {candidate?.aiReason}
                </div>

                <div className="mt-5">
                  <div className="font-semibold">Bio</div>
                  <div className="mt-1 p-4 bg-gray-100 rounded border">
                    <span className="text-gray-500 italic">
                      {candidate?.candidateId?.bio}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="font-semibold">Admin Note</div>
                  <ReuseInput
                    inputType="textarea"
                    name={`adminNote-${candidate._id}`}
                    placeholder={
                      isSelected(candidate._id)
                        ? "Enter admin note (required)"
                        : "Select candidate to add note"
                    }
                    value={adminNotes[candidate._id] || ""}
                    disabled={!isSelected(candidate._id)}
                    rules={[
                      {
                        required: isSelected(candidate._id),
                        message: "Please add admin note",
                      },
                    ]}
                    onChange={(e: any) =>
                      handleAdminNoteChange(candidate._id, e.target.value)
                    }
                  />
                </div>
              </div>
            ))
          )}
        </ReusableForm>

        <div className="border-t border-gray-300 my-6" />

        <div className="flex justify-between items-center">
          <span className="font-bold">
            Selected: {selectedIds.length} candidates
          </span>

          <ReuseButton
            variant="secondary"
            className="w-fit"
            onClick={handleSendCVs}
          >
            <TbSend />
            Send CVs
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAISuggetCandidateModal;
