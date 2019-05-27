# JavaScript task

The task was to write a JavaScript script that will download data from https://www.reddit.com/r/funny.json and perform the following operations on it:

1. write a function that will transform data into a structure:
   
```javascript
{
"posts": [
     {
         "title": "put title here",
         "upvotes": 1234,
         "downvotes": 234,
         "score": 1000,
         "num_comments": 100,
         "created": "16/05/2019 12:12",
     }
     ...
]
"count": 10
}
```

2. write a function that allows sorting after "upvotes", "downvotes", "score" or date "created" depending on the parameter passed
3. write a function that returns the title of the post with the highest ratio of upvotes and downvotes (in the case of several posts with the same coefficients, select the latest one)
4. write a function that will display posts from the last day (24h back)

5. *additional graphic interface will be additionally scored

## Requirements

- Vanilla JavaScript only (no libraries such as lodash)
- README with the description of the project
- tests

## Display solution

To display the solution, open the index.html file in a web browser and turn on the DevTools Console (Control+Shift+J in Chrome)

## Running the functions

To run a specific function enter in the Console:

```postsObj```  - log object with formated posts

```sortPosts(criterion)``` - sort posts by given criterion ("upvotes", "downvotes", "score" or "created")

```filterHighestVotesRatioPostTitle()``` - view title of the post with the highest ratio of upvotes and downvotes

```filterLatestPosts``` - view posts from the last day (24h back)

## Tests

Unit tests are visible in the Console after the page has been loaded

```
sortPosts                                     /name of the tested function
    should sort object with post by upvotes   /description
     pass                                     /test passed or failed
```