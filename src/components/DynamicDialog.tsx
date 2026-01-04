import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type DialogChildProps<T = any> = {
    onClose?: () => void;
    onComplete?: (data?: T) => void;
  };

type DialogHeader = {
  title?: string | null;
  subtitle?: string | null;
};

type DynamicDialogProps<T = any> = {
  open: boolean;
  header?: DialogHeader;
  children: React.ReactElement<DialogChildProps<T>>;
  onClose: () => void;
  onComplete?: (data?: T) => void;
};

const DynamicDialog = <T,>({
  open,
  header,
  children,
  onClose,
  onComplete,
}: DynamicDialogProps<T>) => {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Header */}
      {(header?.title || header?.subtitle) && (
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {header?.title && (
                <Typography variant="h6">{header.title}</Typography>
              )}
              {header?.subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {header.subtitle}
                </Typography>
              )}
            </Box>

            {/* Close button (always enabled) */}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
      )}

      {/* Body */}
      <DialogContent dividers>
        {React.cloneElement(children, {
          onClose,
          onComplete,
        })}
      </DialogContent>
    </Dialog>
  );
};

export default DynamicDialog;
