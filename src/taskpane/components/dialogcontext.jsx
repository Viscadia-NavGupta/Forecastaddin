// DialogContext.js
import React, { createContext, useState, useContext } from 'react';

const DialogContext = createContext();

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);

  const showDialog = (dialogComponent) => setDialog(dialogComponent);
  const hideDialog = () => setDialog(null);

  return (
    <DialogContext.Provider value={{ dialog, showDialog, hideDialog }}>
      {children}
      {dialog}
    </DialogContext.Provider>
  );
};
