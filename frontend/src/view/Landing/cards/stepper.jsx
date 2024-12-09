import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

// assets
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { Avatar, Card } from '@mui/material';

// ==============================|| DATA WIDGET - TASKS CARD ||============================== //

const TasksCard = () => (
    <Card content={false} elevation={0}>
        <CardContent>
            <Grid container spacing={15}>
                
                {/* Description Section on the Right */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{
                        marginLeft:'33px'
                    }}>
                        Our MCQ Quiz System is designed to make science practice accessible and engaging for students in grades 6 to 11. With a familiar, Google Forms-like interface, students can easily navigate through multiple-choice questions tailored to their syllabus. Each quiz covers essential topics, allowing students to apply what they’ve learned in real time. Answering is simple—just select a response for each question and click "Submit" to view immediate results. The system provides instant feedback, highlighting correct answers and pinpointing areas for improvement. Students can use this feedback to adjust their study focus and better prepare for exams. Through this interactive quiz system, learning becomes dynamic, helping students reinforce science concepts effectively and build confidence in their knowledge.
                    </Typography>
                </Grid>
                {/* Stepper Section on the Left */}
                <Grid item xs={12} md={6}>
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        sx={{
                            position: 'relative',
                            '&>*': {
                                position: 'relative',
                                zIndex: '5'
                            },
                            '&:after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 43,
                                width: '1px',
                                height: '100%',
                                bgcolor: 'divider',
                                zIndex: '1'
                            }
                        }}
                    >
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar color="#F4CE14" size="sm" sx={{ top: 10, backgroundColor:'#F4CE14' }}>
                                        <SportsScoreOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="subtitle1">Instant Results and Score Display</Typography>
                                    <Typography variant="body2">Get scores and feedback immediately after submitting. Quickly see correct answers and identify areas for improvement.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar color="primary" size="sm" sx={{ top: 10, backgroundColor:'#379777' }}>
                                        <LinkOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">Real-Time AI-Powered Explanations</Typography>
                                    <Typography variant="body2">Get scores and feedback immediately after submitting. Quickly see correct answers and identify areas for improvement.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar color="error" size="sm" sx={{top: 10, backgroundColor:'#FF1E00' }}>
                                        <ForumOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">
                                        Learn from Your Mistakes: Detailed Feedback for Every Answer
                                    </Typography>
                                    <Typography variant="body2">AI explains incorrect answers, clarifying why answers were wrong and helping students understand the correct concepts.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar color="warning" size="sm" sx={{ top: 10, backgroundColor:'#1A8B9D' }}>
                                        <EqualizerOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">Practice Anytime, Anywhere</Typography>
                                    <Typography variant="body2">Access quizzes anytime, anywhere. Study on any device for flexible, on-the-go science practice.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar color="success" size="sm" sx={{ top: 10, backgroundColor:'#B2D430' }}>
                                        <SpeedOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">Progress Tracking and Performance Insights</Typography>
                                    <Typography variant="body2">Track quiz results, monitor progress, and focus on growth areas to stay motivated in science learning.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </CardContent>
    </Card>
);

export default TasksCard;
