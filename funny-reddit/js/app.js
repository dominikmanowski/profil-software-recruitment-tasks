const INPUT_JSON_URL = "https://www.reddit.com/r/funny.json";
const ALLOWED_ENTRIES = [
  "title",
  "ups",
  "downs",
  "score",
  "num_comments",
  "created"
];

let postsObj = { posts: [], count: 0 };

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return await json.data.children;
  } catch (err) {
    console.error(err);
  }
};

const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

const formatTime = unixTimeStamp => {
  if (
    typeof unixTimeStamp === "number" &&
    unixTimeStamp.toString().length === 10
  ) {
    const date = new Date(unixTimeStamp * 1000);
    return date.toLocaleTimeString("pl-PL", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  return "Invalid time stamp";
};

const parseDateFormat = (item, key) =>
  Date.parse(item[key].replace(/(\d+).(\d+)/, "$2.$1"));

const fillPostsObj = async (allowedEntries = ALLOWED_ENTRIES) => {
  const respond = await getData(INPUT_JSON_URL);

  postsObj.posts = await respond.map(({ data }) =>
    Object.keys(data)
      .filter(key => allowedEntries.includes(key))
      .reduce((obj, key) => {
        obj[key] = key !== "created" ? data[key] : formatTime(data[key]);
        return obj;
      }, {})
  );
  const keysMap = { ups: "upvotes", downs: "downvotes" };

  postsObj.posts = postsObj.posts.map(post => renameKeys(keysMap, post));

  postsObj.count = postsObj.posts.length;

  fillPostsViewWithPosts();
};

const sortByGivenCriteria = (key, obj = postsObj) => {
  if (key === "created") {
    return obj.posts.sort(
      (a, b) => parseDateFormat(a, key) - parseDateFormat(b, key)
    );
  }
  return obj.posts.sort((a, b) => a[key] - b[key]);
};

const showHighestVotesRatioPostTitle = (obj = postsObj) => {
  return Object.values(
    obj.posts.sort(
      (a, b) =>
        b["upvotes"] - b["downvotes"] - a["upvotes"] - a["downvotes"] ||
        parseDateFormat(b, "created") - parseDateFormat(a, "created")
    )
  )[0].title;
};

const showLatestPosts = (obj = postsObj) => {
  const now = Date.now();
  const TWENTY_FOUR_HOURS = 86400;

  return obj.posts.filter(
    post => now - parseDateFormat(post, "created") < TWENTY_FOUR_HOURS
  );
};

fillPostsObj();

const postsView = document.getElementById("posts");

const fillPostsViewWithPosts = () => {
  postsView.innerHTML = JSON.stringify(postsObj, null, 2);
};
