/**
 * SpreadsheetConverter nodejs helper module to persist calculator node form in mongodb
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testnodedb', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

var formSchema = mongoose.Schema({}, {strict: false});
var Form = mongoose.model('Form', formSchema);
module.exports = {
    saveform: function (post, callback) {
        var __form = {};
        for (var property in post) {

            if ((property in post) && property.indexOf('xl_') === -1) {
                __form[property] = post[property];
            }
        }
        var _form = new Form(__form);
        _form.save(function (err, form) {
            if (err) {
                callback(err, {});
            } else {
                callback(undefined, 'Form is successfully saved.');
            }
        });
    }
}
