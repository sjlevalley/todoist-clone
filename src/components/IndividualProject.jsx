import React from "react";
import { FaTrash } from "react-icons/fa";
import { useProjectsValues, useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";

function IndividualProject() {
  const [showCOnfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValues();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("INBOX");
      });
  };

  return <div>IndividualProject</div>;
}

export default IndividualProject;
