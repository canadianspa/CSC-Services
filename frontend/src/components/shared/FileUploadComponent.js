import React, { useCallback } from "react";
import styles from "./FileUploadComponent.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";

function FileUploadArea({ name, type, onSubmit }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      onSubmit(acceptedFiles[0], name);
    }
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: type,
  });

  return (
    <div {...getRootProps()} className={styles.dropzoneContainer}>
      <input {...getInputProps()} />
      <div className={styles.dropzoneContent}>
        <FontAwesomeIcon icon="upload" />
        <span>Click to upload file ({type})</span>
      </div>
    </div>
  );
}

export default FileUploadArea;
