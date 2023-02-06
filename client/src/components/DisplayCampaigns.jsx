import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard.jsx";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const [filter, setFilter] = useState("Active Campaigns");
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const filteredCampaigns = (filter) => {
    return campaigns.filter(filter === filter);
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        <select
          className="bg-[#1c1c24]"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All Campaigns">All Campaigns</option>
          <option value="Expired Campaigns">Expired Campaigns</option>
          <option value="Active Campaigns" selected>
            Active Campaigns
          </option>
        </select>
        (
        {campaigns && filter === "All Campaigns"
          ? campaigns.length
          : filteredCampaigns.length}
        )
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet!
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              filter={filter}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
