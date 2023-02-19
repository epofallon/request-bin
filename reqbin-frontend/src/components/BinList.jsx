import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BinList = () => {
  const [bins, setBins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBinIds = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/bins");
        setBins(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getBinIds();
  }, []);

  const handleBinClick = ({ target }) => {
    // navigate to the bin's page
    const binId = target.dataset.id;
    console.log(binId);
    navigate(`/bins/${binId}`);
  };

  return (
    <div className="block">
      <h2>Your Bins</h2>
      <button className="button">
        <strong>+</strong> New Bin
      </button>
      <p>This list is based on bins created at your IP address.</p>
      <ul className="binList">
        {bins.map((binId) => (
          <li
            key={binId}
            data-id={binId}
            className="binListItem"
            onClick={handleBinClick}
          >
            {binId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BinList;
