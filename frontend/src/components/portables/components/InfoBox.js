import React from "react";
import styles from "./InfoBox.module.css";

function InfoBox({ header, content, className, backgroundColor }) {
  if (!backgroundColor) {
    backgroundColor = "#e9ecef";
  }

  return (
    <div className={styles.infoBox}>
      {header && <span>{header}</span>}
      {content && typeof content === "object" ? (
        content.map((text, index) => (
          <div
            key={index}
            className={className}
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            {text}
          </div>
        ))
      ) : (
        <div
          className={className}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default InfoBox;
