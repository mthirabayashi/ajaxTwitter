const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

console.log('got here');

$(()=>{
  $('.follow-toggle').each(function (i, element) {
    new FollowToggle(element, {});
  })

  $('nav.users-search').each(function (i,element) {
    new UsersSearch(element, { input: $(element).find('input'), ul: $(".test") })
  })

});
