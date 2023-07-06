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

                // don't skip first post
                if (i === 0 && rect.top >= 75) {
                    return 0
                }
                return i + 1; // data-position
            }
        }
    },

    scrollToNextPost() {
        let currentPostPosition = this.lookupCurrentPostPosition();
        if (currentPostPosition !== undefined) {
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
    },

    bookmarkPost() {
        let currentPostPosition = this.lookupCurrentPostPosition();
        if (currentPostPosition !== undefined) {
            let currentPost = document.querySelector(`[data-position="${currentPostPosition}"]`);
            currentPost.querySelector('.bookmark').click()
        }
    },
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

                // don't skip first post
                if (i === 0 && rect.top >= 75) {
                    return [post, true]
                }
                return [post, false]; // post object
            }
        }
    },

    scrollToNextPost() {
        const result = this.lookupCurrentPost();
        if (result) {
            let [current, isFirst] = result;
            let nextPost;

            if (isFirst === true) {
                nextPost = current
            } else {
                nextPost = current.nextElementSibling;
            }

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
        const result = this.lookupCurrentPost();
        if (result) {
            let previousPost = result[0].previousElementSibling;
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
        let result = this.lookupCurrentPost();
        if (result) {
            result[0].querySelector('button.like')?.click()
        }
    },

    bookmarkPost() {
        let result = this.lookupCurrentPost();
        if (result) {
            result[0].querySelector('button.bookmark-button')?.click()
        }
    }
}

function checkInInput() {
    return (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.classList.contains('content_editable')
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
        }
    }
)
