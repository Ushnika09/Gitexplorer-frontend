import { createContext, useContext, useEffect, useState } from "react";
import githubGet from "../../utils/Githubapi";

export const DataContext = createContext();

export default function DataProvider({ children }) {

  const now = new Date();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const dateStr = yesterday.toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [val, setVal] = useState({
    time:dateStr,
    lang:"All languages"
  });

  useEffect(() => {
    FetchAllData(); 
  }, [val.time,val.lang]);

const language =
      val.lang && val.lang !== "All languages"
        ? ` language:${val.lang}`
        : "";

  const Time =val.time !== "Today"


  const FetchAllData = () => {
    setLoading(true);
    githubGet(`/search/repositories`, {
      q: `created:>${val.time}${language}`,
      sort: "stars",
      order: "desc",
    }).then((res) => {
      setData(res);
      console.log(res);
      setLoading(false);
    });
  };

  return (
    <DataContext.Provider value={{ loading, data, val, setVal }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
