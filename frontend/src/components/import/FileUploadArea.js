import React, { useCallback } from "react";
import "./FileUploadArea.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";

function FileUploadArea({ selectedVendor, handleFileSubmit }) {
	const onDrop = useCallback(
		(acceptedFiles) => {
			if (acceptedFiles[0]) {
				handleFileSubmit(selectedVendor.name, acceptedFiles[0]);
			}
		},
		[selectedVendor, handleFileSubmit]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
		accept: selectedVendor.file_type,
	});

	return (
		<div {...getRootProps()} className="dropzone-container">
			<input {...getInputProps()} />
			<div className="dropzone-content">
				<FontAwesomeIcon icon="upload" />
				<span>Click to upload file ({selectedVendor.file_type})</span>
			</div>
		</div>
	);
}

export default FileUploadArea;
