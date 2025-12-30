import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { User } from "../../utils/types";

interface UsersTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: number) => void;
    actionsDisabled?: boolean;
}

export function UsersTable({ users, onEdit, onDelete, actionsDisabled = false }: UsersTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell> Username </TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} hover>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell align="center">
                                <Tooltip title={actionsDisabled ? "Login to edit" : "Edit User"}>
                  <span>
                    <IconButton onClick={() => onEdit(user)} disabled={actionsDisabled}>
                      <EditIcon />
                    </IconButton>
                  </span>
                                </Tooltip>
                                <Tooltip title={actionsDisabled ? "Login to delete" : "Delete User"}>
                  <span>
                    <IconButton color="error" onClick={() => onDelete(user.id)} disabled={actionsDisabled}>
                      <DeleteIcon />
                    </IconButton>
                  </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
