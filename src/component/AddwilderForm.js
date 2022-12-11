import React, { useState } from 'react';
import axios from "axios"
import styles from "./AddwilderForm.module.css"

const AddwilderForm = (props) => {

      const [name, setName] = useState()

        const Onsubmit = async (e) => {
            e.preventDefault();
            await axios.post("http://localhost:5000/api/wilder/add", {
                name: name
            });
            setName()
            props.OnwilderCreated();
        }

    return (
      <div className={styles.formulaire}>
        <h2>Ajouter un Wilder</h2>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          
          <button onClick={Onsubmit}>Ajouter</button>
        </form>
      </div>
    );
};

export default AddwilderForm;