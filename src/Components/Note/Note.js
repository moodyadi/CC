import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import deleteIcon from "../../assets/delete.svg";
import copyIcon from "../../assets/copy.svg";

import "./Note.css";

function Note(props) {
  const [accountName, setAccountName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);
  const [isUserIdCopied, setIsUserIdCopied] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`note_${props.note.id}`));
    if (savedData) {
      setAccountName(savedData.accountName);
      setUserId(savedData.userId);
      setPassword(savedData.password);
      setIsEditing(false);
    }
  }, [props.note.id]);

  const handleSave = () => {
    if (accountName.trim() === '' || userId.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields before saving.');
      return;
    }

    props.saveNote({
      id: props.note.id,
      accountName,
      userId,
      password,
    });

    const dataToSave = { accountName, userId, password };
    localStorage.setItem(`note_${props.note.id}`, JSON.stringify(dataToSave));

    setIsEditing(false);
  };

  const handleCancel = () => {
    if (props.note.id) {
      props.deleteNote(props.note.id);
    } else {
      setIsEditing(false);
    }
  };

  const handleCopyPassword = () => {
    setIsPasswordCopied(true);
    setTimeout(() => {
      setIsPasswordCopied(false);
    }, 2000);
  };

  const handleCopyUserId = () => {
    setIsUserIdCopied(true);
    setTimeout(() => {
      setIsUserIdCopied(false);
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
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>

          <div className="form__div">
            <input
              type="text"
              className="form__input"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="form__div">
            <input
              type="password"
              className="form__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form__buttons">
            <button onClick={handleSave} className="form__button">
              Save
            </button>
            <button onClick={handleCancel} className="form__button">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "0" }}>
            {accountName}
          </p>
          <p>
            <CopyToClipboard text={userId} onCopy={handleCopyUserId}>
              <img src={copyIcon} alt="COPY" style={{ marginRight: "5px", cursor: "pointer", fontSize: "14px" }} />
            </CopyToClipboard>
            {userId}
          </p>
          <p>
            <CopyToClipboard text={password} onCopy={handleCopyPassword}>
              <img src={copyIcon} alt="COPY" style={{ marginRight: "5px", cursor: "pointer", fontSize: "14px" }} />
            </CopyToClipboard>
            {"*".repeat(password.length)}
          </p>
          {(isUserIdCopied || isPasswordCopied) && (
            <p style={{ textAlign: "center", fontSize: "12px", marginTop: "5px" }}>
              {isUserIdCopied ? "User ID copied to clipboard!" : ""}
              {isUserIdCopied && isPasswordCopied ? " / " : ""}
              {isPasswordCopied ? "Password copied to clipboard!" : ""}
            </p>
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
