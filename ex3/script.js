  // public/script.js
  async function createUser() {
    const username = document.getElementById('username').value;
    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            throw new Error(`Error creating user: ${response.statusText}`);
        }

        const user = await response.json();
        alert(`User created: ${user.username} (ID: ${user._id})`);
    } catch (error) {
        console.error(error);
        alert('Failed to create user. Please try again.');
    }
}

async function createPost() {
    const userId = document.getElementById('userId').value;
    const content = document.getElementById('content').value;
    try {
        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author: userId, content }),
        });

        if (!response.ok) {
            throw new Error(`Error creating post: ${response.statusText}`);
        }

        const post = await response.json();
        alert(`Post created: ${post.content}`);
    } catch (error) {
        console.error(error);
        alert('Failed to create post. Please try again.');
    }
}

async function viewPosts() {
    const userId = document.getElementById('viewUserId').value;
    try {
        const response = await fetch(`/users/${userId}/posts`);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const posts = await response.json();
        const postsDiv = document.getElementById('posts');

        if (posts.length === 0) {
            postsDiv.innerHTML = 'No posts found.';
        } else {
            postsDiv.innerHTML = posts.map(post => `
                <div>
                    <p>${post.author.username}: ${post.content}</p>
                    <small>${new Date(post.createdAt).toLocaleString()}</small>
                    <p>Likes: <span id="likes-${post._id}">${post.likes}</span></p>
                    <button onclick="likePost('${post._id}')">Like</button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error(error);
        document.getElementById('posts').innerHTML = 'Error fetching posts.';
    }
}

async function likePost(postId) {
    try {
        const response = await fetch(`/posts/${postId}/like`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`Error liking post: ${response.statusText}`);
        }

        const post = await response.json();
        document.getElementById(`likes-${postId}`).innerText = post.likes;
    } catch (error) {
        console.error(error);
        alert('Failed to like post. Please try again.');
    }
}
