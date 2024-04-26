var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

define(['init'], function (BH) {

  var el = $$('[data-option]');

  el.addEvent('click', function (e) {
    var opt = this.getProperty('data-option');
    BH.get('user').setOption(opt, this.get('checked'));
  });

  el = $('opt-color');
  el.addEvent('click:relay(div)', function (e) {
    var targ = $(e.target), col = targ.getProperty('title');
    if (col) {
      BH.get('user').setOption('color', col);
    }
    $('bhr-style').set('href', '/style/style-' + col + '.css?new');
  });

});

}