"use client";
import { Modal } from "antd";
import { IJob } from "../../../types";

const ViewJobModal = ({
  isModalVisible,
  handleCancel,
  currentRecord,
}: {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IJob | null;
}) => {
  return (
    <Modal
      open={isModalVisible}
      onCancel={() => {
        handleCancel();
      }}
      footer={null}
      centered
      className="lg:!w-[900px]"
    >
      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl  font-bold">
          {currentRecord?.title}
        </h2>
        <div className="mt-10">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5">
            Job Description
          </h4>
          <p className="text-sm sm:text-base lg:text-lg mt-1">
            {currentRecord?.description}
          </p>
        </div>
        <div className="mt-5">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Key Responsibilities
          </h4>
          <ul className="text-sm sm:text-base lg:text-lg mt-1 list-disc list-inside">
            {currentRecord?.requirements?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Requirements
          </h4>
          <ul className="text-sm sm:text-base lg:text-lg mt-1 list-disc list-inside">
            {currentRecord?.requirements?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5 mb-10">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Skill Requirements
          </h4>
          <ul className="text-sm sm:text-base lg:text-lg mt-1 list-disc list-inside">
            {currentRecord?.skillsRequired?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5 mb-10">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Benefits
          </h4>
          <ul className="text-sm sm:text-base lg:text-lg mt-1 list-disc list-inside">
            {currentRecord?.benefits?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ViewJobModal;
