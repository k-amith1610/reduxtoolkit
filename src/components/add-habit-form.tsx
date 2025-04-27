import { Box, Button, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addHabit } from '../store/habit-slice';

const AddHabitForm: React.FC = () => {

    const [name, setName] = useState<string>("");
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim()) {
            dispatch(addHabit({
                name,
                frequency,
            }))
            setName("")
            setFrequency("daily");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 2,
            }}>
                <TextField
                    label="Habit Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="frequency-native">
                        Frequency
                    </InputLabel>
                    <NativeSelect
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                        inputProps={{
                            name: 'frequency',
                            id: 'frequency-native',
                        }}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </NativeSelect>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Add Habit
                </Button>
            </Box>
        </form>
    )
}

export default AddHabitForm
