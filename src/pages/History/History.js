import React from "react";
import { constants } from "../../app-utils";
import { EmptyData, HorizontalCard } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";

const History = () => {
  const {
    userState: { history },
    emptyHistory,
  } = useAuth();

  const { titles } = constants;
  useDocumentTitle(titles.history());

  return (
    <div className=" history flex-col flex justify-fs items-fs  gap-1 p-sm">
      <div className="w-100 flex justify-space-btw items-center">
        <span className=" title">{`History ${
          history.length > 0 ? `- ${history.length}` : ""
        }`}</span>
        <section className="flex-and-center gap-sm">
          <button
            onClick={() => emptyHistory()}
            className="btn-transparent btn-primary p-sm border-rounded-sm "
          >
            Clear History
          </button>
        </section>
      </div>
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
