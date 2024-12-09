import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

// assets
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { Avatar, Card } from '@mui/material';

// ==============================|| AI FEATURES CARD ||============================== //

const AIFeaturesCard = () => (
    <Card content={false} elevation={0}>
        <CardContent>
            <Grid container spacing={15}>
                {/* Topic Typography */}
                <Grid item xs={12}>
                    <Typography
                        variant="h2"
                        fontWeight={600}
                        sx={{
                            color: '#388E3C',
                            textAlign: 'center',
                            marginBottom: '-50px',
                        }}
                    >
                        AI-Powered Learning Tools
                    </Typography>
                </Grid>

                {/* Description Section on the Right */}
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h6"
                        sx={{
                            marginLeft: '33px',
                        }}
                    >
                        TestVar is redefining education with innovative AI-powered features designed to make learning smarter and more engaging. Our upcoming tools will enable instant flashcard creation from uploaded notes and personalized MCQ quizzes tailored to your syllabus or study needs. With real-time AI-generated explanations for incorrect answers, students will gain deeper insights and improve understanding. Performance tracking will help identify strengths, weaknesses, and focus areas for effective learning. Accessible anytime, anywhere, TestVar ensures flexibility and convenience. Embrace the future of education with TestVar’s AI-driven tools, empowering learners to achieve their goals faster and smarter. Stay tuned for these groundbreaking updates!
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
                                zIndex: '5',
                            },
                            '&:after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 43,
                                width: '1px',
                                height: '100%',
                                bgcolor: 'divider',
                                zIndex: '1',
                            },
                        }}
                    >
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        color="#F4CE14"
                                        size="sm"
                                        sx={{
                                            top: 10,
                                            backgroundColor: '#F4CE14',
                                        }}
                                    >
                                        <SmartToyOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="subtitle1">
                                        AI-Powered Flashcard Creation
                                    </Typography>
                                    <Typography variant="body2">
                                        Upload your notes or topics, and let AI automatically generate personalized
                                        flashcards for quick and effective learning.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        color="primary"
                                        size="sm"
                                        sx={{
                                            top: 10,
                                            backgroundColor: '#379777',
                                        }}
                                    >
                                        <QuizOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="subtitle1">
                                        Auto MCQ Quiz Creation
                                    </Typography>
                                    <Typography variant="body2">
                                        Generate personalized multiple-choice quizzes instantly. Tailor quizzes to
                                        match specific topics or difficulty levels.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        color="error"
                                        size="sm"
                                        sx={{
                                            top: 10,
                                            backgroundColor: '#FF1E00',
                                        }}
                                    >
                                        <MemoryOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="subtitle1">
                                        Intelligent Answer Explanations
                                    </Typography>
                                    <Typography variant="body2">
                                        Receive AI-powered explanations for every quiz question, helping you understand
                                        concepts deeply and correct mistakes.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        color="warning"
                                        size="sm"
                                        sx={{
                                            top: 10,
                                            backgroundColor: '#1A8B9D',
                                        }}
                                    >
                                        <EditNoteOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="subtitle1">
                                        Personalized Learning Insights
                                    </Typography>
                                    <Typography variant="body2">
                                        Track your progress, identify strengths, and focus on areas for improvement with
                                        real-time performance analytics.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        color="success"
                                        size="sm"
                                        sx={{
                                            top: 10,
                                            backgroundColor: '#B2D430',
                                        }}
                                    >
                                        <SpeedOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="subtitle1">
                                        Learn Anytime, Anywhere
                                    </Typography>
                                    <Typography variant="body2">
                                        Access AI-powered tools on any device, ensuring you can learn effectively
                                        wherever you are.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default AIFeaturesCard;
