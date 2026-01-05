import { Modal } from "antd";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { ICandidate } from "../../../types";
import { formatDate } from "../../../utils/dateFormet";
import { AllImages } from "../../../../public/images/AllImages";
interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ICandidate | null;
}
const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord)
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[700px]"
    >
      <div className=" mt-10">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={currentRecord?.profileImage && currentRecord.profileImage.length > 0 ? serverUrl + currentRecord.profileImage : AllImages.profile}
            alt={currentRecord?.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-secondary-color"
          />
          <div>
            <h1 className="text-2xl font-bold">{currentRecord?.name}</h1>
            <p className="text-gray-500">
              {currentRecord?.candidateProfileId?.designation}
            </p>
            <p className="text-gray-400 text-sm">
              Status: {currentRecord?.status}
            </p>
          </div>
        </div>

        {/* Contact & Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Email</h2>
            <p className="text-gray-600">{currentRecord?.email}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Phone</h2>
            <p className="text-gray-600">{currentRecord?.phone}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Location</h2>
            <p className="text-gray-600">
              {currentRecord?.candidateProfileId?.location}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Town</h2>
            <p className="text-gray-600">
              {currentRecord?.candidateProfileId?.area}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">County</h2>
            <p className="text-gray-600">
              {currentRecord?.candidateProfileId?.county}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Postal Code</h2>
            <p className="text-gray-600">
              {currentRecord?.candidateProfileId?.postalCode}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Availability</h2>
            <p className="text-gray-600">
              {currentRecord?.candidateProfileId?.availability}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Date of Birth</h2>
            <p className="text-gray-600">
              {formatDate(currentRecord?.candidateProfileId?.dateOfBirth)}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">Experience</h2>
            <p className="text-gray-600">
              {currentRecord?.candidateProfileId?.yearsOfExperience} years
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">Bio</h2>
          <p className="text-gray-600">
            {currentRecord?.candidateProfileId?.bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(currentRecord?.candidateProfileId?.skills?.length as number) >
              0 ? (
              currentRecord?.candidateProfileId?.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-secondary-color/10 text-secondary-color rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills added</p>
            )}
          </div>
        </div>
        {/* qualifications */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">Qualifications</h2>
          <div className="flex flex-wrap gap-2">
            {(currentRecord?.candidateProfileId?.qualifications
              ?.length as number) > 0 ? (
              currentRecord?.candidateProfileId?.qualifications.map(
                (skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-secondary-color/10 text-secondary-color rounded-full text-sm"
                  >
                    {skill}
                  </span>
                )
              )
            ) : (
              <p className="text-gray-500">No qualifications added</p>
            )}
          </div>
        </div>

        {/* CV Download */}
      </div>
    </Modal>
  );
};

export default UserModal;
