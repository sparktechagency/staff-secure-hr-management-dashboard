/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "antd";
import { IJob } from "../../../types";
import { MdLocationOn } from "react-icons/md";
import { formatDate } from "../../../utils/dateFormet";

const ViewJobModal = ({
  isModalVisible,
  handleCancel,
  currentRecord,
}: {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IJob;
}) => {

  const annualPay = currentRecord?.paymentType === "Monthly"
    ? "£" + currentRecord?.salaryRange?.min * 12 + " - " + "£" + currentRecord?.salaryRange?.max * 12
    : "£" + currentRecord?.salaryRange?.min * currentRecord?.hourlyRequired * 52 + " - " + "£" + currentRecord?.salaryRange?.max * currentRecord?.hourlyRequired * 52;

  const information = [
    {
      name: "County",
      value: currentRecord?.county,
    },
    {
      name: "Payment Period",
      value: currentRecord?.paymentType,
    },
    {
      name: "Annual pay",
      value: annualPay,
    },
    {
      name: "Overtime Pay Rate",
      value: `£${currentRecord?.overtimePayRate} per hour`,
    },
    {
      name: "Hours Required per week",
      value: currentRecord?.hourlyRequired,
    },
    {
      name: "Start Date",
      value: formatDate(currentRecord?.startDate),
    },
    {
      name: "Working hours",
      value: currentRecord?.startTime + " - " + currentRecord?.finishTime,
    },
    {
      name: "Working Days",
      value: currentRecord?.daysOfWork?.join(", ")
    },
  ]


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
        <div className="flex items-center gap-1  mt-2">
          {" "}

          <span className="rounded-full bg-secondary-color px-3 py-1 text-xs lg:text-sm font-bold text-primary-color">
            {currentRecord?.lengthOfWork && currentRecord?.workType === "Temporary" ? currentRecord?.workType + " - " + currentRecord?.lengthOfWork : currentRecord?.workType}
          </span>
          <span className="rounded-full bg-secondary-color px-3 py-1 text-xs lg:text-sm font-bold text-primary-color">
            {currentRecord?.jobType}
          </span>
        </div>
        <div className="mt-3">
          <p className="text-sm sm:text-base lg:text-lg mt-1">
            {currentRecord?.description}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base font-medium mt-3">
          <MdLocationOn className="w-5 h-5 text-base-color" />
          Stree Address:  {currentRecord?.location}
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base font-medium mt-3">
          <MdLocationOn className="w-5 h-5 text-base-color" />
          Town: {currentRecord?.area}
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base font-medium mt-3">
          <MdLocationOn className="w-5 h-5 text-base-color" />
          County: {currentRecord?.county}
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base font-medium mt-3">
          <MdLocationOn className="w-5 h-5 text-base-color" />
          Postal Code:  {currentRecord?.postalCode?.slice(0, 3)}
        </div>
        <div className="mt-5 space-y-2">
          {
            information?.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-[#E1E1E1]">
                <span className="text-sm sm:text-base lg:text-lg font-medium">
                  {item?.name}:
                </span>
                <span className="text-sm sm:text-base lg:text-lg">
                  {item?.value}
                </span>
              </div>
            ))
          }
        </div>
        <div className="mt-8">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Candidate Required Duties
          </h4>
          <ul className="text-sm sm:text-base lg:text-lg mt-1 list-disc list-inside">
            {currentRecord?.candidateDuties?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Documents & certifications required
          </h4>
          <ul className="text-sm sm:text-base lg:text-lg mt-1 list-disc list-inside">
            {currentRecord?.documentationCertificates?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Benefits
          </h4>
          <ul className="text-sm sm:text-base lg:text-lg mt-1 list-disc list-inside">
            {currentRecord?.benefits?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5 mb-10">
          <h4 className="text-base sm:text-lg lg:text-xl font-bold mt-5 mb-2">
            Additional Information
          </h4>
          <p className="text-sm sm:text-base lg:text-lg mt-1">
            {currentRecord?.additionalInformation}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewJobModal;
