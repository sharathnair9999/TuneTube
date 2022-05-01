import React from "react";
import { EmptyData, HorizontalCard } from "../../components";
import { useAuth } from "../../contexts";
import "./History.css";

const History = () => {
  const {
    userState: { history },
  } = useAuth();

  return (
    <div className="flex-col flex justify-fs items-fs  gap-1 p-sm">
      <p className=" title">{`History ${
        history.length > 0 ? `- ${history.length}` : ""
      }`}</p>
      {history.length === 0 ? (
        <EmptyData msg={"You haven't watched anything yet"} url={"/explore"} />
      ) : (
        <div className="flex justify-center items-center flex-col gap-sm w-100">
          {history.map((video, sNo) => (
            <HorizontalCard
              video={video}
              key={video._id}
              sNo={sNo}
              historyCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
