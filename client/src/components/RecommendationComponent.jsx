import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
const RecommendationComponent = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);

  function Clickme(){
   
    window.location.reload();
    
  }
  
 
  useEffect(() => {
    const fetchRecommendedItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/recommend');
        setRecommendedItems(response.data.recommended_vehicles);
        console.log(response.data.recommended_vehicles)
      } catch (error) {
        console.error('Error fetching recommended items:', error);
      }
       
    };
    fetchRecommendedItems()
    
  }, []);

 
  return (
    <>
      <h2>Recommended Vehicles</h2>
      {/* <Row justify="center" gutter={16} className="mt-5"> */}
      {/* <Col lg={5} md={12} sm={24} xs={24}> */}
      <div className=" container d-flex justify-content-between flex-wrap">
        {recommendedItems.slice(0,5+1).map((item) => (
            <div className="car p-2 bs1 mt-3 " key={String(item._id)}>
              <img src={item.image} className="carimg" />
              <div className="car-content d-flex align-items-center justify-content-between">
                <div >
                  <p>{item.name}</p>
                  <p> Rent Per Hour {item.rentPerHour} /-</p>
                </div>
                <div>
                  <button className="btn1 mr-2" onClick={Clickme}><Link to={`/booking/${item._id}`}>Book Now</Link></button>
                </div>
                
              </div>
            </div>
      
        ))}
         </div>
         {/* </Row> */}
    
    </>
  );
};

export default RecommendationComponent;
