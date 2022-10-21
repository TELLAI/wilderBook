import React, { useState } from 'react';
import styles from "./AddwilderForm.module.css"
import { ICreated, IWilder } from '../App';
import { useMutation } from '@apollo/client';
import { CREATED_WILDER } from '../query/wilders';

const AddwilderForm = (props : ICreated) => {

  const [addWilder] = useMutation(CREATED_WILDER)

      const [name, setName] = useState<IWilder["name"]>()

        const Onsubmit = async (e : {preventDefault : () => void}) => {
            e.preventDefault();
            await addWilder({ variables : {name} })
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
          {/* <input type="file" value={fileName} onChange={(e) => {setFileName(e.target.value)}} /> */}
          <button onClick={Onsubmit}>Ajouter</button>
        </form>
      </div>
    );
};

export default AddwilderForm;