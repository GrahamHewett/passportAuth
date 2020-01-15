const express = require('express'),
cors = require('cors'),
passport = require('passport'),
spotifyStrategy = require('spotifyStrategy').Strategy,
chalk = require('chalk'),
keys = require('../../config'),
user = {}; //database substitute
const app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(
	new SpotifyStrategy(
	  {
		clientID: '9a83fea5e2d04504a311aee6166ef775',
		clientSecret: '92955232e75842e8ae6049bf18fbbba7',
		callbackURL: 'http://localhost:8888/auth/spotify/callback'
	  },
	  function(accessToken, refreshToken, expires_in, profile, done) {
		  console.log(chalk.blue(JSON.stringify(profile)));
		  user = {...profile};
		  return done(err, user);
		// User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
		//   return done(err, user);
		// });
	  }
	)
  );

app.use(cors());
app.use(passport.initialize())

  app.get('/auth/spotify', passport.authenticate('spotify', {
	scope: ['user-read-email', 'user-read-private', 'playlist-modify-private', 'playlist-modify-public'],  
	showDialog: true
  }), function(req, res) {
	// The request will be redirected to spotify for authentication, so this
	// function will not be called.
  });
  
  app.get(
	'/auth/spotify/callback',
	passport.authenticate('spotify', { failureRedirect: '/login' }),
	function(req, res) {
	  // Successful authentication, redirect home.
	  res.redirect('/');
	}
  );

app.get('/user', (req, res) => {
	console.log('Getting user data');
	res.send(user);
});

app.get('/auth/logout', (req, res) => {
	console.log('Logging out');
	user = {};
	res.redirect('/');
});

const PORT = process.env.PORT || 8888;
app.listen('Server is listening on port ', PORT);
// Testing npm install --dev
// make test



