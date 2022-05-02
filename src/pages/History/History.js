import React from "react";
import { toast } from "react-toastify";
import { constants } from "../../app-utils";
import { EmptyData, HorizontalCard } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";
import "./History.css";

const History = () => {
  const {
    userState: { history, enableHistory },
    userDispatch,
    emptyHistory,
  } = useAuth();

  const { titles } = constants;
  useDocumentTitle(titles.history());

  return (
    <div className=" history flex-col flex justify-fs items-fs  gap-1 p-sm">
      <p className="w-100 flex justify-space-btw items-center">
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
          <label className="switch">
            <input
              type="checkbox"
              checked={enableHistory}
              onChange={(e) => {
                userDispatch({
                  type: "ENABLE_HISTORY",
                  payload: e.target.checked,
                });
                e.target.checked
                  ? toast.success("Your History has been enabled!")
                  : toast.success("You Disabled History");
              }}
            />
            <span className="slider round"></span>
          </label>
        </section>
      </p>
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
