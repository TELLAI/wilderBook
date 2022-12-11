import axios from 'axios';
import React from 'react';
import styles from "./ProfilCard.module.css"

const SkillCard = (props) => {
    const name  = props.data.skill.name
    let { votes } = props.data

    const addVotes = async () => {

        votes += 1
        await axios.put("http://localhost:5000/api/connexion/update", { wilder : props.wilder, skill : name, newVotes : votes });
        props.OnaddVotes();
    }

    return (
      <div>
        <li>
          {name}
          <span className={styles.votes} onClick={addVotes}>
            {votes}
          </span>
        </li>
      </div>
    );
};

export default SkillCard;