import { useEffect, useState } from "react"
import mockLevels from "../../mockData"
import { Link } from "react-router-dom"
import styles from "./level-selector.module.css"
import PropTypes from 'prop-types';


const createDisplayer =  (levels) => {
  return  (
  <ul className={styles.card_displayer}>
    {levels.map(level =>
        <li key={level._id}>
          <div className={styles.card}>
            <Link to={"level/"+level._id}>
              <h3>{level.name}</h3>
              <img src={level.img}/>
            </Link>
          </div>
        </li>
      )
    }
</ul>)
}

const createErrorMessage = (error) =>{
  return (
    <div>
      <h2>There was a problem</h2>
      <p>{error}</p>
    </div>
  )
}

const LoadPanel = () =>{

  return (
    <div className={styles.loading}>
      <h2>
        Getting Levels
      </h2>
      <div className={styles.grid}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  ) 
}

const LevelSelector = ({url}) => {
  const backendUrl = url + "level"

  const [levels, setLevels] = useState(mockLevels.levels)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    const getData = async () =>{
      try{
        const response = await fetch(backendUrl);

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const actualData = await response.json();
        setLevels(actualData.levels)

      }
      catch(err){
        console.log(err.message)
        setError(err.message);
      }
      finally{
        setLoading(false)
      }
    }
    getData();
  },[])

  return (
    <div>
      {error && createErrorMessage(error)}
      {loading
        ? <LoadPanel></LoadPanel>
        :createDisplayer(levels)
      }
    </div>
  )
}

LevelSelector.propTypes = {
  url: PropTypes.string.isRequired
}

export default LevelSelector