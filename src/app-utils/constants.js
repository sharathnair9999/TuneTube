export const constants = {
  imgUrls: {
    logo: "https://res.cloudinary.com/sharath-media-library/image/upload/v1650477413/unbox%20tube/UnboxTube-logos_transparent_nf40e2.png",
    landing_hero_img:
      "https://res.cloudinary.com/sharath-media-library/image/upload/v1650564448/unbox%20tube/unbox-3_uwgrou.jpg",
    empty_box:
      "https://res.cloudinary.com/sharath-media-library/image/upload/v1650717624/unbox%20tube/empty_box_wtmfxc.png",
    playlist:
      "https://res.cloudinary.com/sharath-media-library/image/upload/v1651690252/unbox%20tube/playlists_t1nmoe.svg",
  },
  urlPrefix: `https://www.youtube-nocookie.com/embed`,
  titles: {
    landing: "UnboxTube",
    explore: function () {
      return `Explore | ${this.landing}`;
    },
    liked: function () {
      return `Your Likes | ${this.landing}`;
    },
    history: function () {
      return `Your History | ${this.landing}`;
    },
    watchlater: function () {
      return `Watch Later | ${this.landing}`;
    },
    login: function () {
      return `Login | ${this.landing}`;
    },
    signup: function () {
      return `Signup | ${this.landing}`;
    },
    video: function (title) {
      return `${title} | ${this.landing}`;
    },
  },
};
