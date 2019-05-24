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
  const response = await fetch(url);
  const json = await response.json();
  return await json.data.children;
};

const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

const formatTime = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString("pl-PL", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
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
