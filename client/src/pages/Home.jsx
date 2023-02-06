import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState('Active Campaigns')
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }
  useEffect(()=> {
    if(contract) fetchCampaigns();
  }, [address, contract]);


  return (
    <div>
      <DisplayCampaigns
        title={filter}
        setFilter={setFilter}
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  )
}

export default Home