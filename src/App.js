
import './App.css';
import styles from "./App.module.css"
import ProfilCard from './component/ProfilCard';
import axios from "axios"
import { useEffect, useState } from 'react';
import AddwilderForm from './component/AddwilderForm';

function App() {

  const [wilders, setwilders] = useState()


  const fetchData = async () => {
    
    const result = await axios.get("http://localhost:5000/api/wilder/liste")
    
      console.log(result.data)
      setwilders(result.data)
  }

  useEffect(() => {
    
    fetchData()

  }, [])

  if (!wilders) return ( <h1>Nulllll</h1> )

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
            {wilders.map((wilder) => {
          return <ProfilCard key={wilder.id} name={wilder.name} upvotes={wilder.upvotes} OnwilderCreated={() => fetchData()}/>;
        })}
        </div>
        <AddwilderForm OnwilderCreated={() => fetchData()}/>
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
