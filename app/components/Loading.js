import React, { useState, useEffect, useRef } from 'react';

const styles = {
  content: {
    textAlign: 'center',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    fontSize: '35px'
  }
};

function Loading ({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setContent(
        content === text + '...'
          ? text
          : content + '.'
      )
    }, speed)

    return () => window.clearTimeout(timeout);
  }, [content]);

  return (
    <p style={styles.content}>
      {content}
    </p>
  );
}

export default Loading;
