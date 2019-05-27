const createdPost = {
  created_utc: 1556720253,
  created: "1.05.2019, 16:17"
};

const expectedPostsObj = {
  posts: [
    {
      title:
        "Subreddit Of The Month [May 2019]: / r / CroppedNorrisJokes.Know of a small(under 20, 000 subscribers) humor - based subreddit that deserves a month in the spotlight ? Link it inside!",
      upvotes: 342,
      downvotes: 2,
      score: 340,
      num_comments: 38,
      created: "2.05.2019, 00:17"
    },
    {
      title: "Will you please do that one petting thing on my head!!!???",
      upvotes: 86463,
      downvotes: 0,
      score: 86463,
      num_comments: 1057,
      created: "27.05.2019, 06:40"
    },
    {
      title: "This turtle is fast...!!!",
      upvotes: 343,
      downvotes: 3,
      score: 340,
      num_comments: 38,
      created: "25.05.2019, 14:58"
    }
  ],
  count: 3
};

const expectedPostsObjSortedByUpvotes = {
  posts: [
    {
      title:
        "Subreddit Of The Month [May 2019]: / r / CroppedNorrisJokes.Know of a small(under 20, 000 subscribers) humor - based subreddit that deserves a month in the spotlight ? Link it inside!",
      upvotes: 342,
      downvotes: 2,
      score: 340,
      num_comments: 38,
      created: "2.05.2019, 00:17"
    },
    {
      title: "This turtle is fast...!!!",
      upvotes: 343,
      downvotes: 3,
      score: 340,
      num_comments: 38,
      created: "25.05.2019, 14:58"
    },
    {
      title: "Will you please do that one petting thing on my head!!!???",
      upvotes: 86463,
      downvotes: 0,
      score: 86463,
      num_comments: 1057,
      created: "27.05.2019, 06:40"
    }
  ],
  count: 3
};

const expectedPostsObjSortedByDownvotes = {
  posts: [
    {
      title: "Will you please do that one petting thing on my head!!!???",
      upvotes: 86463,
      downvotes: 0,
      score: 86463,
      num_comments: 1057,
      created: "27.05.2019, 06:40"
    },
    {
      title:
        "Subreddit Of The Month [May 2019]: / r / CroppedNorrisJokes.Know of a small(under 20, 000 subscribers) humor - based subreddit that deserves a month in the spotlight ? Link it inside!",
      upvotes: 342,
      downvotes: 2,
      score: 340,
      num_comments: 38,
      created: "2.05.2019, 00:17"
    },
    {
      title: "This turtle is fast...!!!",
      upvotes: 343,
      downvotes: 3,
      score: 340,
      num_comments: 38,
      created: "25.05.2019, 14:58"
    }
  ],
  count: 3
};

const expectedPostsObjSortedByScore = {
  posts: [
    {
      title:
        "Subreddit Of The Month [May 2019]: / r / CroppedNorrisJokes.Know of a small(under 20, 000 subscribers) humor - based subreddit that deserves a month in the spotlight ? Link it inside!",
      upvotes: 342,
      downvotes: 2,
      score: 340,
      num_comments: 38,
      created: "2.05.2019, 00:17"
    },
    {
      title: "This turtle is fast...!!!",
      upvotes: 343,
      downvotes: 3,
      score: 340,
      num_comments: 38,
      created: "25.05.2019, 14:58"
    },
    {
      title: "Will you please do that one petting thing on my head!!!???",
      upvotes: 86463,
      downvotes: 0,
      score: 86463,
      num_comments: 1057,
      created: "27.05.2019, 06:40"
    }
  ],
  count: 3
};

const expectedPostsObjSortedByCreate = {
  posts: [
    {
      title:
        "Subreddit Of The Month [May 2019]: / r / CroppedNorrisJokes.Know of a small(under 20, 000 subscribers) humor - based subreddit that deserves a month in the spotlight ? Link it inside!",
      upvotes: 342,
      downvotes: 2,
      score: 340,
      num_comments: 38,
      created: "2.05.2019, 00:17"
    },
    {
      title: "This turtle is fast...!!!",
      upvotes: 343,
      downvotes: 3,
      score: 340,
      num_comments: 38,
      created: "25.05.2019, 14:58"
    },
    {
      title: "Will you please do that one petting thing on my head!!!???",
      upvotes: 86463,
      downvotes: 0,
      score: 86463,
      num_comments: 1057,
      created: "27.05.2019, 06:40"
    }
  ],
  count: 3
};

const expectedLatestPosts = {
  posts: [
    {
      title: "Will you please do that one petting thing on my head!!!???",
      upvotes: 86463,
      downvotes: 0,
      score: 86463,
      num_comments: 1057,
      created: "27.05.2019, 06:40"
    }
  ],
  count: 1
};

describe("renameKeys", () => {
  it("should rename keys of an object by given pattern", () => {
    const keysMap = { ups: "upvotes", downs: "downvotes" };
    const result = renameKeys(keysMap, { ups: 100, downs: 100 });
    expect(result).isEqual({ upvotes: 100, downvotes: 100 });
  });
});

describe("formatTime", () => {
  it("should transform unix time stamp into string in expected format (dd.mm.yyyy hh:mm)", () => {
    const result = formatTime(1556749053);
    expect(result).toBe("2.05.2019, 00:17");
  });
  it('should return "Invalid time stamp" if parameter is incorrect', () => {
    const result = formatTime(1556);
    expect(result).toBe("Invalid time stamp");
  });
});

describe("parseDate", () => {
  it("should parse formated date to unix timestamp", () => {
    const result = parseDate(createdPost, "created");
    expect(result).isEqual(createdPost.created_utc);
  });
});

describe("countPosts", () => {
  it("should count posts in object posts array", () => {
    const result = countPosts(expectedPostsObj);
    expect(result.count).toBe(expectedPostsObj.count);
  });
});

describe("sortPosts", () => {
  it("should sort object with post by upvotes", () => {
    const result = sortPosts("upvotes", expectedPostsObj);
    expect(result).isEqual(expectedPostsObjSortedByUpvotes);
  });
  it("should sort object with post by downvotes", () => {
    const result = sortPosts("downvotes", expectedPostsObj);
    expect(result).isEqual(expectedPostsObjSortedByDownvotes);
  });
  it("should sort object with post by score", () => {
    const result = sortPosts("score", expectedPostsObj);
    expect(result).isEqual(expectedPostsObjSortedByScore);
  });
  it("should sort object with post by created", () => {
    const result = sortPosts("created", expectedPostsObj);
    expect(result).isEqual(expectedPostsObjSortedByCreate);
  });
});

describe("filterHighestVotesRatioPostTitle", () => {
  it("should show title of a post with the highest votes ratio (dd.mm.yyyy hh:mm)", () => {
    const result = filterHighestVotesRatioPostTitle(expectedPostsObj);
    expect(result).toBe(
      "Will you please do that one petting thing on my head!!!???"
    );
  });
});

describe("filterLatestPosts", () => {
  it("filter sort post from last 24 hours", () => {
    const result = filterLatestPosts(expectedPostsObj);
    expect(result).isEqual(expectedLatestPosts);
  });
});
