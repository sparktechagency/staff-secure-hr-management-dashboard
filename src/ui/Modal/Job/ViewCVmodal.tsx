/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { getImageUrl } from "../../../helpers/config/envConfig";

interface ViewCVModalProps {
  isViewCVModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
  url: string;
}

const ViewCVModal: React.FC<ViewCVModalProps> = ({
  isViewCVModalVisible,
  handleCancel,
  currentRecord,
  url,
}) => {
  const serverUrl = getImageUrl();
  return (
    <Modal
      // title="Confirm Delete"
      open={isViewCVModalVisible}
      onOk={handleCancel}
      onCancel={handleCancel}
      okText="Block"
      cancelText="Cancel"
      centered
      className="!w-[90%] !max-w-[1000px]"
      footer={false}
    >
      <p className="text-xl font-semibold pt-10 pb-4 text-secondary-color">
        {currentRecord?.name}
      </p>

      <iframe
        src={serverUrl + url}
        width="100%"
        height="800px"
        allowFullScreen
      ></iframe>
    </Modal>
  );
};

export default ViewCVModal;
