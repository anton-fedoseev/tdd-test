import React, { useEffect } from 'react';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { initialValues, type Values } from './config';
import { validationSchema } from './schema';

interface ICreateBookModal {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (values: Values) => void;
}

export const CreateBookModal: React.FC<ICreateBookModal> = ({ isOpen, isLoading, onClose, onSubmit }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema) as Resolver<Values>,
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                }
            }}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Add book</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '15px' }}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                error={Boolean(errors.name?.message)}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="author"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Author"
                                error={Boolean(errors.author?.message)}
                                helperText={errors.author?.message}
                            />
                        )}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" loading={isLoading}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
