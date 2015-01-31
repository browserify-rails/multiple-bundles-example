module.exports = {
  getName: function() {
    return this.name || 'AcmeBot';
  },

  setName: function(n) {
    this.name = n;
  },

  talk: function (s) {
    return this.getName() + ' says ' + s.toUpperCase() + '!'
  }
}
