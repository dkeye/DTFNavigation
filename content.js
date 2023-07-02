const oldDtf = {
    lookupCurrentPostPosition() {
        const posts = document.querySelectorAll(".feed__item:not(.hidden)");
        if (posts.length === 0) {
            return
        }

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const rect = post.getBoundingClientRect();
            if (rect.top >= 0) {
                return i + 1; // data-position
            }
        }
    },

    scrollToNextPost() {
        let currentPostPosition = this.lookupCurrentPostPosition();
        if (currentPostPosition !== undefined) {
            if (currentPostPosition === 1) {
                currentPostPosition = 0
            }
            let nextPost = document.querySelector(`[data-position="${currentPostPosition + 1}"]`);
            nextPost.scrollIntoView({behavior: "smooth"});
        }
    },

    scrollToPreviousPost() {
        let currentPostPosition = this.lookupCurrentPostPosition();
        if (currentPostPosition !== undefined && currentPostPosition > 1) {
            let previousPost = document.querySelector(`[data-position="${currentPostPosition - 1}"]`);
            previousPost.scrollIntoView({behavior: "smooth"});
        }
    },

    likePost() {
        let currentPostPosition = this.lookupCurrentPostPosition();
        if (currentPostPosition !== undefined) {
            let currentPost = document.querySelector(`[data-position="${currentPostPosition}"]`);
            currentPost.querySelector('.like-button').click()
        }
    }
}

const newDtf = {
    lookupCurrentPost() {
        const posts = document.getElementsByClassName("content content--short");
        if (posts.length === 0) {
            return
        }

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const rect = post.getBoundingClientRect();
            if (rect.top >= 0) {
                return post; // post object
            }
        }
    },

    scrollToNextPost() {
        const currentPost = this.lookupCurrentPost();
        if (currentPost) {
            let nextPost = currentPost.nextElementSibling;
            while (nextPost) {
                if (nextPost.classList.contains("content") && nextPost.classList.contains("content--short")) {
                    nextPost.scrollIntoView({behavior: "smooth"});
                    break;
                } else {
                    nextPost = nextPost.nextElementSibling;
                }
            }
        }
    },


    scrollToPreviousPost() {
        const currentPost = this.lookupCurrentPost();
        if (currentPost) {
            let previousPost = currentPost.previousElementSibling;
            while (previousPost) {
                if (previousPost.classList.contains("content") && previousPost.classList.contains("content--short")) {
                    previousPost.scrollIntoView({behavior: "smooth"});
                    break;
                } else {
                    previousPost = previousPost.previousElementSibling;
                }
            }
        }
    },

    likePost() {
        let currentPost = this.lookupCurrentPost();
        if (currentPost !== undefined) {
            currentPost.querySelector('button.like')?.click()
        }
    }
}


document.addEventListener("keydown", function (event) {
        let site;
        if (window.location.host === "dtf.ru") {
            site = oldDtf
        } else if (window.location.host === "new.dtf.ru") {
            site = newDtf
        }

        const keyCode = event.code;
        if (keyCode === "KeyW") {
            site.scrollToPreviousPost();
        } else if (keyCode === "KeyS") {
            site.scrollToNextPost();
        } else if (keyCode === 'Space') {
            event.preventDefault();
            site.likePost()
        }
    }
)
