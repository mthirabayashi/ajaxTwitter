class FollowToggle {
  constructor(el, options = {}){
    this.$el = $(el);
    this.user_id = this.$el.data("userId") || options.userId
    this.followState = (this.$el.data("initialFollowState") || options.followState)
    this.$el.click(this.toggleShow.bind(this))
    this.render();
  }
}

FollowToggle.prototype.toggleShow = function () {
  const that = this
  let method;
    if (this.followState === "followed") {
      this.followState = "unfollowed";
      method = "DELETE"
    }
    else if(this.followState === "unfollowed") {
      this.followState = "followed"
      method = "POST"
    }

    $.ajax({
      url: `/users/${this.user_id}/follow`,
      type: method,
      dataType: 'json',
      success(){
        that.render()
      }
    })

};

FollowToggle.prototype.render = function () {
  let text;
  switch (this.followState) {
    case "unfollowed":
      text = "Follow";
      break;
    case "followed":
      text = "Unfollow";
      break;
  }
  this.$el.html(text);
};


module.exports = FollowToggle;
