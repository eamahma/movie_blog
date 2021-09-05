async function submitCommentHandler(event) {
  event.preventDefault();
  //get info we need
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const comment_text = document.querySelector("#comment-text").value.trim();
  
  if (comment_text) {
    
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text, //removed user id
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //check if all good
    if (response.ok) {
      document.location.reload();
    } else {
      console.log("ViewPost error");
      alert(response.statusText); // find better way to do this
    }
  }
}

//post a commment
document
  .querySelector("#post-comment-btn")
  .addEventListener("click", submitCommentHandler);
