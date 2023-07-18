const oldDtf = {
    loadPosts() {
        const feed_chunks = document.querySelectorAll(".feed__chunk");
        const posts = Array.from(feed_chunks)
            .flatMap(node => Array.from(node.children))
            .filter(post => post.tagName === 'DIV' && post.hasAttribute('data-gtm'));
        if (posts.length === 0) {
            return
        }
        return posts
    },

    lookupCurrentPosition(posts) {
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let rect = post.getBoundingClientRect();
            if (rect.top >= 0) {
                if (rect.top >= 100) {
                    return i - 1
                }
                return i
            }
        }
    },

    scrollToNextPost() {
        let posts = this.loadPosts()
        if (posts === undefined) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let nextPost = currentPosition < posts.length ? posts[currentPosition + 1] : posts[currentPosition];
        nextPost.scrollIntoView({behavior: "smooth"});
    },

    scrollToPreviousPost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let previousPost = currentPosition > 0 ? posts[currentPosition - 1] : posts[currentPosition];
        previousPost.scrollIntoView({behavior: "smooth"});
    },

    likePost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let currentPost = posts[currentPosition]
        currentPost.querySelector('.like-button').click()
    },

    bookmarkPost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let currentPost = posts[currentPosition]
        currentPost.querySelector('.bookmark').click()
    },

    openPost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let currentPost = posts[currentPosition]
        let url = currentPost.querySelector('a.content-link').href
        window.open(url, '_blank').focus()
    }
}

const newDtf = {
    loadPosts() {
        const posts = document.getElementsByClassName("content content--short");
        if (posts.length === 0) {
            return
        }
        return posts
    },

    lookupCurrentPosition(posts) {

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const rect = post.getBoundingClientRect();
            if (rect.top >= 0) {
                if (rect.top >= 100) {
                    return i - 1
                }
                return i
            }
        }
    },

    scrollToNextPost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let nextPost = currentPosition < posts.length - 1 ? posts[currentPosition + 1] : posts[currentPosition];
        nextPost.scrollIntoView({behavior: "smooth"});
    },


    scrollToPreviousPost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let previousPost = currentPosition > 0 ? posts[currentPosition - 1] : posts[currentPosition];
        previousPost.scrollIntoView({behavior: "smooth"});
    },

    likePost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        posts[currentPosition].querySelector('button.like')?.click()
    },

    bookmarkPost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        posts[currentPosition].querySelector('button.bookmark-button')?.click()
    },

    openPost() {
        let posts = this.loadPosts()
        if (!posts) {
            return
        }
        let currentPosition = this.lookupCurrentPosition(posts);
        let currentPost = posts[currentPosition]
        let url = currentPost.querySelector('a.content__link').href
        window.open(url, '_blank').focus()
    }

}

function checkInInput() {
    return (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.classList.contains("content_editable") ||
        document.activeElement.classList.contains("editor-content")
    )
}

document.addEventListener("keydown", function (event) {

        if (checkInInput()) {
            return;
        }

        let site;
        if (window.location.host === "dtf.ru") {
            site = oldDtf
        } else if (window.location.host === "new.dtf.ru") {
            site = newDtf
        }

        const keyCode = event.code;
        switch (keyCode) {
            case "KeyW":
                site.scrollToPreviousPost()
                break;
            case "KeyS":
                site.scrollToNextPost()
                break;
            case 'KeyF':
                site.likePost()
                break;
            case 'KeyR':
                site.bookmarkPost()
                break;
            case 'KeyE':
                site.openPost()
                break;
        }
    }
)
