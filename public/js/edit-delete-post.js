async function deletePostHandler() {
    const url = document.location.href.split('/');
    const id = url[url.length - 1];

    const response = await fetch(
        `/api/posts/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    if (response.ok) {
        document.location.assign('/dashboard');
    } else {
        alert((await response.json()).message);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deletePostHandler);