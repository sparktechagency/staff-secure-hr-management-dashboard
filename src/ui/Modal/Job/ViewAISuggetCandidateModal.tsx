/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal } from "antd";
import { IJob } from "../../../types";
import { HiOutlineSparkles } from "react-icons/hi";
import ReuseButton from "../../Button/ReuseButton";
import { TbSend } from "react-icons/tb";

interface Candidate {
  id: number;
  name: string;
  title: string;
  experience: string;
  location: string;
  availability: string;
  matchedSkills: string;
  aiMatch: string;
}

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
  // Mock data - replace with real data later
  const candidates: Candidate[] = [
    {
      id: 1,
      name: "David Wilson",
      title: "Electrical Engineer",
      experience: "3 Year",
      location: "Birmingham, UK",
      availability: "Immediate",
      matchedSkills: "AutoCAD, PLC, Power Systems",
      aiMatch: "92% - Highly suitable",
    },
    {
      id: 2,
      name: "David Wilson",
      title: "Electrical Engineer",
      experience: "3 Year",
      location: "Birmingham, UK",
      availability: "Immediate",
      matchedSkills: "AutoCAD, PLC, Power Systems",
      aiMatch: "92% - Highly suitable",
    },
    {
      id: 3,
      name: "David Wilson",
      title: "Electrical Engineer",
      experience: "3 Year",
      location: "Birmingham, UK",
      availability: "Immediate",
      matchedSkills: "AutoCAD, PLC, Power Systems",
      aiMatch: "92% - Highly suitable",
    },
  ];

  const [selectedIds, setSelectedIds] = useState<number[]>(
    candidates.map((c) => c.id)
  );

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isSelected = (id: number) => selectedIds.includes(id);

  const handleSendCVs = () => {
    console.log("Selected candidate IDs:", selectedIds);
    // Call your API or pass data to parent here
    handleCancel();
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
        {/* Top description */}
        <div className="text-sm sm:text-base lg:text-lg text-[#505050] font-semibold mb-4">
          Select candidates to forward to{" "}
          {currentRecord?.employerId?.companyName}
        </div>

        {/* All Suggestion line - no checkbox at all */}
        <div className="flex items-start gap-2 mb-6 text-sm sm:text-base lg:text-lg text-secondary-color border-2 border-secondary-color bg-[#EDF7FF] rounded-lg p-4">
          <HiOutlineSparkles className="text-2xl mt-1" />
          <div>
            <p className="font-bold">AI Suggestion:</p>
            <p className="">
              The three most suitable candidates have been identified for this
              role.
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-300 my-6" />

        {/* Candidate Cards */}
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => toggleSelect(candidate.id)}
            className={`mb-6 p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              isSelected(candidate.id)
                ? "border-secondary-color bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-500"
            }`}
          >
            <div className="ml-0">
              {" "}
              {/* No left space for any indicator */}
              <h4 className="text-xl lg:text-2xl font-bold mt-0 mb-2 text-secondary-color">
                {candidate.name}
              </h4>
              <div className="font-medium text-base mb-1">
                {candidate.title}
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                <div>Experience: {candidate.experience}</div>
                <div>Location: {candidate.location}</div>
                <div>Availability: {candidate.availability}</div>
                <div>Matched Skills: {candidate.matchedSkills}</div>
              </div>
              <div className="mt-2">
                <span className="text-green-600 font-semibold text-base">
                  AI Match: {candidate.aiMatch}
                </span>
              </div>
              {/* Bio */}
              <div className="mt-5">
                <div className="font-semibold">Bio</div>
                <div className="mt-1 p-4 bg-gray-100 rounded border border-gray-300 min-h-[80px]">
                  <span className="text-gray-500 italic">—</span>
                </div>
              </div>
              {/* Admin Note */}
              <div className="mt-5">
                <div className="font-semibold">Admin Note</div>
                <div className="mt-1 p-4 bg-gray-100 rounded border border-gray-300 min-h-[80px]">
                  <span className="text-gray-500 italic">Text</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom separator */}
        <div className="border-t border-gray-300 my-6" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm sm:text-base lg:text-lg">
            Selected: {selectedIds.length} candidates
          </span>

          <div className="flex gap-3">
            <ReuseButton
              variant="secondary"
              className="w-fit"
              onClick={handleSendCVs}
            >
              <TbSend className="" />
              Send CVs
            </ReuseButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAISuggetCandidateModal;
