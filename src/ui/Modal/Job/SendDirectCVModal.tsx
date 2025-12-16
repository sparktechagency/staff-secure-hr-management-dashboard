/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { useSendDirectCvMutation } from "../../../redux/features/jobBoard/jobBoardApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { IAppliciantData } from "../../../types";
interface SendDirectCVModalProps {
  isSendDirectCVModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IAppliciantData | null;
  showInput?: boolean;
}

const SendDirectCVModal: React.FC<SendDirectCVModalProps> = ({
  isSendDirectCVModalVisible,
  handleCancel,
  currentRecord,
  showInput = true,
}) => {
  const [form] = Form.useForm();
  const [sendDirectCv] = useSendDirectCvMutation();

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      sendDirectCv,
      { body: values, params: { id: currentRecord?._id } },
      "Sending..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isSendDirectCVModalVisible}
      onCancel={handleCancel}
      okText="Unblock"
      cancelText="Cancel"
      centered
      footer={false}
    >
      <h3 className="!text-2xl my-8 !font-bold !text-secondary-color">
        Are you sure to send {currentRecord?.candidateId?.name} CV?
      </h3>

      <ReusableForm form={form} handleFinish={handleFinish}>
        {showInput && (
          <ReuseInput
            inputType="textarea"
            name="adminNotes"
            labelClassName="!font-bold !text-base-color"
            label="Admin Notes"
            placeholder="Enter Admin Notes"
            rules={[{ required: true, message: "Please input admin notes!" }]}
          />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className=" flex items-center justify-center gap-2 !bg-success !border-success"
          >
            Submit
          </ReuseButton>
        </div>
      </ReusableForm>
    </Modal>
  );
};

export default SendDirectCVModal;
