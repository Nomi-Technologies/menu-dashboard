import React, { useState, useCallback } from "react";
import CSVUploadIcon from "../assets/img/csv-upload-icon.png";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import DeleteIcon from "../assets/img/delete-icon.png";

const StyledFileDrop = styled.div`
  .file-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-bottom: 24px;
    border: 2px dashed #b2bed0;
    border-radius: 6px;
    background-color: #e1e7ec;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    .input-inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      img {
        display: block;
        margin-right: 10px;
      }

      p {
        color: #8a9db7;
      }

      b {
        color: #27a2f8;
      }
    }
  }

  .error-msg {
    color: red;
  }

  p {
    display: inline-block;
    color: black;
    text-align: left;
    line-height: 15px;
    vertical-align: middle;
  }
`;

const FileContents = styled.div`
  display: flex;
  align-items: center;
`;

const ClearIcon = styled.img`
  width: 15px;
  height: 15px;
  padding-left: 15px;
  opacity: 80%;
  cursor: pointer;

  &:hover {
    opacity: 100%;
  }
`;

const FileDrop = ({
  acceptedFileTypes,
  setFile,
  setErrorMessage,
  clearFile,
}) => {
  let [fileName, setFileName] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // only allow single file
    let fileTypeAccepted = false;
    acceptedFileTypes.forEach((fileType) => {
      if (file.path.includes(fileType)) {
        fileTypeAccepted = true;
      }
    });

    if (!fileTypeAccepted) {
      if (setErrorMessage) {
        setErrorMessage(
          "Incorrect file uploaded, please choose a " +
            acceptedFileTypes.join(",") +
            " file"
        );
      }
    } else {
      setFileName(file.path);
      setErrorMessage(null);
      setFile(file);
    }
  }, []);

  const clearUploadedFile = () => {
    setFileName(null);
    clearFile();
  };

  let { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <StyledFileDrop>
      {fileName ? (
        <FileContents>
          <p>Selected File: {fileName} </p>{" "}
          <ClearIcon src={DeleteIcon} onClick={clearUploadedFile} />
        </FileContents>
      ) : (
        <div className="file-input" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <div class="input-inner">
              <img src={CSVUploadIcon} alt="Upload icon for CSV" />
              <p>
                Drag and drop a file here, or <b>Choose File</b>
              </p>
            </div>
          )}
        </div>
      )}
    </StyledFileDrop>
  );
};

export { FileDrop };
