import React, { useState } from "react";

const CardContent = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);
  return (
    <div>
      <div className="">
        {showFullText ? (
          <div>
            {text}
            <span
              onClick={() => setShowFullText(!showFullText)}
              className="text-blue-900 cursor-pointer"
            >
              (see less)
            </span>
          </div>
        ) : (
          <div>
            {text.length > 600 ? (
              <div>
                {text.slice(0, 600)}
                ...
                <span
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-blue-900 cursor-pointer"
                >
                  (see more)
                </span>
              </div>
            ) : (
              <div>{text}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardContent;
