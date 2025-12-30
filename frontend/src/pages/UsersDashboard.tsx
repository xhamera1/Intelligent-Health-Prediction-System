import { useState } from "react";
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Pagination,
} from "@mui/material";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { useAdminUpdateUser } from "../hooks/useAdminUpdateUser";
import { useAdminDeleteUser } from "../hooks/useAdminDeleteUser";
import type { User } from "../utils/types";

import { EditUserDialog } from "../components/adminDashboard/EditUserDialog";
import { UsersTable } from "../components/adminDashboard/UsersTable";
import { DeleteUserDialog } from "../components/adminDashboard/DeleteUserDialog";
import { SnackbarNotification } from "../components/adminDashboard/SnackbarNotification";

export default function UsersDashboard() {
    const [page, setPage] = useState(0);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const { data, isLoading, error, isFetching } = useAdminUsers(page, 10);
    const updateUserMutation = useAdminUpdateUser();
    const deleteUserMutation = useAdminDeleteUser();

    const handleUpdateUser = (user: User) => {
        updateUserMutation.mutate(user, {
            onSuccess: () => {
                setSnackbar({
                    open: true,
                    message: "User updated successfully!",
                    severity: "success",
                });
                setEditingUser(null);
            },
            onError: (err: any) => {
                setSnackbar({
                    open: true,
                    message: `Error updating user: ${err.message}`,
                    severity: "error",
                });
            },
        });
    };

    const handleDeleteUser = () => {
        if (deletingUserId === null) return;
        deleteUserMutation.mutate(deletingUserId, {
            onSuccess: () => {
                setSnackbar({
                    open: true,
                    message: "User deleted successfully!",
                    severity: "success",
                });
                setDeletingUserId(null);
            },
            onError: (err: any) => {
                setSnackbar({
                    open: true,
                    message: `Error deleting user: ${err.message}`,
                    severity: "error",
                });
            },
        });
    };

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value - 1);
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ my: 4 }}>
                <Alert severity="error">
                    Failed to load users: {(error as Error).message}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - User Management
            </Typography>

            <UsersTable
                users={data?.content || []}
                onEdit={setEditingUser}
                onDelete={setDeletingUserId}
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                    count={data?.totalPages || 0}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                    disabled={isFetching}
                />
            </Box>

            <EditUserDialog
                open={!!editingUser}
                user={editingUser}
                onClose={() => setEditingUser(null)}
                onSave={handleUpdateUser}
            />

            <DeleteUserDialog
                open={!!deletingUserId}
                onClose={() => setDeletingUserId(null)}
                onConfirm={handleDeleteUser}
            />

            <SnackbarNotification
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={closeSnackbar}
            />
        </Container>
    );
}