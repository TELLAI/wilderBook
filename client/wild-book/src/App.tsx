import styles from "./App.module.css";
import ProfilCard from "./component/ProfilCard";
import AddwilderForm from "./component/AddwilderForm";
import { useQuery } from "@apollo/client";
import { GET_WILDERS } from "./query/wilders";

export interface ISkill {
  id: number;
  name: string;
}
export interface IVotes {
  id: number;
  votes: number;
  skill: ISkill;
}
export interface IWilder {
  id: number;
  name: string;
  fileName : string,
  upvotes: IVotes[];
  OnwilderCreated: () => {};
}
export interface ICreated {
  OnwilderCreated : () => {}
}

function App(): JSX.Element {

  const { loading, data, refetch } = useQuery(GET_WILDERS) 

  // const fetchData = async () => {
  //   const result = await axios.get("http://localhost:5000/api/wilder/liste");

  //   console.log(result.data);
  //   setwilders(result.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <header>
        <div className={styles.container}>
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className={styles.container}>
        <h2>Wilders</h2>
        <div className={styles.profil}>
          {loading === true && "Chargement..."}
          {data && data.getWilders.map((wilder : IWilder): JSX.Element => {
            return (
              <ProfilCard
                key={wilder.id}
                id={wilder.id}
                name={wilder.name}
                upvotes={wilder.upvotes}
                fileName={wilder.fileName}
                OnwilderCreated={() => refetch()}
              />
            );
          })}
        </div>
        <AddwilderForm OnwilderCreated={() => refetch()} />
      </main>
      <footer>
        <div className={styles.container}>
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
