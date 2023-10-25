import React from "react";

type Props = {
  message: string,
}

export const WrongData: React.FC<Props> = ({
  message,
}) => {
  return (
    <div className="error">
      {message}
      <br>
      </br> Please try again
    </div>
  );
}
