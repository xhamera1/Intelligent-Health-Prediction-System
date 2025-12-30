import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import type { User, UserRole } from "../../utils/types";

interface EditUserDialogProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
}

export function EditUserDialog({
                                   open,
                                   user,
                                   onClose,
                                   onSave,
                               }: EditUserDialogProps) {
    const [formData, setFormData] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
            });
        }
    }, [user]);

    if (!formData) return null;

    const handleChange = (name: keyof User, value: string | UserRole) => {
        setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const handleSaveChanges = () => {
        if (formData) {
            onSave(formData);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ pt: 2 }}>
                    <TextField label="Email" value={formData.email} disabled fullWidth />
                    <TextField
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={formData.role}
                            label="Role"
                            onChange={(e) => handleChange("role", e.target.value as UserRole)}
                        >
                            <MenuItem value="USER">USER</MenuItem>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSaveChanges} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
