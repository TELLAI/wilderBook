import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { UPDATE_UPVOTES } from "../query/upvotes";
import { ISkillProps } from "./ProfilCard";
import styles from "./ProfilCard.module.css";

const SkillCard = (props: ISkillProps): JSX.Element => {
  const [UpdateUpvote] = useMutation(UPDATE_UPVOTES);
  const name = props.data.skill.name;
  const [votes, setVotes] = useState(props.data.votes);

  const addVotes = async () => {
    let v = votes + 1;
    setVotes(v);
    await UpdateUpvote({
      variables: {
        voteId: props.data.id,
        votes: votes,
        wilder: props.wilder,
        skill: name,
      },
    });
    // await axios.put("http://localhost:5000/api/connexion/update", { wilder : props.wilder, skill : name, newVotes : votes });
    // console.log("c ajouté !!")
    // //await props.OnaddVotes();
    // console.log("c'est rafraichi !!")
    console.log(props.data.id);
  };

  useEffect(() => {
    console.log("c'est rafraichi !!");
  }, [setVotes]);

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
