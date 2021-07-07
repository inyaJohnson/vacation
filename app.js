const express = require('express');
const app = express();
const formidable = require('formidable');

app.listen(3000, () => console.log('listening to port'+ 3000))
const handlebars = require('express-handlebars')
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout : 'main',
    // helpers: {
    //     section: function(name, options){ 
    //         if(!this._sections) this._sections = {};
    //         this._sections[name] = options.fn(this);
    //         return null;
    //     } 
    // }
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.get('/newsletter', function(req, res){
    res.render('newsletter', {title: 'News Letter', csrf : 'CSRF goes here'})
})
// app.post('/process', function(req, res){
//     console.log('Form (from querystring): ' + req.query.form); 
//     console.log('CSRF token (from hidden form field): ' + req.body._csrf); 
//     console.log('Name (from visible form field): ' + req.body.name); 
//     console.log('Email (from visible form field): ' + req.body.email); 
//     res.redirect(303, '/thank-you');
// });

app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json,html') === 'json'){
            // if there were an error, we would send { error: 'error description' }
    res.send({ success: true });
    }else{
            // if there were an error, we would redirect to an error page
            res.redirect(303, '/thank-you');
    }
});
    

app.get('/contest/vacation-photo',function(req,res){ 
    var now = new Date(); 
    res.render('contest/vacation_photo',{year: now.getFullYear(),month: now.getMonth(), title: 'News Letter'});
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){ 
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
    if(err) return res.redirect(303, '/error'); 
    console.log('received fields:'); 
    console.log(fields);
    console.log('received files:'); 
    console.log(files);
    res.redirect(303, '/thank-you');
    });
});