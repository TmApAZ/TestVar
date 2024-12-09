// material-ui
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { CheckCircle, Pending, BugReport, Folder } from '@mui/icons-material';

// ===========================|| ENHANCED PROJECT TASK CARD ||=========================== //

const ProjectTaskCard = () => {
    return (
        <Card
            sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: '1100px',
                mx: 'auto',
                bgcolor: 'background.paper',
                width:'1100px'
            }}
        >
            <Grid container alignItems="center" spacing={4}>
                {/* Completed Tasks */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ bgcolor: 'success.main', mb: 1 }}>
                            <CheckCircle />
                        </Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Completed Flashcards
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            4,569
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={70}
                            sx={{ width: '100%', mt: 1 }}
                            color="success"
                        />
                    </Box>
                </Grid>
                {/* Published Projects */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
                            <Folder />
                        </Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Published Flashcards
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            532
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={40}
                            sx={{ width: '100%', mt: 1 }}
                            color="primary"
                        />
                    </Box>
                </Grid>

                

                {/* Pending Tasks */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ bgcolor: 'warning.main', mb: 1 }}>
                            <Pending />
                        </Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Incomplete Flashcards 
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            1,005
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={30}
                            sx={{ width: '100%', mt: 1 }}
                            color="warning"
                        />
                    </Box>
                </Grid>

                {/* Issues */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ bgcolor: 'error.main', mb: 1 }}>
                            <BugReport />
                        </Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                            Streaks 
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            365
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={10}
                            sx={{ width: '100%', mt: 1 }}
                            color="error"
                        />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProjectTaskCard;
