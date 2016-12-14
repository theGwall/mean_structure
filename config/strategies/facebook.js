var passport     = require('passport'),
url              = require('url'),
FacebookStrategy = require('passport-facebook').Strategy,
config           = require('../config'),
users            = require('../../app/controllers/users.server.controller');


module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID         : config.facebook.clientID,
        clientSecret     : config.facebook.clientSecret,
        callbackURL      : config.facebook.callbackURL,
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        var providerData          = profile._json;
        providerData.accessToken  = accessToken;
        providerData.refreshToken = refreshToken;

        var providerUserProfile = {
            firstName   : profile.name.givenName,
            lastName    : profile.name.familyName,
            fullName    : profile.displayName,

            // --> wtf? TypeError: Cannot read property '0' of undefined
            // -->email       : profile.emails[0].value,

            username    : profile.username,
            provider    : 'facebook',
            providerId  : profile.id,
            providerData: providerData,
        };

        user.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};