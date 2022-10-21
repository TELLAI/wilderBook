import blank_profile from "../assets/profil.png"
import SkillCard from './SkillCard';
import styles from "./ProfilCard.module.css"
import { useState } from "react";
import axios from "axios";
import { IVotes, IWilder } from "../App";

export interface ISkillProps {
  data : IVotes,
  wilder : string,
  OnaddVotes : () => {}
}
const ProfilCard = (props : IWilder) => {
    
    const [add, setAdd] = useState<boolean>(true)
    const [skill, setSkill] = useState<string>()

    const addSkill = async () : Promise<void> => {
        await setAdd(!add) 
        console.log(add)
    }

    const submitSkill = async () : Promise<void> => {
        if(skill) {
            await axios.post("http://localhost:5000/api/connexion/add", { wilder : props.name, skill : skill });
                console.log(props.name, skill)
                setSkill("")
                props.OnwilderCreated();
                addSkill()
        }else {
            console.log("aucune saisie de skill !! reprend toi mec !!")
        }
        
    }

    return (
      <div className={styles.profilCard}>
        <section className={styles.cardRow}>
          <article className={styles.card}>
            <img src={blank_profile} alt="Jane Doe Profile" />
            <h3>{props.name}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h4>Wild Skills</h4>
            <ul className={styles.skills}>
              {props.upvotes.map((upvote : IVotes) => {
                return <SkillCard data={upvote} wilder={props.name} OnaddVotes={() => props.OnwilderCreated()}/>;
              })}
            </ul>
            {add ? (
              <button onClick={addSkill}>Ajouter skill</button>
            ) : (
              <div className={styles.addSkill}>
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                >
                  <option value="HTML">HTML</option>
                  <option value="PYTHON">PYTHON</option>
                  <option selected value="NODE">
                    NODE
                  </option>
                  <option value="JS">JS</option>
                  <option value="PHP">PHP</option>
                </select>
                <button onClick={submitSkill}>Ajouter</button>
              </div>
            )}
          </article>
        </section>
      </div>
    );
};

export default ProfilCard;