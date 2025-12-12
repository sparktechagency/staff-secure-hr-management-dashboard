/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import CandidatesTable from "../../ui/Tables/CandidatesTable";
import DeleteModal from "../../ui/Modal/DeleteModal";

const AdminAllCandidates = () => {
  const data: any = [
    {
      id: 223,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas.pdf",
    },
    {
      id: 224,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas2.pdf",
    },
    {
      id: 225,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas3.pdf",
    },
    {
      id: 226,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas4.pdf",
    },
    {
      id: 227,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas5.pdf",
    },
    {
      id: 228,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas6.pdf",
    },
    {
      id: 229,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas7.pdf",
    },
    {
      id: 230,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas8.pdf",
    },
    {
      id: 231,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas9.pdf",
    },
    {
      id: 232,
      name: "Lucas Jhonson",
      role: "Electrical",
      location: "Manchester, UK",
      experience: "3 Years",
      availability: "Immediate",
      skills: ["Skill 1", "Skill 2"],
      cvUrl: "https://example.com/cv/lucas10.pdf",
    },
  ];
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const limit = 12;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const showDeleteModal = (data: any) => {
    setIsDeleteModalVisible(true);
    setCurrentRecord(data);
  };
  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" bg-primary-color rounded-xl p-4 min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold ">
          Candidates
        </p>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <CandidatesTable
        data={data}
        loading={false}
        setPage={setPage}
        showDeleteModal={showDeleteModal}
        page={page}
        total={0}
        limit={limit}
      />
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminAllCandidates;
