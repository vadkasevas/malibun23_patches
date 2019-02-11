var MeteorCollection = Mongo.Collection;

var mongoConnections = {};
MeteorCollection.getDriverByUrl = function(remoteUrl,oplogUrl){
    var key = `${remoteUrl}:${oplogUrl?oplogUrl:''}`;
    if(mongoConnections[key])
        return mongoConnections[key];
    var connectionOptions = {};
    if(oplogUrl)
        connectionOptions.oplogUrl = oplogUrl;
    mongoConnections[key] = new MongoInternals.RemoteCollectionDriver(remoteUrl, connectionOptions)
    return mongoConnections[key];
};

Mongo.Collection = function (name, options){
    //console.log('name:',name);
    if(name&&( name=='users' || name=='meteor_accounts_loginServiceConfiguration'
            || name=='roles' || name=='meteor_oauth_pendingCredentials')
        &&Meteor.isServer && process.env.SHARED_MONGO_URL ) {
        options = options || {};
        options._driver = MeteorCollection.getDriverByUrl(process.env.SHARED_MONGO_URL , '');
    }
    MeteorCollection.call( this, name, options );
};

Mongo.Collection.prototype = Object.create( MeteorCollection.prototype );
Mongo.Collection.prototype.constructor = Mongo.Collection;
_.extend( Mongo.Collection, MeteorCollection);
Meteor.Collection = Mongo.Collection;