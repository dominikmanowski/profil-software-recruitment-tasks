const INPUT_JSON_URL = "https://www.reddit.com/r/funny.json";
const ALLOWED_ENTRIES = [
  "title",
  "ups",
  "downs",
  "score",
  "num_comments",
  "created_utc"
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

const countPosts = obj => {
  obj.count = obj.posts.length;
  return obj;
};

const parseDate = (item, key) => {
  const TIME_ZONE_DIFFERENCE = 33;
  return (
    Date.parse(item[key].replace(/(\d+).(\d+)/, "$2.$1")) / 1000 +
    TIME_ZONE_DIFFERENCE
  );
};

const transformData = async (
  url = INPUT_JSON_URL,
  allowedEntries = ALLOWED_ENTRIES
) => {
  const respond = await getData(url);
  const obj = {};

  obj.posts = await respond.map(({ data }) =>
    Object.keys(data)
      .filter(key => allowedEntries.includes(key))
      .reduce((obj, key) => {
        obj[key] = key !== "created_utc" ? data[key] : formatTime(data[key]);
        return obj;
      }, {})
  );
  const keysMap = {
    ups: "upvotes",
    downs: "downvotes",
    created_utc: "created"
  };

  obj.posts = await obj.posts.map(post => renameKeys(keysMap, post));

  await countPosts(obj);

  return await obj;
};

const sortPosts = (key, obj = postsObj) => {
  let sortedPostsObj = obj;
  if (key === "created") {
    obj.posts.sort((a, b) => parseDate(a, key) - parseDate(b, key));
    return sortedPostsObj;
  }
  sortedPostsObj.posts.sort((a, b) => a[criterion] - b[criterion]);
  return sortedPostsObj;
};

const filterHighestVotesRatioPostTitle = (obj = postsObj) => {
  return Object.values(
    obj.posts.sort(
      (a, b) =>
        b["upvotes"] - b["downvotes"] - a["upvotes"] - a["downvotes"] ||
        parseDate(b, "created") - parseDate(a, "created")
    )
  )[0].title;
};

const filterLatestPosts = (obj = postsObj) => {
  const now = Date.now() / 1000;
  const TWENTY_FOUR_HOURS = 24 * 60 * 60;
  const filteredPosts = obj;

  filteredPosts.posts = obj.posts.filter(
    post => now - parseDate(post, "created") <= TWENTY_FOUR_HOURS
  );

  countPosts(filteredPosts);

  return filteredPosts;
};
(async () => (postsObj = await transformData()))();
