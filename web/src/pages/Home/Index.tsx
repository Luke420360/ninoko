import { Typography, Container, Grid, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" className="p-8">
      <section className="text-center my-12">
        <Typography variant="h3" className="font-bold text-ultraviolett mb-4">
          Welcome to Ninoko
        </Typography>
        <Typography variant="h6" color="textSecondary" className="mb-6">
          Discover a world where technology and creativity meet, building solutions that redefine the future.
        </Typography>
        <div className='mt-4' />
        <Button
          variant="contained"
          size="large"
          className="bg-ultraviolett text-white py-3 px-6"
          onClick={() => navigate('/register')}
        >
          Join Us
        </Button>
      </section>

      <section className="my-16">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent>
                <Typography variant="h5" className="font-bold text-ultraviolett mb-4">
                  About Ninoko
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Ninoko is a leading platform that empowers innovators to develop and implement creative, tech-forward solutions.
                  We offer tools, resources, and community-driven support to help turn ideas into reality. From software development to creative design, 
                  we cater to a wide range of professionals and hobbyists alike.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent>
                <Typography variant="h5" className="font-bold text-ultraviolett mb-4">
                  Our Vision
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  At Ninoko, we believe in fostering creativity through collaboration. Our mission is to create an ecosystem where ideas flow freely,
                  and people can access the resources they need to innovate and succeed. Whether you're an experienced professional or just starting, 
                  Ninoko is your home for growth.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      <section className="my-16">
        <Typography variant="h4" className="font-bold text-center text-ultraviolett mb-8">
          Why Choose Ninoko?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-2">
                  Cutting-Edge Technology
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ninoko offers access to the latest in tech innovation, ensuring you stay ahead of the curve.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-2">
                  A Creative Community
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Connect with other like-minded innovators, collaborate on projects, and grow together.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-2">
                  Support & Resources
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  From tutorials to expert advice, Ninoko provides the support you need to succeed in your endeavors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      <section className="text-center my-16">
        <Typography variant="h4" className="font-bold text-ultraviolett mb-4">
          Ready to Start Your Journey?
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-6">
          Join Ninoko today and be part of a growing community of innovators and creators.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          className="border-ultraviolett text-ultraviolett py-3 px-6 hover:bg-ultraviolett hover:text-white"
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </section>
    </Container>
  );
};

export default HomePage;
