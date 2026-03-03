import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import { useCreateCandidateProfileMutation } from "../../../redux/features/users/usersApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AddCandidateModalProps {
    isAddModalVisible: boolean;
    handleCancel: () => void;
}

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({
    isAddModalVisible,
    handleCancel,
}) => {
    const [form] = Form.useForm();
    const [createCandidateProfile, { isLoading }] = useCreateCandidateProfileMutation();

    const handleFinish = async (values: Record<string, unknown>) => {
        const formData = new FormData();
        formData.append("name", values.name as string);
        formData.append("email", values.email as string);

        const cvList = values.cv as { originFileObj: File }[];
        if (cvList?.[0]?.originFileObj) {
            formData.append("image", cvList[0].originFileObj);
        }

        const res = await tryCatchWrapper(
            createCandidateProfile,
            { body: formData },
            "Creating candidate..."
        );

        if (res?.statusCode === 200) {
            form.resetFields();
            handleCancel();
        }
    };

    return (
        <Modal
            open={isAddModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            className="lg:!w-[700px]"
        >
            <div className="mt-6 px-2">
                <h2 className="text-xl font-semibold mb-4">Add Candidate</h2>
                <ReusableForm form={form} handleFinish={handleFinish}>
                    <ReuseInput
                        label="Name"
                        name="name"
                        placeholder="Enter candidate name"
                        rules={[{ required: true, message: "Name is required" }]}
                    />
                    <ReuseInput
                        label="Email"
                        name="email"
                        placeholder="Enter candidate email"
                        type="email"
                        rules={[
                            { required: true, message: "Email is required" },
                            { type: "email", message: "Enter a valid email" },
                        ]}
                    />
                    <ReuseUpload
                        label="Upload CV"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        buttonText="Upload CV"
                        maxCount={1}
                        rules={[{ required: true, message: "CV is required" }]}
                    />
                    <ReuseButton htmlType="submit" variant="secondary" className="mt-2" loading={isLoading}>
                        Submit
                    </ReuseButton>
                </ReusableForm>
            </div>
        </Modal>
    );
};

export default AddCandidateModal;
