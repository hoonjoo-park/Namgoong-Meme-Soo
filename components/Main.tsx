import { useEffect, useState } from 'react';
import { fetcher } from 'utils/fetcher';

function Main() {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    (async () => {
      const {
        data: { memes },
      } = await fetcher();
      setApiData(memes);
    })();
  }, []);
  return <div>Main Page</div>;
}

export default Main;
