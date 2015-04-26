 $(document).ready(function() {
    //var app = {user: {firstname: "Thibault", lastname: "Milan", adress: "1, rue des Trinitaires, Metz, France", phone: "+33679889177", cb: {lastdigit: "6789", expire: "03/16"}, pizza: "Margherita"}};
    //localStorage.setItem('app', JSON.stringify(app));
    $('.toggleMenu').click(function() { $('.oc-container').toggleClass('oc-menu-open');});
    $('.demo').click(function(event) {
        event.preventDefault(); 
        call_pizzeria('Thibault Milan', '+33679889177', '+33678570233', '1 rue des Trinitaires, Metz', 'Regina', 2, function(r) {
            console.log('callback');
            console.log(r);
        });
    });
    var app = JSON.parse(localStorage.getItem('app'));  
    findNearestPizzeria(app.user.adress, function(pizzeria) {
        app.pizzeria = pizzeria;
        localStorage.setItem('app', JSON.stringify(app));
        updateTemplates();
    });

    $("#pizza-selector").owlCarousel({
        loop : true,
        center : true,
        dots : false,
        items : 1,
        stagePadding: 100,
        margin: 50
    });

 });



 function updateTemplates() {
    $('div.templatized').remove();
    var app = JSON.parse(localStorage.getItem('app'));

    var source   = $('script[type="text/x-handlebars-template"]');
    source.each(function(i) {
        var elem = source[i];
        var content = '<div class="templatized">'+Handlebars.compile($(elem).html())(app)+'</div>';
        //console.log(content);
        $(elem).after(content);
    });

 }
