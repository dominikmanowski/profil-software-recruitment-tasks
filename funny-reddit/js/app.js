const URL = "https://www.reddit.com/r/funny.json";

const getData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  const data = await json.data.children;
  return await data;
};

const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

const formatTime = timestamp => {
  const date = new Date(timestamp * 1000);
  const dateLocal = date.toLocaleTimeString("pl-PL", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return dateLocal;
};

const parseDateFormat = (item, key) =>
  Date.parse(item[key].replace(/(\d+).(\d+)/, "$2.$1"));

let postsObj = { posts: [], count: 0 };

const fillPostsObj = async () => {
  const respond = await getData();

  const allowed = ["title", "ups", "downs", "score", "num_comments", "created"];

  postsObj.posts = await respond.map(({ data }) =>
    Object.keys(data)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = key !== "created" ? data[key] : formatTime(data[key]);
        return obj;
      }, {})
  );
  const keysMap = { ups: "upvotes", downs: "downvotes" };

  postsObj.posts = postsObj.posts.map(post => renameKeys(keysMap, post));

  postsObj.count = postsObj.posts.length;
};

fillPostsObj();

const sortPostsObj = key => {
  if (key === "created") {
    postsObj.posts.sort(
      (a, b) => parseDateFormat(a, key) - parseDateFormat(b, key)
    );
    return;
  }
  postsObj.posts.sort((a, b) => a[key] - b[key]);
};

const highestVotesRatioPost = () => {
  let posts = [...postsObj.posts];

  const sortedByRation = posts.sort(
    (a, b) =>
      b["upvotes"] - b["downvotes"] - a["upvotes"] - a["downvotes"] ||
      parseDateFormat(b, "created") - parseDateFormat(a, "created")
  );
  return posts[0].title;
};

const filterLatestPosts = () => {
  let posts = [...postsObj.posts];
  const now = Date.now();
  const TWENTY_FOUR_HOURS = 86400;

  return posts.filter(
    post => now - parseDateFormat(post, "created") < TWENTY_FOUR_HOURS
  );
};
