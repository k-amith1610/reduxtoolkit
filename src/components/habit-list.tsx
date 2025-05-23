import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Habit, removeHabit, toggleHabit } from '../store/habit-slice';

const HabitList: React.FC = () => {

    const { habits } = useSelector((state: RootState) => state.habits);
    const dispatch = useDispatch<AppDispatch>()
    const today = new Date().toISOString().split("T")[0];

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();

        while (true) {
            const dateString = currentDate.toISOString().split("T")[0];
            if (habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
            {habits.map((habit) => {
                return <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
                    <Grid container alignItems="center">
                        <Grid>
                            <Typography variant="h6">{habit.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                                {habit.frequency}
                            </Typography>
                        </Grid>
                        <Grid sx={{ marginLeft: "20%" }}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    color={
                                        habit.completedDates.includes(today) ? "success"
                                            : "primary"
                                    }
                                    startIcon={<CheckCircleIcon />}
                                    // onClick={() =>
                                    //     dispatch(toggleHabit({
                                    //         id: habit.id, date: today
                                    //     }))
                                    // }
                                    onClick={() => (
                                        dispatch(toggleHabit({
                                            id: habit.id,
                                            date: today,
                                        }))
                                    )}
                                >
                                    {
                                        habit.completedDates.includes(today) ? "completed"
                                            : "mark complete"
                                    }
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => (
                                        dispatch(removeHabit({
                                            id: habit.id,
                                        }))
                                    )}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            Current Streak: {getStreak(habit)} days
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={(getStreak(habit) / 30) * 100}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Paper>
            })}
        </Box>
    )
}

export default HabitList
