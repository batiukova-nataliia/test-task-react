import React, { useEffect, useRef, useState } from "react";

type Props = {
  value: string,
  onSave: (newValue: string) => Promise<void>;
}

export const EditableCell: React.FC<Props> = ({
  value,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await onSave(editedValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSave();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEditedValue(e.target.value);
  };

  return (
    isEditing ? (
      <input
        type="text"
        value={editedValue}
        onChange={handleChange}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    ) : (
      <div onDoubleClick={handleDoubleClick}>{value}</div>
    )
  );
}

export default EditableCell;
