import { Box, Typography, Card, CardContent, Stack, Switch, Button, Divider } from '@mui/material';

import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import { Assessment, FileDownload, Person, Group } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';


import { useAdminUsers } from '../hooks/useAdminUsers';
import { useAdminStats } from "../hooks/useAdminStats.ts";
import type { Stats } from "../utils/types.ts"
import { safeNumber } from "../utils/functions.ts";

export default function AdminDashboard() {
	const { user } = useApplicationContext();
	const navigate = useNavigate();
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

	const { data: usersData } = useAdminUsers(0, 1);
	const [stats, setStats] = useState<Stats>({
		totalUsers: 0,
		totalPredictions: 0,
		activeUsers: 1,
		maintenanceMode: false,
		predictions: {
			volume: { perDay: 0, diabetes: 0, heart: 0, stroke: 0, habits: 0 },
		},
		registrations: { last30Days: Array(30).fill(1) }
	});

	const { data: adminStats } = useAdminStats();

	useEffect(() => {
		if (usersData || adminStats) {
			setStats((prev) => ({
				...prev,
				totalUsers: usersData ? usersData.totalElements : prev.totalUsers,
				totalPredictions: adminStats ? adminStats.totalPredictions : prev.totalPredictions,
				predictions: adminStats ? adminStats.predictions : prev.predictions,
				registrations: {
					last30Days: adminStats? adminStats.registrationsLast30Days : prev.registrations.last30Days
				}
			}));
		}
	}, [usersData, adminStats]);

	const pieData = [
		{ name: 'Diabetes', value: safeNumber(stats.predictions.volume.diabetes) },
		{ name: 'Heart Attack', value: safeNumber(stats.predictions.volume.heart) },
		{ name: 'Stroke', value: safeNumber(stats.predictions.volume.stroke) },
		{ name: 'Habits', value: safeNumber(stats.predictions.volume.habits) }
	];
	const registrationData = stats.registrations.last30Days;
	const maxRegistrations = Math.max(...registrationData, 1);

	const [fileContent, setFileContent] = useState<string | null>(null);
	useEffect(() => {
		const jsonString = JSON.stringify(stats, null, 2);
		setFileContent(jsonString);
	}, [stats]);

	const handleDownload = () => {
		if (!fileContent) return;

		const blob = new Blob([fileContent], { type: 'application/json;charset=utf-8' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'data.json';
		link.click();
		window.URL.revokeObjectURL(url);
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Admin Dashboard
			</Typography>
			<Typography color="text.secondary" gutterBottom>
				Welcome, {user?.firstName ?? user?.username ?? 'admin'}
			</Typography>

			{/* KPI CARDS */}
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
					gap: 3,
					mb: 4
				}}
			>
				<Card>
					<CardContent>
						<Stack direction="row" spacing={1} alignItems="center">
							<Person color="primary" />
							<Typography variant="h6">Total Users</Typography>
						</Stack>
						<Typography variant="h3" fontWeight={700}>
							{stats.totalUsers}
						</Typography>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<Stack direction="row" spacing={1} alignItems="center">
							<Assessment color="primary" />
							<Typography variant="h6">Active Users</Typography>
						</Stack>
						<Typography variant="h3" fontWeight={700}>
							{stats.activeUsers}
						</Typography>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<Stack direction="row" spacing={1} alignItems="center">
							<Assessment color="primary" />
							<Typography variant="h6">Predictions</Typography>
						</Stack>
						<Typography variant="h3" fontWeight={700}>
							{stats.totalPredictions}
						</Typography>
					</CardContent>
				</Card>
			</Box>

			{/* MAIN CONTENT */}
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: '2fr 1fr'
					},
					gap: 3
				}}
			>
				{/* LEFT COLUMN */}
				<Stack spacing={3}>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Prediction Volume
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Typography>Per day: {stats.predictions.volume.perDay}</Typography>
							<Typography>Diabetes: {stats.predictions.volume.diabetes}</Typography>
							<Typography>Heart: {stats.predictions.volume.heart}</Typography>
							<Typography>Stroke: {stats.predictions.volume.stroke}</Typography>
							<Typography>Habits: {stats.predictions.volume.habits}</Typography>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								New Accounts – Last 30 Days' Registrations
							</Typography>
							<Divider sx={{ mb: 2 }} />

							<Box
								sx={{
									width: '100%',
									height: 200
								}}
							>
								<svg viewBox="0 0 300 100" width="100%" height="100%">
									<polyline
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										points={registrationData
											.map((value, index) => {
												const x = (index / (registrationData.length - 1)) * 300;
												const y = 100 - (value / maxRegistrations) * 90;
												return `${x},${y}`;
											})
											.join(' ')}
									/>

									{registrationData.map((value, index) => {
										const x = (index / (registrationData.length - 1)) * 300;
										const y = 100 - (value / maxRegistrations) * 90;
										return (
											<circle
												key={index}
												cx={x}
												cy={y}
												r={2}
												fill="currentColor"
											/>
										);
									})}
								</svg>
							</Box>

							<Typography
								variant="caption"
								color="text.secondary"
								sx={{ mt: 1, display: 'block' }}
							>
								Missing data treated as 0
							</Typography>
						</CardContent>
					</Card>

					<Button
						variant="contained"
						startIcon={<Group />}
						onClick={() => navigate('/admin/users')}
					>
						Manage User Accounts
					</Button>

				</Stack>

				{/* RIGHT COLUMN */}
				<Stack spacing={3}>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Most Used Forms
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Box sx={{ width: '100%', height: 400 }}>
								<ResponsiveContainer>
									<PieChart>
										<Pie
											data={pieData}
											dataKey="value"
											nameKey="name"

											innerRadius={60}
											outerRadius={90}
											paddingAngle={4}
										>
											{pieData.map((_, index) => (
												<Cell key={index} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip />
										<Legend verticalAlign="bottom" />
									</PieChart>
								</ResponsiveContainer>
							</Box>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							<Typography variant="h6">Maintenance Mode</Typography>
							<Switch
								checked={stats.maintenanceMode}
								onChange={() =>
									setStats(prev => ({
										...prev,
										maintenanceMode: !prev.maintenanceMode
									}))
								}
							/>
						</CardContent>
					</Card>

					<Button variant="outlined" startIcon={<FileDownload />} onClick={handleDownload} disabled={!fileContent} >
						Export Data
					</Button>
				</Stack>
			</Box>
		</Box>
	);
}
