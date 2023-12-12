import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import deleteIcon from "../../assets/delete.svg";
import "./Note.css";

function Note(props) {
  const [accountName, setAccountName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    // Load saved data from local storage when the component mounts
    const savedData = JSON.parse(localStorage.getItem(`note_${props.note.id}`));
    if (savedData) {
      setAccountName(savedData.accountName);
      setUserId(savedData.userId);
      setPassword(savedData.password);
      setIsEditing(false); // Hide the input fields if data is present
    }
  }, [props.note.id]);

  const handleSave = () => {
    // Check if all required fields are filled
    if (accountName.trim() === '' || userId.trim() === '' || password.trim() === '') {
      // Show an alert or handle the case where fields are not filled
      alert('Please fill in all fields before saving.');
      return;
    }

    // Pass the account information to the parent component for saving
    props.saveNote({
      id: props.note.id,
      accountName,
      userId,
      password,
    });

    // Save the data to local storage
    const dataToSave = { accountName, userId, password };
    localStorage.setItem(`note_${props.note.id}`, JSON.stringify(dataToSave));

    // Set editing to false to hide the input fields after saving
    setIsEditing(false);
  };

  const handleCopy = (text) => {
    setCopiedText(`${text} copied to clipboard!`);
    // Optional: You can set a timeout to clear the copied message after a certain duration
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  };

  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      {isEditing ? (
        <>
          <div className="form__div">
            <input
              type="text"
              className="form__input"
              placeholder=" "
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            <label htmlFor="" className="form__label">
              Account Name
            </label>
          </div>

          <div className="form__div">
            <input
              type="text"
              className="form__input"
              placeholder=" "
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <label htmlFor="" className="form__label">
              User ID
            </label>
          </div>

          <div className="form__div">
            <input
              type="password"
              className="form__input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="" className="form__label">
              Password
            </label>
          </div>

          <button onClick={handleSave} className="form__button">
            Save
          </button>
        </>
      ) : (
        <>
          <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "0" }}>
            {accountName}
          </p>
          <p>
            {userId}
            <CopyToClipboard text={userId} onCopy={() => handleCopy("User ID")}>
              <FontAwesomeIcon
                icon={faCopy}
                style={{ marginLeft: "5px", cursor: "pointer", fontSize: "14px" }}
              />
            </CopyToClipboard>
          </p>
          <p>
            {"*".repeat(password.length)}
            <CopyToClipboard text={password} onCopy={() => handleCopy("Password")}>
              <FontAwesomeIcon
                icon={faCopy}
                style={{ marginLeft: "5px", cursor: "pointer", fontSize: "14px" }}
              />
            </CopyToClipboard>
          </p>
          {copiedText && (
            <p style={{ textAlign: "center", fontSize: "12px", marginTop: "5px" }}>{copiedText}</p>
          )}
        </>
      )}
      <div className="note_footer">
        {!isEditing && (
          <img
            src={deleteIcon}
            alt="DELETE"
            onClick={() => props.deleteNote(props.note.id)}
          />
        )}
      </div>
    </div>
  );
}

export default Note;
