const FollowToggle = require('./follow_toggle');


class UsersSearch {
  constructor(el, option = {}) {
    this.$el = $(el);
    this.$ul = option["ul"];
    this.$input = option["input"]
    this.$input.on("input", this.searchFunction.bind(this))
    // debugger
  }
}

UsersSearch.prototype.searchFunction = function () {
  if (this.$input.val() === "") {
    this.renderResults([]);
    return;
  }
  let that = this;
  $.ajax({
    url: '/users/search',
    type: 'get',
    dataType: 'json',
    data: {query: this.$input.val() },
    success(fetchedUsers){
      that.renderResults(fetchedUsers);

    }
  })
};

UsersSearch.prototype.renderResults = function (users) {
  this.$ul.empty();
  let that = this;
  users.forEach(function (user) {
    let $a = $(`<a href='/users/${user.id}'>${user.username}</a>`)
    let $button = $(`<button class='toggle-follow'></button>`)
    let $btn = new FollowToggle($button, {
      followState: user.followed ? "followed" : "unfollowed", userId: user.id
    })
    let $li = $(`<li></li>`).append($a).append($button)
    that.$ul.append($li);
  })
  console.log(that.$ul);
};

module.exports = UsersSearch;
