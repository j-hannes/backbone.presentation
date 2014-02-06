var Beer = Backbone.Model.extend({
  defaults: {
    name: '',
    country: ''
  }
});

var BeerCollection = Backbone.Collection.extend({
  model: Beer
});

var BeerView = Backbone.View.extend({
  className: 'beer-view',

  events: {
    'click img': 'takeBeer'
  },

  render: function() {
    var $beer = $('<img>').attr('src', 'img/beer.png');
    this.$el.append($beer);

    return this;
  },

  takeBeer: function() {
    this.model.destroy();
    this.$el.remove();
  }
});

var beer1 = new Beer({name: 'Corona', country: 'Spain'});
var beer2 = new Beer({name: 'Stella', country: 'Belgium'});

var view1 = new BeerView({model: beer1}).render();
var view2 = new BeerView({model: beer2}).render();

// -------------------------------------------------------

var beerList = [
  {name: 'Corona', country: 'Spain'},
  {name: 'Stella', country: 'Belgium'},
  {name: 'Heineken', country: 'Netherlands'},
  {name: 'Becks', country: 'Germany'}
];

function generateRandomBeerCollection() {
  var n = _.random(1,20);
  var beerType = _.random(0,3);

  var randomBeerCollection = new BeerCollection({}); 
  _.each(_.range(n), function() {
    randomBeerCollection.add(beerList[beerType]);
  });

  return randomBeerCollection;
}

var BeerCollectionView = Backbone.View.extend({
  render: function() {
    this.$el.empty();
    this.collection.each(function(beer) {
      var view = new BeerView({model: beer});
      this.$el.append(view.render().el);
    }, this);

    return this;
  } 
});

