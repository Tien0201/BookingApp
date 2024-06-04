import useFetch from "../../hooks/useFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {


  const {data,loading,error} = useFetch("http://localhost:8800/api/hotels/getAll")


  return (
    <div className="fp">
        {loading ? "Loading" : <>
      { data.map(item => (
      <div className="fpItem" key = {item._id}>
        <img
          src= {item.photos[0]}
          alt=""
          className="fpImg"
        />
        <span className="fpName"><b>{item.name}</b></span>
        <span className="fpCity"><b>{item.city}</b></span>
        <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
        {item.rating &&  <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>
        }

      </div> 
      ))}
        </>}
    </div>
  );
};

export default FeaturedProperties;
