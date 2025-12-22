/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";
import { useState } from "react";
import useUserData from "../../hooks/useUserData";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import SpinLoader from "../../ui/SpinLoader";
import { useGetAllNotificationsQuery } from "../../redux/features/overview/overviewApi";
import { INotification } from "../../types";
import { formatDate } from "../../utils/dateFormet";

const Topbar = ({ collapsed, setCollapsed }: any) => {
  const serverUrl = getImageUrl();
  const [open, setOpen] = useState(false);
  console.log(open);

  const user = useUserData();
  const { data, isFetching } = useGetProfileQuery({});

  const profileData = data?.data;

  const profileImage = profileData?.profileImage;

  const { data: notification, isFetching: notificationFetching } =
    useGetAllNotificationsQuery(
      {
        page: 1,
        limit: 5,
      },
      {
        skip: !open,
        refetchOnMountOrArgChange: open,
      }
    );
  const notificationData: INotification[] = notification?.data?.result || [];

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {notificationFetching ? (
        <div className="flex justify-center items-center w-80">
          <SpinLoader />
        </div>
      ) : (
        notificationData?.map((notification) => (
          <div className="test-start" key={notification?._id}>
            <div className="flex gap-2">
              <BellFilled className="!text-secondary-color " />
              <div className="flex flex-col items-start">
                <p>{notification?.message}</p>
                <p className="text-gray-400">
                  {formatDate(notification?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto bg-[#022940] !text-secondary-color rounded !font-semibold !text-base py-1"
      >
        See More
      </Link>
    </div>
  );
  return (
    <div className=" mx-auto flex justify-between gap-0 items-center mt-2">
      <div className="flex items-center gap-2 text-primary-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl !text-base-color"
        />
      </div>
      <div className="flex items-center justify-center  gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          onOpenChange={(open: boolean) => {
            setOpen(open);
          }}
          className="cursor-pointer"
        >
          <BellFilled
            shape="circle"
            className="bg-primary-color py-[18px] px-2 text-xl rounded-full h-6 font-bold !text-secondary-color "
          />
        </Dropdown>
        {isFetching ? (
          <div className="px-10 py-4">
            <SpinLoader />
          </div>
        ) : (
          <Link to="profile">
            <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1  border border-secondary-color ">
              <img
                src={
                  profileImage ? serverUrl + profileImage : AllImages.profile
                }
                alt="profile_pic"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
                className="rounded-full"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base-color font-semibold text-sm">
                  {profileData?.name}
                </p>
                <p className="text-base-color text-xs">Admin</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Topbar;
